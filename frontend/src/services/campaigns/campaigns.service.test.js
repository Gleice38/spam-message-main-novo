import { describe, it, expect } from 'vitest'

// 1️⃣ mocks PRIMEIRO
import {
  mockHttpClient,
  mockEndpoints,
  resetMocks
} from '@/test-utils'

mockHttpClient()
mockEndpoints()
resetMocks()

// 2️⃣ imports DEPOIS
import * as campaignsModule from './campaigns.service'
import { httpClient } from '../api/httpClient'

const { campaignsService } = campaignsModule

describe('campaignsService (mock mode)', () => {
  it('should send campaign successfully', async () => {
    const response = await campaignsService.send({
      name: 'Campanha',
      message: 'Mensagem válida',
      contacts: [1, 2]
    })

    expect(response).toEqual({ success: true })
  })

  it('should throw error when message is missing', async () => {
    await expect(
      campaignsService.send({
        name: 'Campanha sem mensagem'
      })
    ).rejects.toThrow('Mensagem obrigatória')
  })
})

