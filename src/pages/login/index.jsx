import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Lock, Eye, EyeOff, CreditCard } from 'lucide-react';
import './style.css';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState(''); // Estado para a senha
  const [error, setError] = useState(''); // Estado para a mensagem de erro
  
  const navigate = useNavigate() // ✅ AQUI
  
useEffect(() => {
  const isAuthenticated =
    localStorage.getItem('isAuthenticated') === 'true'

  const onboardingCompleted =
    localStorage.getItem('onboardingCompleted') === 'true'

  if (isAuthenticated) {
    if (onboardingCompleted) {
      navigate('/dashboard')
    } else {
      navigate('/onboarding')
    }
  }
}, [])


  const handleCPFChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    setCpf(value);
    if (error) setError(''); // Limpa o erro ao digitar
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação simples: campos vazios ou CPF incompleto
    if (!cpf || !password) {
      setError('Por favor, preencha todos os campos.');
    } else if (cpf.length < 14) {
      setError('CPF inválido. Verifique os números.');
    } else {
      setError('')

      localStorage.setItem('isAuthenticated', 'true')

const onboardingCompleted =
  localStorage.getItem('onboardingCompleted') === 'true'

if (onboardingCompleted) {
  navigate('/dashboard')
} else {
  navigate('/onboarding')
}

    
    }
  }


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
        <div className="auth-card">
          <header className="card-header">
            <h2>Acesse a plataforma de Mensagens Cooperativa</h2>
            <p>Faça login ou crie uma conta para continuar.</p>
          </header>

          <form className="login-form" onSubmit={handleSubmit}>
            
            {/* EXIBIÇÃO DA MENSAGEM DE ERRO */}
            {error && <div className="error-message">{error}</div>}

            <div className="input-field">
              <label htmlFor="cpf">CPF</label>
              <div className="input-container">
                <CreditCard className="icon-left" size={18} />
                <input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={handleCPFChange}
                  maxLength="14"
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
                />
                <button 
                  type="button" 
                  className="icon-right"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-actions">
              <label className="checkbox-area">
                <input type="checkbox" />
                <span>Lembrar-me</span>
              </label>
              <a href="#" className="forgot-password">Esqueceu a senha?</a>
            </div>

            <button type="submit" className="btn-submit">Entrar</button>
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