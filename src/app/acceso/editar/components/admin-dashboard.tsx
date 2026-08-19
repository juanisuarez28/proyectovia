"use client";

import { useState, useEffect } from "react";
import {
  logout,
  addResource,
  deleteResource,
  updateResource,
  getUploadSignature,
} from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Recurso } from "@/lib/recursos";
import { Trash2, Pencil, X } from "lucide-react";
import Image from "next/image";
import { getRecursosAction } from "@/app/actions/recursos";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB (limite de Cloudinary)

/**
 * Sube la imagen directamente del navegador a Cloudinary usando una firma
 * generada en el servidor. El archivo NO viaja por la Server Action, que en
 * Vercel esta limitada a ~4.5 MB por request.
 */
async function uploadImageToCloudinary(file: File): Promise<{ imageUrl: string; publicId: string }> {
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("La imagen supera los 10 MB. Comprimila o elegí una más liviana.");
  }

  const sig = await getUploadSignature();
  if (!sig.success) {
    throw new Error(sig.error);
  }

  const body = new FormData();
  body.append("file", file);
  body.append("api_key", sig.apiKey);
  body.append("timestamp", String(sig.timestamp));
  body.append("signature", sig.signature);
  body.append("folder", sig.folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, {
    method: "POST",
    body,
  });

  const json = await res.json().catch(() => null);

  if (!res.ok || !json?.secure_url) {
    throw new Error(json?.error?.message || `Cloudinary rechazó la subida (HTTP ${res.status})`);
  }

  return { imageUrl: json.secure_url as string, publicId: json.public_id as string };
}

