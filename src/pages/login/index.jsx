import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Lock, Eye, EyeOff, Mail, ShieldCheck } from 'lucide-react';
import './style.css';

import softexLogo from '../../softex-logo.png';
import { authService } from '../../services/auth/auth.service';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Login, 2: 2FA
  const [twoFactorCode, setTwoFactorCode] = useState('');

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

    // Check for 2FA simulation
    const is2FAEnabled = localStorage.getItem('2fa_enabled') === 'true';

    if (is2FAEnabled) {
      // Store token temporarily or just keep in memory if possible, 
      // but for this flow we'll set it but block navigation
      localStorage.setItem("authToken", loginResponse.access_token);
      setLoading(false);
      setStep(2);
      return;
    }

    // 🔑 backend CONFIRMADO
    localStorage.setItem("authToken", loginResponse.access_token);

    const onboardingCompleted =
      localStorage.getItem("onboardingCompleted") === "true";

    navigate(onboardingCompleted ? "/dashboard" : "/onboarding");
  } catch (error) {
  if (error.response?.status === 401) {
    setError("Email ou senha incorretos.");
  } else if (error.response?.data?.detail) {
    // FastAPI geralmente retorna array
    const detail = error.response.data.detail;

    if (Array.isArray(detail)) {
      setError(detail[0]?.msg || "Erro de validação.");
    } else if (typeof detail === "string") {
      setError(detail);
    } else {
      setError("Erro de validação.");
    }
  } else {
    setError("Erro ao conectar com o servidor.");
  }
  setLoading(false);
}
};

const handle2FAVerify = (e) => {
  e.preventDefault();
  setLoading(true);
  
  setTimeout(() => {
    if (twoFactorCode === '123456') {
      const onboardingCompleted = localStorage.getItem("onboardingCompleted") === "true";
      navigate(onboardingCompleted ? "/dashboard" : "/onboarding");
    } else {
      setError("Código incorreto.");
      setLoading(false);
    }
  }, 1000);
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

          {step === 1 ? (
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
          ) : (
            <form className="login-form" onSubmit={handle2FAVerify}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <ShieldCheck size={48} color="var(--primary-500)" style={{ marginBottom: '1rem' }} />
                <h3>Autenticação em Dois Fatores</h3>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  Digite o código de 6 dígitos do seu aplicativo autenticador.
                </p>
              </div>

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
                <div className="input-container" style={{ justifyContent: 'center' }}>
                  <input
                    type="text"
                    maxLength="6"
                    placeholder="000000"
                    value={twoFactorCode}
                    onChange={(e) => {
                      setTwoFactorCode(e.target.value.replace(/\D/g, ''));
                      setError('');
                    }}
                    disabled={loading}
                    style={{ 
                      textAlign: 'center', 
                      fontSize: '1.5rem', 
                      letterSpacing: '0.5rem',
                      paddingLeft: '1rem' 
                    }}
                    autoFocus
                  />
                </div>
              </div>

              <button type="submit" className="btn-submit" disabled={loading || twoFactorCode.length !== 6}>
                {loading ? 'Verificando...' : 'Verificar'}
              </button>
              
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => {
                  setStep(1);
                  localStorage.removeItem("authToken"); // Clear token if going back
                }}
                style={{ marginTop: '1rem', width: '100%' }}
              >
                Voltar para Login
              </button>
            </form>
          )}
        </div>

        <footer className="footer-copyright">
          © 2025 Mensagens Cooperativa. Todos os direitos reservados.
        </footer>
      </section>
    </div>
  );
}
