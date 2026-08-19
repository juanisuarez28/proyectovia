"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import cloudinary, {
  CLOUDINARY_FOLDER,
  assertCloudinaryConfig,
  publicIdFromUrl,
} from "@/lib/cloudinary";
import { assertFirebaseConfig } from "@/lib/firebase";

const ADMIN_USER = "caminativia";
const ADMIN_PASS = "proyectovia123-@";

async function requireSession() {
  const adminSession = (await cookies()).get("admin_session");
  if (!adminSession?.value) {
    throw new Error("No autorizado");
  }
}

export async function login(formData: FormData) {
  const user = formData.get("username");
  const pass = formData.get("password");

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    (await cookies()).set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    redirect("/acceso/editar");
  } else {
    return { error: "Credenciales incorrectas" };
  }
}

export async function logout() {
  (await cookies()).delete("admin_session");
  redirect("/acceso/editar");
}

/**
 * Devuelve una firma para que el navegador suba la imagen DIRECTO a Cloudinary.
 * Asi el archivo nunca pasa por la Server Action: en Vercel el body de una
 * request esta limitado a ~4.5 MB y una imagen en base64 lo supera facil,
 * dejando el formulario colgado en "Subiendo...".
 */
export async function getUploadSignature() {
  try {
    await requireSession();
    assertCloudinaryConfig();

    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: CLOUDINARY_FOLDER },
      process.env.CLOUDINARY_API_SECRET as string
    );

    return {
      success: true as const,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
      apiKey: process.env.CLOUDINARY_API_KEY as string,
      folder: CLOUDINARY_FOLDER,
      timestamp,
      signature,
    };
  } catch (error: any) {
    console.error("Error generando firma de Cloudinary:", error);
    return { success: false as const, error: error?.message || "Error al preparar la subida" };
  }
}

export async function addResource(formData: FormData) {
  try {
    await requireSession();
    assertFirebaseConfig();

    const url = formData.get("url") as string;
    const title = formData.get("title") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const publicId = (formData.get("publicId") as string) || "";

    if (!url || !imageUrl) {
      return { error: "Todos los campos obligatorios son requeridos" };
    }

    const { db } = await import("@/lib/firebase");
    const { collection, addDoc } = await import("firebase/firestore");

    const newRecurso = {
      title: title || "",
      description: "",
      imageUrl,
      publicId,
      imageHint: "Recurso",
      url,
      createdAt: new Date().toISOString(),
    };

    await addDoc(collection(db, "recursos"), newRecurso);

    return { success: true };
  } catch (error: any) {
    console.error("Error agregando recurso:", error);
    return { error: error.message || "Error al subir el recurso" };
  }
}

export async function deleteResource(id: string) {
  try {
    await requireSession();
    assertFirebaseConfig();

    const { db } = await import("@/lib/firebase");
    const { doc, getDoc, deleteDoc } = await import("firebase/firestore");

    const docRef = doc(db, "recursos", id);
    const docSnap = await getDoc(docRef);

    // Borramos primero el documento: si Cloudinary falla, al menos el recurso
    // desaparece de la web (y no dejamos el panel en un estado inconsistente).
    await deleteDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const publicId = data.publicId || publicIdFromUrl(data.imageUrl);
      if (publicId) {
        try {
          assertCloudinaryConfig();
          await cloudinary.uploader.destroy(publicId);
        } catch (cloudError) {
          console.error("No se pudo borrar la imagen de Cloudinary:", cloudError);
        }
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error borrando recurso:", error);
    return { error: error.message || "Error al borrar el recurso" };
  }
}

export async function updateResource(formData: FormData) {
  try {
    await requireSession();
    assertFirebaseConfig();

    const id = formData.get("id") as string;
    const url = formData.get("url") as string;
    const title = formData.get("title") as string;
    const imageUrl = formData.get("imageUrl") as string | null;
    const publicId = (formData.get("publicId") as string) || "";

    if (!id || !url) {
      return { error: "Faltan campos requeridos" };
    }

    const { db } = await import("@/lib/firebase");
    const { doc, getDoc, updateDoc } = await import("firebase/firestore");

    const docRef = doc(db, "recursos", id);
    const updateData: Record<string, any> = { url, title: title || "" };

    // Si subio una imagen nueva (ya esta en Cloudinary), actualizamos y
    // borramos la anterior.
    if (imageUrl) {
      const docSnap = await getDoc(docRef);
      updateData.imageUrl = imageUrl;
      updateData.publicId = publicId;

      await updateDoc(docRef, updateData);

      if (docSnap.exists()) {
        const oldData = docSnap.data();
        const oldPublicId = oldData.publicId || publicIdFromUrl(oldData.imageUrl);
        if (oldPublicId && oldPublicId !== publicId) {
          try {
            assertCloudinaryConfig();
            await cloudinary.uploader.destroy(oldPublicId);
          } catch (cloudError) {
            console.error("No se pudo borrar la imagen anterior de Cloudinary:", cloudError);
          }
        }
      }

      return { success: true };
    }

    await updateDoc(docRef, updateData);
    return { success: true };
  } catch (error: any) {
    console.error("Error actualizando recurso:", error);
    return { error: error.message || "Error al actualizar el recurso" };
  }
}
