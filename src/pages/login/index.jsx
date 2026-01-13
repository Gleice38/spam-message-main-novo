import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Lock, Eye, EyeOff, Mail } from 'lucide-react';
import './style.css';

import softexLogo from '../../softex-logo.png';
import { authService } from '../../services/auth/auth.service';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔁 Se já estiver autenticado, redireciona corretamente
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      const onboardingCompleted =
        localStorage.getItem('onboardingCompleted') === 'true';

      navigate(onboardingCompleted ? '/dashboard' : '/onboarding', {
        replace: true,
      });
    }
  }, [navigate]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Por favor, preencha todos os campos.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const loginResponse = await authService.login({
      email,
      password,
    });

    console.log("Login OK:", loginResponse);

    // 🔑 backend CONFIRMADO
    localStorage.setItem("authToken", loginResponse.access_token);

    const onboardingCompleted =
      localStorage.getItem("onboardingCompleted") === "true";

    navigate(onboardingCompleted ? "/dashboard" : "/onboarding");
  } catch (err) {
    console.error("Erro login:", err.response);

    if (err.response?.status === 401) {
      setError("Email ou senha incorretos.");
    } else if (err.response?.data?.detail) {
      setError(err.response.data.detail);
    } else {
      setError("Erro ao conectar com o servidor.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="login-page-wrapper">
      <section className="login-brand">
        <div className="branding-inner">
          <div className="logo-group">
            <div className="logo-circle">
              MC
              <div className="logo-float-icon">
                <MessageSquare size={14} fill="currentColor" />
              </div>
            </div>
            <div className="logo-titles">
              <h1>Mensagens Cooperativa</h1>
              <p>Plataforma de Comunicação Acadêmica</p>
            </div>
          </div>

          <h2 className="headline-text">
            Plataforma de disparo de mensagens individuais para contatos de
            pós-graduação em todo o Brasil
          </h2>

          <ul className="features-bullets">
            <li>Alcance contatos acadêmicos em diversas regiões</li>
            <li>Divulgue eventos acadêmicos via WhatsApp</li>
            <li>Gerencie suas campanhas de forma eficiente</li>
          </ul>
        </div>
      </section>

      <section className="form-section">
        <div className="realization-header">
          <span>REALIZAÇÃO</span>
          <img
            src={softexLogo}
            alt="Softex Recife"
            className="logo-softex-img"
          />
        </div>

        <div className="auth-card">
          <header className="card-header">
            <h2>Acesse a plataforma de Mensagens Cooperativa</h2>
            <p>Faça login ou crie uma conta para continuar.</p>
          </header>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div
                style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fee2e2',
                  color: '#991b1b',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '20px',
                  textAlign: 'center',
                }}
              >
                {error}
              </div>
            )}

            <div className="input-field">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <Mail className="icon-left" size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="input-field">
              <label htmlFor="password">Senha</label>
              <div className="input-container">
                <Lock className="icon-left" size={18} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="icon-right"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-actions">
              <label className="checkbox-area">
                <input type="checkbox" disabled={loading} />
                <span>Lembrar-me</span>
              </label>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <footer className="footer-copyright">
          © 2025 Mensagens Cooperativa. Todos os direitos reservados.
        </footer>
      </section>
    </div>
  );
}
