export function mockEndpoints() {
  vi.mock('@/services/api/endpoints', () => ({
    endpoints: {
      contacts: '/contacts',
      campaigns: '/campaigns'
    }
  }))
}
