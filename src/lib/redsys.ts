import crypto from 'crypto';

/**
 * Genera la firma para Redsys (Ds_Signature) utilizando HMAC-SHA256.
 * @param merchantParametersBase64 Los parámetros de la transacción en Base64.
 * @param orderId El número de pedido (Ds_Merchant_Order).
 * @param secretKey La clave secreta del comercio (SHA-256).
 */
export function createRedsysSignature(
  merchantParametersBase64: string,
  orderId: string,
  secretKey: string
): string {
  // 1. Decodificar la clave secreta desde Base64
  const key = Buffer.from(secretKey, 'base64');

  // 2. Cifrado 3DES del ID del pedido usando la clave secreta
  // Redsys requiere un IV de ceros y padding de ceros para completar bloques de 8 bytes
  const iv = Buffer.alloc(8, 0);
  const cipher = crypto.createCipheriv('des-ede3-cbc', key, iv);
  cipher.setAutoPadding(false); // Importante: Redsys usa padding de ceros manual
  
  const orderIdBuffer = Buffer.from(orderId, 'utf-8');
  const padding = (8 - (orderIdBuffer.length % 8)) % 8; // Asegurar múltiplo de 8
  const paddedOrderId = Buffer.concat([orderIdBuffer, Buffer.alloc(padding, 0)]);
  
  const operationalKey = Buffer.concat([
    cipher.update(paddedOrderId),
    cipher.final()
  ]);

  // 3. Calcular HMAC-SHA256 usando la clave operacional generada y los parámetros en Base64
  const hmac = crypto.createHmac('sha256', operationalKey);
  hmac.update(merchantParametersBase64);
  const signature = hmac.digest();

  // 4. Devolver la firma codificada en Base64
  return signature.toString('base64');
}

/**
 * Codifica un objeto de parámetros en Base64.
 */
export function encodeParameters(params: object): string {
  return Buffer.from(JSON.stringify(params)).toString('base64');
}

/**
 * Genera un número de pedido único compatible con Redsys (4-12 caracteres).
 * Debe empezar por dígitos o ser puramente numérico.
 */
export function generateOrderId(): string {
  // Usamos los últimos 10 dígitos del timestamp para asegurar unicidad y longitud correcta
  return Date.now().toString().slice(-10);
}
