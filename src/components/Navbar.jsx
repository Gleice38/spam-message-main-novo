import {
  LayoutGrid,
  Send,
  Users,
  Settings,
  LogOut,
  User,
  Bell,
  Zap
} from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'
import softexLogo from "../softex-logo.png";


export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  function handleLogout() {
  console.log("🟥 Logout clicado");

  localStorage.removeItem('authToken');
  localStorage.removeItem('onboardingCompleted');

  console.log(
    "🧹 Token após logout:",
    localStorage.getItem('authToken')
  );

  navigate('/', { replace: true });
}


  return (
    <header className="navbar">
      {/* LOGO */}
      <div className="navbar-brand">
  <div className="logo-wrapper">
  <img
    src={softexLogo}
    alt="Softex"
    className="brand-logo"
  />

  <div className="logo-circle">MC</div>
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

        <button
          className={`nav-item ${isActive('/campaigns') ? 'active' : ''}`}
          onClick={() => navigate('/campaigns')}
        >
          <Send size={16} />
          Nova Campanha
        </button>

        <button
          className={`nav-item ${isActive('/contacts') ? 'active' : ''}`}
          onClick={() => navigate('/contacts')}
        >
          <Users size={16} />
          Gerenciar Contatos
        </button>
        <button
          className={`nav-item ${isActive('/perfil') ? 'active' : ''}`}
          onClick={() => navigate('/perfil')}
        >
          <User size={16} />
          Perfil
        </button>
        <button
          className={`nav-item ${isActive('/preferencias') ? 'active' : ''}`}
          onClick={() => navigate('/preferencias')}
        >
          <Zap size={16} />
          Preferências de Envio
        </button>
         <button
          className={`nav-item ${isActive('/notificacoes') ? 'active' : ''}`}
          onClick={() => navigate('/notificacoes')}
        >
          <Bell size={16} />
          Notificações
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
