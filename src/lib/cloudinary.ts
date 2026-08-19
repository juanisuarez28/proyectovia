import { v2 as cloudinary } from "cloudinary";

export const CLOUDINARY_FOLDER = "proyectovia/recursos";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export const missingCloudinaryEnv = [
  !cloudName && "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
  !apiKey && "CLOUDINARY_API_KEY",
  !apiSecret && "CLOUDINARY_API_SECRET",
].filter(Boolean) as string[];

export function assertCloudinaryConfig() {
  if (missingCloudinaryEnv.length > 0) {
    throw new Error(
      `Cloudinary no esta configurado. Faltan estas variables de entorno: ${missingCloudinaryEnv.join(", ")}. ` +
        `Cargalas en Vercel (Settings > Environment Variables, entorno Production) y volve a desplegar.`
    );
  }
}

/** Extrae el public_id de una URL de Cloudinary (soporta carpetas y transformaciones). */
export function publicIdFromUrl(url?: string | null): string | null {
  if (!url || !url.includes("res.cloudinary.com")) return null;
  const matches = url.match(/\/upload\/(?:.*?\/)?v\d+\/(.+?)\.[a-zA-Z0-9]+$/);
  return matches?.[1] ?? null;
}

export { cloudinary, cloudName as CLOUDINARY_CLOUD_NAME, apiKey as CLOUDINARY_API_KEY };
export default cloudinary;
