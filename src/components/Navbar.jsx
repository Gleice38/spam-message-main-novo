import {
  LayoutGrid,
  Send,
  Users,
  Settings,
  LogOut,
  MessageSquare
} from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  function handleLogout() {
    localStorage.removeItem('isAuthenticated')
    navigate('/')
  }

  return (
    <header className="navbar">
      {/* LOGO */}
      <div className="navbar-brand">
        <div className="logo-circle">
          MC
        </div>

        <div className="brand-text">
          <strong>Mensagens Cooperativa</strong>
          <span>Comunicação Acadêmica</span>
        </div>
      </div>

      {/* MENU */}
      <nav className="navbar-menu">
        <button
          className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          <LayoutGrid size={16} />
          Dashboard
        </button>

        <button className="nav-item">
          <Send size={16} />
          Nova Campanha
        </button>

        <button className="nav-item">
          <Users size={16} />
          Gerenciar Contatos
        </button>
      </nav>

      {/* AÇÕES */}
      <div className="navbar-actions">
        <button className="nav-item subtle">
          <Settings size={16} />
          Configurações
        </button>

        <div className="divider" />

        <button className="nav-item logout" onClick={handleLogout}>
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </header>
  )
}
