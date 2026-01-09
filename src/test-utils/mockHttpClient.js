import { vi } from 'vitest'

export function mockHttpClient() {
  vi.mock('@/services/api/httpClient', () => ({
    httpClient: {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn()
    }
  }))
}
