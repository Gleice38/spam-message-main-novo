import { describe, it, expect } from 'vitest'
import { httpClient } from '../api/httpClient'

import {
  mockHttpClient,
  mockEndpoints,
  resetMocks
} from '@/test-utils'

// ✅ mocks PRIMEIRO
mockHttpClient()
mockEndpoints()
resetMocks()

// ✅ service DEPOIS do mock
import * as contactsModule from './contacts.service'

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
