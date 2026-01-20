import axios from "axios";

const {
  ZAPI_CLIENT_TOKEN,
  ZAPI_INSTANCE_TOKEN,
  ZAPI_INSTANCE_ID
} = process.env;

const zapi = axios.create({
  baseURL: `https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_INSTANCE_TOKEN}`,
  headers: {
    "Client-Token": ZAPI_CLIENT_TOKEN,
    "Content-Type": "application/json"
  },
  timeout: 15000
});

export async function sendWhatsAppMessage(phone, message) {
  try {
    const { data } = await zapi.post("/send-text", {
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
