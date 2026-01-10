import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const token = localStorage.getItem('authToken');
  const isAuthenticated = !!token;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null // evita tela branca durante redirecionamento
  }

  return children
}