export function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadRecursos() {
    try {
      const result = await getRecursosAction();
      if (result.success) {
        setRecursos(result.data as Recurso[]);
        setLoadError(null);
      } else {
        setRecursos([]);
        setLoadError(result.error || "No se pudieron cargar los recursos.");
        console.error("Error fetching resources from server:", result.error);
      }
    } catch (error: any) {
      setRecursos([]);
      setLoadError(error?.message || "No se pudieron cargar los recursos.");
    }
  }

  // Fetch resources on mount
  useEffect(() => {
    loadRecursos();
  }, []);

  async function handleAddResource(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData(form);
      const image = formData.get("image") as File | null;

      if (!image || image.size === 0) {
        setMessage("❌ Error: Tenés que seleccionar una imagen.");
        return;
      }

      const { imageUrl, publicId } = await uploadImageToCloudinary(image);

      const payload = new FormData();
      payload.append("title", (formData.get("title") as string) || "");
      payload.append("url", (formData.get("url") as string) || "");
      payload.append("imageUrl", imageUrl);
      payload.append("publicId", publicId);

      const res = await addResource(payload);

      if (res?.error) {
        setMessage(`❌ Error: ${res.error}`);
      } else {
        setMessage("✅ Recurso agregado correctamente.");
        form.reset();
        await loadRecursos();
      }
    } catch (error: any) {
      setMessage(`❌ Error: ${error?.message || "No se pudo subir el recurso"}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateResource(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData(form);
      const image = formData.get("image") as File | null;

      const payload = new FormData();
      payload.append("id", (formData.get("id") as string) || "");
      payload.append("title", (formData.get("title") as string) || "");
      payload.append("url", (formData.get("url") as string) || "");

      if (image && image.size > 0) {
        const { imageUrl, publicId } = await uploadImageToCloudinary(image);
        payload.append("imageUrl", imageUrl);
        payload.append("publicId", publicId);
      }

      const res = await updateResource(payload);

      if (res?.error) {
        setMessage(`❌ Error al editar: ${res.error}`);
      } else {
        setMessage("✅ Recurso editado correctamente.");
        setEditingId(null);
        await loadRecursos();
      }
    } catch (error: any) {
      setMessage(`❌ Error al editar: ${error?.message || "No se pudo editar el recurso"}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Estás seguro de que querés borrar este recurso?")) return;

    setLoading(true);
    try {
      const res = await deleteResource(id);
      if (res?.error) {
        setMessage(`❌ Error al borrar: ${res.error}`);
      } else {
        setMessage("✅ Recurso borrado correctamente.");
        await loadRecursos();
      }
    } catch (error: any) {
      setMessage(`❌ Error al borrar: ${error?.message || "No se pudo borrar el recurso"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      <header className="bg-background border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold text-primary">Panel de Administración</h1>
        <Button variant="outline" onClick={() => logout()}>Cerrar Sesión</Button>
      </header>

      <main className="container max-w-5xl mx-auto pt-8 px-4">
        <Tabs defaultValue="recursos" className="w-full">
          <TabsList className="mb-6 bg-transparent p-0">
            <TabsTrigger
              value="recursos"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-6 py-2"
            >
              Recursos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recursos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agregar Nuevo Recurso</CardTitle>
                <CardDescription>
                  Subí una imagen y pega el link para agregar un nuevo recurso al carrusel.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleAddResource} className="space-y-4 max-w-md">
                  <div className="space-y-1.5">
                    <Label htmlFor="title" className="text-sm">Título del Recurso (Opcional)</Label>
                    <Input id="title" name="title" type="text" placeholder="Ej. Plan de Lectura Anual" className="h-8 text-sm" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="image" className="text-sm">Imagen del Recurso</Label>
                    <Input id="image" name="image" type="file" accept="image/*" required className="h-8 text-sm" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="url" className="text-sm">URL del Enlace (Ej. bible.com/...)</Label>
                    <Input id="url" name="url" type="url" placeholder="https://" required className="h-8 text-sm" />
                  </div>

                  {message && (
                    <p className={`text-sm font-medium ${message.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
                      {message}
                    </p>
                  )}

                  <Button type="submit" disabled={loading}>
                    {loading ? "Subiendo..." : "Agregar Recurso"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recursos Existentes</CardTitle>
                <CardDescription>
                  Gestioná los recursos que ya están publicados en la página principal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadError ? (
                  <p className="text-sm font-medium text-red-500">
                    ❌ No se pudieron cargar los recursos: {loadError}
                  </p>
                ) : recursos.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No hay recursos subidos aún.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recursos.map((recurso) => (
                      <div key={recurso.id} className="relative group border rounded-xl overflow-hidden bg-background">
                        {editingId === recurso.id ? (
                          <div className="p-4 space-y-4">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-bold text-sm">Editar Recurso</h4>
                              <Button variant="ghost" size="icon" onClick={() => setEditingId(null)}><X className="h-4 w-4" /></Button>
                            </div>
                            <form onSubmit={handleUpdateResource} className="space-y-3">
                              <input type="hidden" name="id" value={recurso.id} />
                              <div className="space-y-1">
                                <Label className="text-xs">Título (Opcional)</Label>
                                <Input name="title" type="text" defaultValue={recurso.title} className="h-7 text-xs" />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Nueva Imagen (Opcional)</Label>
                                <Input name="image" type="file" accept="image/*" className="h-7 text-xs" />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">URL del Enlace</Label>
                                <Input name="url" type="url" defaultValue={recurso.url} required className="h-7 text-xs" />
                              </div>
                              <Button type="submit" size="sm" className="w-full h-7 text-xs" disabled={loading}>
                                {loading ? "Guardando..." : "Guardar Cambios"}
                              </Button>
                            </form>
                          </div>
                        ) : (
                          <>
                            <div className="relative aspect-video w-full">
                              <Image src={recurso.imageUrl} alt="Recurso" fill className="object-cover" />
                            </div>
                            <div className="p-4 space-y-2">
                              <p className="text-sm font-medium truncate">{recurso.title || "(Sin título)"}</p>
                              <p className="text-xs text-muted-foreground truncate">{recurso.url}</p>
                              <div className="flex gap-2 pt-2">
                                <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditingId(recurso.id)} disabled={loading}>
                                  <Pencil className="w-4 h-4 mr-2" /> Editar
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(recurso.id)} disabled={loading}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
