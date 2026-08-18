"use server";

import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export async function getRecursosAction() {
  try {
    const q = query(collection(db, "recursos"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching recursos from server:", error);
    return { success: false, data: [] };
  }
}
