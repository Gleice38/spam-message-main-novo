import { describe, it, expect, vi, afterEach } from 'vitest'
import { httpClient } from '../api/httpClient'
import { contactsService } from './contacts.service'

describe('contactsService', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should fetch contacts', async () => {
    // 🔥 ESPIÃO, NÃO MOCK DIRETO
    vi.spyOn(httpClient, 'get').mockResolvedValue([
      { id: 1, name: 'Ana' }
    ])

    const result = await contactsService.getAll()

    expect(result).toHaveLength(1)
    expect(httpClient.get).toHaveBeenCalledWith('/contacts')
  })
})
