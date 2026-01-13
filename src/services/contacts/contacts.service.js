import api from "../api";

export const contactsService = {
  getAll: async () => {
    const response = await api.get("/contacts");
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/contacts", data);
    return response.data;
  },
};
