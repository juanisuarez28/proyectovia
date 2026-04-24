"use server";

import { createRedsysSignature, encodeParameters, generateOrderId } from "@/lib/redsys";

export async function getRedsysParameters(amount: number) {
  const secretKey = process.env.REDSYS_SECRET_KEY?.trim();
  const merchantCode = process.env.REDSYS_FUC?.trim();
  const terminal = (process.env.REDSYS_TERMINAL || "1").trim();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim();

  if (!secretKey || !merchantCode) {
    console.error("Redsys configuration is missing in environment variables");
    throw new Error("Error de configuración del sistema de pagos.");
  }

  if (!baseUrl) {
    console.error("NEXT_PUBLIC_BASE_URL is missing in environment variables");
    throw new Error("Error de configuración de URL.");
  }

  // Redsys requiere el importe en céntimos (ej: 10.50€ -> 1050)
  const amountInCents = Math.round(amount * 100).toString();
  const orderId = generateOrderId();

  console.log("Generando parámetros Redsys para importe:", amount, "en céntimos:", amountInCents);
  console.log("FUC:", merchantCode, "Terminal:", terminal);

  const merchantParameters = {
    Ds_Merchant_Amount: amountInCents,
    Ds_Merchant_Order: orderId,
    Ds_Merchant_MerchantCode: merchantCode,
    Ds_Merchant_Currency: "978", // EUR
    Ds_Merchant_TransactionType: "0", // Autorización
    Ds_Merchant_Terminal: terminal.padStart(3, '0'), // Asegurar 3 dígitos (ej: 001)
    Ds_Merchant_UrlOK: `${baseUrl}/donacion/exito`,
    Ds_Merchant_UrlKO: `${baseUrl}/donacion/error`,
  };

  const paramsBase64 = encodeParameters(merchantParameters);
  const signature = createRedsysSignature(paramsBase64, orderId, secretKey);

  return {
    signature,
    paramsBase64,
    url: process.env.REDSYS_ENVIRONMENT === "production" 
      ? "https://sis.redsys.es/sis/realizarPago" 
      : "https://sis-t.redsys.es:25443/sis/realizarPago"
  };
}
