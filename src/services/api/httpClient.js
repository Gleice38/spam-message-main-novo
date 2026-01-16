const BASE_URL = ''

async function request(url, options = {}) {
  const token = localStorage.getItem('authToken');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    headers,
    ...options
  });

  if (!response.ok) {
    const error = await response.json()
    throw error
  }

  return response.json()
}

export const httpClient = {
  get: (url) => request(url),
  post: (url, body) =>
    request(url, {
      method: 'POST',
      body: JSON.stringify(body)
    }),
  put: (url, body) =>
    request(url, {
      method: 'PUT',
      body: JSON.stringify(body)
    }),
  delete: (url) =>
    request(url, { method: 'DELETE' })
}
