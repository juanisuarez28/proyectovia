"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import cloudinary from "@/lib/cloudinary";

const ADMIN_USER = "caminativia";
const ADMIN_PASS = "proyectovia123-@";

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

export async function addResource(formData: FormData) {
  const adminSession = (await cookies()).get("admin_session");
  if (!adminSession?.value) {
    throw new Error("No autorizado");
  }

  const url = formData.get("url") as string;
  const title = formData.get("title") as string;
  const image = formData.get("image") as File;

  if (!url || !image || image.size === 0) {
    return { error: "Todos los campos obligatorios son requeridos" };
  }

  try {
    // 1. Subir imagen a Cloudinary
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convertimos buffer a string base64 para Cloudinary
    const base64Image = `data:${image.type};base64,${buffer.toString("base64")}`;
    
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "proyectovia/recursos",
    });

    const imageUrl = uploadResponse.secure_url;

    // 2. Guardar en Firebase Firestore
    const { db } = await import("@/lib/firebase");
    const { collection, addDoc } = await import("firebase/firestore");

    const newRecurso = {
      title: title || "",
      description: "",
      imageUrl: imageUrl,
      imageHint: "Recurso",
      url: url,
      createdAt: new Date().toISOString()
    };

    await addDoc(collection(db, "recursos"), newRecurso);

    return { success: true };
  } catch (error: any) {
    console.error("Error agregando recurso:", error);
    return { error: error.message || "Error al subir el recurso" };
  }
}

export async function deleteResource(id: string) {
  const adminSession = (await cookies()).get("admin_session");
  if (!adminSession?.value) {
    throw new Error("No autorizado");
  }

  try {
    const { db } = await import("@/lib/firebase");
    const { doc, getDoc, deleteDoc } = await import("firebase/firestore");
    
    // Obtener la URL para borrar de Cloudinary
    const docRef = doc(db, "recursos", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.imageUrl && data.imageUrl.includes("res.cloudinary.com")) {
        // Extraer public_id: asume formato .../upload/v1234/carpeta/archivo.ext
        const matches = data.imageUrl.match(/\/v\d+\/(.+)\.[a-zA-Z0-9]+$/);
        if (matches && matches[1]) {
          const publicId = matches[1];
          await cloudinary.uploader.destroy(publicId);
        }
      }
    }

    await deleteDoc(docRef);
    return { success: true };
  } catch (error: any) {
    console.error("Error borrando recurso:", error);
    return { error: error.message || "Error al borrar el recurso" };
  }
}

export async function updateResource(formData: FormData) {
  const adminSession = (await cookies()).get("admin_session");
  if (!adminSession?.value) {
    throw new Error("No autorizado");
  }

  const id = formData.get("id") as string;
  const url = formData.get("url") as string;
  const title = formData.get("title") as string;
  const image = formData.get("image") as File | null;

  if (!id || !url) {
    return { error: "Faltan campos requeridos" };
  }

  try {
    const { db } = await import("@/lib/firebase");
    const { doc, getDoc, updateDoc } = await import("firebase/firestore");

    const docRef = doc(db, "recursos", id);
    const updateData: any = { url, title: title || "" };

    // Si subió una imagen nueva, la actualizamos
    if (image && image.size > 0) {
      // 1. Borrar la imagen vieja de Cloudinary
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const oldData = docSnap.data();
        if (oldData.imageUrl && oldData.imageUrl.includes("res.cloudinary.com")) {
          const matches = oldData.imageUrl.match(/\/v\d+\/(.+)\.[a-zA-Z0-9]+$/);
          if (matches && matches[1]) {
            await cloudinary.uploader.destroy(matches[1]);
          }
        }
      }

      // 2. Subir la nueva imagen
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = `data:${image.type};base64,${buffer.toString("base64")}`;
      
      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "proyectovia/recursos",
      });

      updateData.imageUrl = uploadResponse.secure_url;
    }

    await updateDoc(docRef, updateData);
    return { success: true };
  } catch (error: any) {
    console.error("Error actualizando recurso:", error);
    return { error: error.message || "Error al actualizar el recurso" };
  }
}
