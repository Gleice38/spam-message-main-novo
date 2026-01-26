import {
  LayoutGrid,
  Send,
  Users,
  Settings,
  LogOut,
  Menu
} from 'lucide-react'

import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';
import LogoMC from './LogoMC';


export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  function handleLogout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('onboardingCompleted');

  navigate('/', { replace: true });
}

  function handleNavigate(path) {
    navigate(path)
    setMenuOpen(false)
  }


  return (
    <header className="navbar">
      {/* LOGO */}
      <div className="navbar-brand">
        <div className="logo-wrapper">
          <LogoMC />
        </div>
        <div className="brand-text">
          <strong>Mensagens Cooperativa</strong>
          <span>Comunicação Acadêmica</span>
        </div>
      </div>
      <button
        className="navbar-toggle"
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Abrir menu"
        aria-expanded={menuOpen}
      >
        <Menu size={20} />
      </button>
      {/* MENU */}
      <nav className={`navbar-menu ${menuOpen ? 'is-open' : ''}`}>
        <button
          className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
          onClick={() => handleNavigate('/dashboard')}
        >
          <span className="nav-icon nav-icon--blue"><LayoutGrid size={20} /></span>
          Dashboard
        </button>
        <button
          className={`nav-item ${isActive('/campaigns') ? 'active' : ''}`}
          onClick={() => handleNavigate('/campaigns')}
        >
          <span className="nav-icon nav-icon--cyan"><Send size={20} /></span>
          Nova Campanha
        </button>
        <button
          className={`nav-item ${isActive('/contacts') ? 'active' : ''}`}
          onClick={() => handleNavigate('/contacts')}
        >
          <span className="nav-icon nav-icon--green"><Users size={20} /></span>
          Gerenciar Contatos
        </button>
        <button
          className={`nav-item ${isActive('/configuracoes') ? 'active' : ''}`}
          onClick={() => handleNavigate('/configuracoes')}
        >
          <span className="nav-icon nav-icon--gray"><Settings size={20} /></span>
          Configurações
        </button>
      </nav>
      {/* AÇÕES */}
      <div className={`navbar-actions ${menuOpen ? 'is-open' : ''}`}>
        <div className="divider" />
        <button className="nav-item logout" onClick={handleLogout}>
          <span className="nav-icon nav-icon--red"><LogOut size={20} /></span>
          Sair
        </button>
      </div>
    </header>
  )
}
