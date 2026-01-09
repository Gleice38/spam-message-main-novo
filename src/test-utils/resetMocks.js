import { afterEach, vi } from 'vitest'

export function resetMocks() {
  afterEach(() => {
    vi.clearAllMocks()
  })
}
