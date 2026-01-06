import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/login/index' // Verifique se o caminho da pasta é este mesmo
import './styles/global.css' // Se você tiver um arquivo de estilos globais

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
)