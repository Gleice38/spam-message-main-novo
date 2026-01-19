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
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css';


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
      </nav>

      {/* AÇÕES */}
      <div className="navbar-actions">
        <button
          className={`nav-item subtle ${isActive('/configuracoes') ? 'active' : ''}`}
          onClick={() => navigate('/configuracoes')}
        >
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
