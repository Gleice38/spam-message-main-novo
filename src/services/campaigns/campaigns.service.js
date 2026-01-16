import { httpClient } from '../api/httpClient'
import { endpoints } from '../api/endpoints'

const USE_MOCK = true

async function mockSend(payload) {
  if (!payload?.message) {
    throw new Error('Mensagem obrigatória')
  }

  return { success: true }
}

async function realSend(payload) {
  return httpClient.post(endpoints.campaigns, payload)
}

export const campaignsService = {
  send: USE_MOCK ? mockSend : realSend,
  getAll: () => httpClient.get(endpoints.campaigns)
}
