import api from "../api";

export const contactsService = {
  // GET /contacts/
  getAll: async () => {
    const { data } = await api.get("/contacts/");
    return data;
  },

  // POST /contacts/
  create: async (contact) => {
    const { data } = await api.post("/contacts/", contact);
    return data;
  },

  // PUT /contacts/{id}
  update: async (id, contact) => {
    const { data } = await api.put(`/contacts/${id}`, contact);
    return data;
  },

  // DELETE /contacts/{id}
  remove: async (id) => {
    await api.delete(`/contacts/${id}`);
  },
};
