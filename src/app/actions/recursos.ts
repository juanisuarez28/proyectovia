"use server";

import { db, missingFirebaseEnv } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { unstable_noStore as noStore } from "next/cache";

export async function getRecursosAction() {
  noStore();

  if (missingFirebaseEnv.length > 0) {
    const error = `Firebase no esta configurado en este entorno. Faltan: ${missingFirebaseEnv.join(", ")}.`;
    console.error(error);
    return { success: false, data: [], error };
  }

  try {
    const recursosRef = collection(db, "recursos");

    // orderBy descarta los documentos que no tengan el campo createdAt,
    // asi que si la consulta ordenada vuelve vacia reintentamos sin orden.
    let docs = (await getDocs(query(recursosRef, orderBy("createdAt", "desc")))).docs;
    if (docs.length === 0) {
      docs = (await getDocs(recursosRef)).docs;
    }

    const data = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Array<Record<string, any>>;

    data.sort((a, b) => String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? "")));

    // Asegurar que todos los datos sean JSON planos (Next.js Server Actions lo requiere)
    const safeData = JSON.parse(JSON.stringify(data));

    return { success: true, data: safeData, error: null as string | null };
  } catch (error: any) {
    console.error("Error fetching recursos from server:", error);
    return {
      success: false,
      data: [],
      error: error?.message || "No se pudieron leer los recursos de Firestore.",
    };
  }
}
