import { httpClient } from '../api/httpClient'
import { endpoints } from '../api/endpoints'

export const contactsService = {
  getAll: () => httpClient.get(endpoints.contacts),

  create: (data) =>
    httpClient.post(endpoints.contacts, data),

  update: (id, data) =>
    httpClient.put(`${endpoints.contacts}/${id}`, data),

  remove: (id) =>
    httpClient.delete(`${endpoints.contacts}/${id}`)
}
