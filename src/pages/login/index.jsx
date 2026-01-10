import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Lock, Eye, EyeOff, Mail } from 'lucide-react';
import './style.css';
// Importando a logo da pasta src conforme sua imagem do explorador
import softexLogo from '../../softex-logo.png'; 
import { authService } from '../../services/auth/auth.service';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const onboardingCompleted = localStorage.getItem('onboardingCompleted') === 'true';

    if (isAuthenticated) {
      navigate(onboardingCompleted ? '/dashboard' : '/onboarding');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return setError('Por favor, preencha todos os campos.');
    }
    // Basic email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setError('Email inválido. Verifique o formato.');
    }

    setLoading(true);
    setError('');

    try {
      const loginResponse = await authService.login({ email, password });
      console.log('Login response:', loginResponse); // Log the full response
      const token = loginResponse.access_token; // Assuming the token is in access_token
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('authToken', token); // Store the token
      
      const onboardingCompleted = localStorage.getItem('onboardingCompleted') === 'true';
      navigate(onboardingCompleted ? '/dashboard' : '/onboarding');
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Email ou senha inválidos.');
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
            Plataforma de disparo de mensagens individuais para contatos de pós-graduação em todo o Brasil
          </h2>
          <ul className="features-bullets">
            <li>Alcance contatos acadêmicos em diversas regiões</li>
            <li>Divulgue eventos acadêmicos via WhatsApp</li>
            <li>Gerencie suas campanhas de forma eficiente</li>
          </ul>
        </div>
      </section>

      <section className="form-section">
        {/* NOVA SEÇÃO DE REALIZAÇÃO ADICIONADA AQUI */}
        <div className="realization-header">
          <span>REALIZAÇÃO</span>
          <img src={softexLogo} alt="Softex Recife" className="logo-softex-img" />
        </div>

        <div className="auth-card">
          <header className="card-header">
            <h2>Acesse a plataforma de Mensagens Cooperativa</h2>
            <p>Faça login ou crie uma conta para continuar.</p>
          </header>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <Mail className="icon-left" size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={handleEmailChange}
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
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
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
              <a href="#" className="forgot-password">Esqueceu a senha?</a>
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="register-link">
            Não tem uma conta? <a href="#">Registrar</a>
          </p>
        </div>

        <footer className="footer-copyright">
          © 2025 Mensagens Cooperativa. Todos os direitos reservados.
        </footer>
      </section>
    </div>
  );
}