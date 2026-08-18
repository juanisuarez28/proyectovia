"use server";

import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { unstable_noStore as noStore } from "next/cache";

export async function getRecursosAction() {
  noStore();
  try {
    const q = query(collection(db, "recursos"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Asegurar que todos los datos sean JSON planos (Next.js Server Actions lo requiere)
    const safeData = JSON.parse(JSON.stringify(data));
    
    return { success: true, data: safeData };
  } catch (error) {
    console.error("Error fetching recursos from server:", error);
    return { success: false, data: [] };
  }
}
