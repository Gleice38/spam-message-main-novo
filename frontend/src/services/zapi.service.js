import api from "./api";

export async function sendWhatsAppMessage(phone, message) {
  try {
    const { data } = await api.post("/zapi/send-whatsapp", {
      phone,
      message
    });

    return data; // zaapId, messageId
  } catch (err) {
    const status = err.response?.status;
    const payload = err.response?.data;

    console.error("Z-API ERROR:", status, payload);
    throw new Error("Failed to send WhatsApp message");
  }
}
