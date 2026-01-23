import {
  LayoutGrid,
  Send,
  Users,
  Settings,
  LogOut,
  User,
  Bell,
  Sliders
} from 'lucide-react'

import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import LogoMC from './LogoMC';


export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  function handleLogout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('onboardingCompleted');

  navigate('/', { replace: true });
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
      {/* MENU */}
      <nav className="navbar-menu">
        <button
          className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          <span className="nav-icon nav-icon--blue"><LayoutGrid size={20} /></span>
          Dashboard
        </button>
        <button
          className={`nav-item ${isActive('/campaigns') ? 'active' : ''}`}
          onClick={() => navigate('/campaigns')}
        >
          <span className="nav-icon nav-icon--cyan"><Send size={20} /></span>
          Nova Campanha
        </button>
        <button
          className={`nav-item ${isActive('/contacts') ? 'active' : ''}`}
          onClick={() => navigate('/contacts')}
        >
          <span className="nav-icon nav-icon--green"><Users size={20} /></span>
          Gerenciar Contatos
        </button>
        <button
          className={`nav-item ${isActive('/configuracoes') ? 'active' : ''}`}
          onClick={() => navigate('/configuracoes')}
        >
          <span className="nav-icon nav-icon--gray"><Settings size={20} /></span>
          Configurações
        </button>
      </nav>
      {/* AÇÕES */}
      <div className="navbar-actions">
        <div className="divider" />
        <button className="nav-item logout" onClick={handleLogout}>
          <span className="nav-icon nav-icon--red"><LogOut size={20} /></span>
          Sair
        </button>
      </div>
    </header>
  )
}
