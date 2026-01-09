import { describe, it, expect, vi } from 'vitest'
import * as contactsModule from './contacts.service'
import { httpClient } from '../api/httpClient'

const { contactsService } = contactsModule

vi.mock('../api/httpClient', () => ({
  httpClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

vi.mock('../api/endpoints', () => ({
  endpoints: {
    contacts: '/contacts'
  }
}))

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
