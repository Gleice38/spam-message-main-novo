import React, { useState } from 'react';
import { MessageSquare, Lock, Eye, EyeOff, Mail, MapPin, Calendar, TrendingUp } from 'lucide-react';
import './style.css';
import softexLogo from '../../softex-logo.png';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container-root">
      {/* SEÇÃO ESQUERDA: BRANDING */}
      <aside className="brand-side">
        <div className="brand-content">
          <div className="brand-header-group">
            <div className="mc-logo-box">
              MC
              <div className="wa-badge">
                <MessageSquare size={12} fill="white" color="white" />
              </div>
            </div>
            <div className="brand-titles">
              <h1>Mensagens Cooperativa</h1>
              <p>Plataforma de Comunicação Acadêmica</p>
            </div>
          </div>

          <h2 className="headline-hero">
            Plataforma de disparo de mensagens individuais para contatos de pós-graduação em todo o Brasil
          </h2>

          <ul className="feature-list-aligned">
            <li>
              <div className="icon-wrap sky"><MapPin size={20} /></div>
              <span>Alcance contatos acadêmicos em diversas regiões</span>
            </li>
            <li>
              <div className="icon-wrap emerald"><Calendar size={20} /></div>
              <span>Divulgue eventos acadêmicos via WhatsApp</span>
            </li>
            <li>
              <div className="icon-wrap indigo"><TrendingUp size={20} /></div>
              <span>Gerencie suas campanhas de forma eficiente</span>
            </li>
          </ul>
        </div>
      </aside>

      {/* SEÇÃO DIREITA: FORMULÁRIO */}
      <main className="form-side">
        <div className="login-card">
          <div className="realization-box">
            <span className="label-realizacao">REALIZAÇÃO</span>
            <img src={softexLogo} alt="Softex" className="softex-large" />
          </div>

          <div className="welcome-text">
            <h3>Acesse a plataforma de Mensagens Cooperativa</h3>
            <p>Faça login para continuar.</p>
          </div>

          <form className="actual-form" onSubmit={(e) => e.preventDefault()}>
            <div className="field-group">
              <label>E-mail</label>
              <div className="input-with-icon">
                <Mail className="inner-icon-left" size={18} />
                <input type="email" placeholder="seu@email.com" />
              </div>
            </div>

            <div className="field-group">
              <label>Senha</label>
              <div className="input-with-icon">
                <Lock className="inner-icon-left" size={18} />
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" />
                <button 
                  type="button" 
                  className="toggle-password-btn" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn">Entrar</button>
          </form>
        </div>
        
        <footer className="copyright-footer">
          © 2026 Mensagens Cooperativa. Todos os direitos reservados.
        </footer>
      </main>
    </div>
  );
}