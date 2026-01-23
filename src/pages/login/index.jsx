import React, { useState } from 'react';
import { MessageSquare, Mail, Lock, Eye, EyeOff, MapPin, Calendar, TrendingUp } from 'lucide-react';
import './style.css'; 

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page-wrapper">
      {/* SEÇÃO ESQUERDA - BRANDING */}
      <section className="login-brand">
        <div className="logo-group">
          <div className="logo-badge-main">
            <span>MC</span>
            <div className="logo-badge-whatsapp">
              <MessageSquare size={14} color="white" fill="white" />
            </div>
          </div>
          <div className="logo-titles">
            <h1>Mensagens Cooperativa</h1>
            <p>Plataforma de Comunicação Acadêmica</p>
          </div>
        </div>

        <h2 className="headline-text">
          Plataforma de disparo de mensagens individuais para contatos de pós-graduação em todo o Brasil
        </h2>

        <ul className="features-bullets">
          <li>
            <div className="icon-box icon-blue"><MapPin size={18} color="white" /></div>
            <span>Alcance contatos acadêmicos em diversas regiões</span>
          </li>
          <li>
            <div className="icon-box icon-green"><Calendar size={18} color="white" /></div>
            <span>Divulgue eventos acadêmicos via WhatsApp</span>
          </li>
          <li>
            <div className="icon-box icon-purple"><TrendingUp size={18} color="white" /></div>
            <span>Gerencie suas campanhas de forma eficiente</span>
          </li>
        </ul>
      </section>

      {/* SEÇÃO DIREITA - FORMULÁRIO */}
      <section className="form-section">
        <div className="auth-card">
          <div className="realization-group">
            <p className="realization-label">REALIZAÇÃO</p>
            <img src="/softex-logo.png" alt="Logo Softex Pernambuco" className="logo-softex-img" />
          </div>

          <header className="card-header">
            <h2>Acesse a plataforma de Mensagens Cooperativa</h2>
            <p>Faça login para continuar.</p>
          </header>

          <form className="login-form">
            <div className="input-field">
              <label>E-mail</label>
              <div className="input-container">
                <Mail className="icon-left" size={18} />
                <input type="email" placeholder="seu@email.com" />
              </div>
            </div>

            <div className="input-field">
              <label>Senha</label>
              <div className="input-container">
                <Lock className="icon-left" size={18} />
                <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" />
                <button 
                  type="button" 
                  className="icon-right" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-submit">Entrar</button>
          </form>
        </div>
        <p className="footer-copyright">© 2025 Mensagens Cooperativa. Todos os direitos reservados.</p>
      </section>
    </div>
  );
}