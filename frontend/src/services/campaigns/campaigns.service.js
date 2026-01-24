import api from '../api'

export const campaignsService = {
  async send(payload) {
    const response = await api.post('/campaigns/send', payload)
    return response.data
  },

  async getAll() {
    const response = await api.get('/campaigns/')
    return response.data
  }
}
