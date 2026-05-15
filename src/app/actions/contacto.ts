"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  nombre: string;
  email: string;
  telefono?: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const { nombre, email, telefono } = data;

  try {
    await resend.emails.send({
      from: `Contacto desde Sitio Web <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
      to: "juanisua3@gmail.com",
      subject: `Nuevo contacto de ${nombre}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a365d; border-bottom: 2px solid #3182ce; padding-bottom: 10px;">
            Nuevo mensaje de contacto
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #4a5568; border-bottom: 1px solid #e2e8f0; width: 120px;">Nombre:</td>
              <td style="padding: 12px; color: #2d3748; border-bottom: 1px solid #e2e8f0;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #4a5568; border-bottom: 1px solid #e2e8f0;">Email:</td>
              <td style="padding: 12px; color: #2d3748; border-bottom: 1px solid #e2e8f0;">
                <a href="mailto:${email}" style="color: #3182ce;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #4a5568; border-bottom: 1px solid #e2e8f0;">Teléfono:</td>
              <td style="padding: 12px; color: #2d3748; border-bottom: 1px solid #e2e8f0;">${telefono || "No proporcionado"}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #a0aec0;">
            Este mensaje fue enviado desde el formulario de contacto de proyectovia.org
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return { success: false, error: "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde." };
  }
}
