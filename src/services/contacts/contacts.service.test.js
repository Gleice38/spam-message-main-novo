import { describe, it, expect } from 'vitest'
import * as contactsModule from './contacts.service'
import { httpClient } from '../api/httpClient'

import {
  mockHttpClient,
  mockEndpoints,
  resetMocks
} from '@/test-utils'

// setup padrão de testes
mockHttpClient()
mockEndpoints()
resetMocks()

const { contactsService } = contactsModule

describe('contactsService', () => {
  it('should fetch contacts', async () => {
    httpClient.get.mockResolvedValue([
      { id: 1, name: 'Ana' }
    ])

    const result = await contactsService.getAll()

    expect(result).toHaveLength(1)
    expect(httpClient.get).toHaveBeenCalledWith('/contacts')
  })
})
