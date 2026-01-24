import {
  Moon,
  Sun,
  Monitor,
  User,
  Bell,
  Shield,
  Info,
  CheckCircle,
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useState, useEffect } from 'react';
import TwoFactorModal from '../../components/TwoFactorModal/TwoFactorModal';
import DocumentacaoOnboarding from './DocumentacaoOnboarding';
import './style.css';

export default function Configuracoes() {
  const { theme, setTheme, isDark } = useTheme();
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showDoc, setShowDoc] = useState(false);

  useEffect(() => {
    const enabled = localStorage.getItem('2fa_enabled') === 'true';
    setIs2FAEnabled(enabled);
  }, []);

  const handleEnable2FA = () => {
    localStorage.setItem('2fa_enabled', 'true');
    setIs2FAEnabled(true);
  };

  const handleDisable2FA = () => {
    if (
      window.confirm(
        'Tem certeza que deseja desativar a autenticação em dois fatores?'
      )
    ) {
      localStorage.removeItem('2fa_enabled');
      setIs2FAEnabled(false);
    }
  };

  return (
    <div className="configuracoes-page">
      <TwoFactorModal
        isOpen={is2FAModalOpen}
        onClose={() => setIs2FAModalOpen(false)}
        onEnable={handleEnable2FA}
      />

      {/* WRAPPER GLOBAL (alinha header + cards) */}
      <div className="configuracoes-wrapper">
        {/* HEADER */}
        <header className="configuracoes-header">
          <h1>Configurações</h1>
          <p>Personalize sua experiência no sistema</p>
        </header>

        <div className="configuracoes-container">
          {/* SEÇÃO: CONTA */}
          <section className="config-section">
            <div className="config-card">
              <div className="section-header">
                <div className="section-icon">
                  <User size={28} color="#fff" />
                </div>
                <div className="section-header-titles">
                  <h2>Meu Perfil</h2>
                  <p>Atualize suas informações pessoais</p>
                </div>
              </div>

              <div className="config-item">
                <div className="config-item-info">
                  <h3>Email</h3>
                  <p>admin@test.com</p>
                </div>
                <button className="btn-secondary">Alterar</button>
              </div>

              <div className="config-divider" />

              <div className="config-item">
                <div className="config-item-info">
                  <h3>Senha</h3>
                  <p>••••••••</p>
                </div>
                <button className="btn-secondary">Alterar</button>
              </div>
            </div>
          </section>

          {/* SEÇÃO: NOTIFICAÇÕES */}
          <section className="config-section">
            <div className="config-card">
              <div className="section-header">
                <div className="section-icon">
                  <Bell size={28} color="#fff" />
                </div>
                <div className="section-header-titles">
                  <h2>Notificações</h2>
                  <p>Controle como você recebe notificações</p>
                </div>
              </div>

              <div className="config-item">
                <div className="config-item-info">
                  <h3>Notificações de Campanhas</h3>
                  <p>Receba alertas quando campanhas forem enviadas</p>
                </div>
                <label className="checkbox-seta">
                  <input type="checkbox" defaultChecked />
                </label>
              </div>

              <div className="config-divider" />

              <div className="config-item">
                <div className="config-item-info">
                  <h3>Notificações de Erros</h3>
                  <p>Receba alertas quando houver falhas no envio</p>
                </div>
                <label className="checkbox-seta">
                  <input type="checkbox" defaultChecked />
                </label>
              </div>

              <div className="config-divider" />

              <div className="config-item">
                <div className="config-item-info">
                  <h3>Resumo Diário</h3>
                  <p>Receba um resumo diário das atividades</p>
                </div>
                <label className="checkbox-seta">
                  <input type="checkbox" />
                </label>
              </div>
            </div>
          </section>

          {/* SEÇÃO: PRIVACIDADE */}
          <section className="config-section">
            <div className="config-card">
              <div className="section-header">
                <div className="section-icon">
                  <Shield size={28} color="#fff" />
                </div>
                <div className="section-header-titles">
                  <h2>Privacidade e Segurança</h2>
                  <p>Gerencie suas configurações de privacidade</p>
                </div>
              </div>

              <div className="config-item">
                <div className="config-item-info">
                  <h3>Autenticação em Dois Fatores</h3>
                  <p>Adicione uma camada extra de segurança</p>

                  {is2FAEnabled && (
                    <span
                      style={{
                        color: 'var(--success-500)',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '4px',
                      }}
                    >
                      <CheckCircle size={14} /> Ativado
                    </span>
                  )}
                </div>

                {is2FAEnabled ? (
                  <button
                    className="btn-secondary"
                    onClick={handleDisable2FA}
                    style={{
                      color: 'var(--danger-500)',
                      borderColor: 'var(--danger-200)',
                    }}
                  >
                    Desativar
                  </button>
                ) : (
                  <button
                    className="btn-secondary"
                    onClick={() => setIs2FAModalOpen(true)}
                  >
                    Configurar
                  </button>
                )}
              </div>

              <div className="config-divider" />

              <div className="config-item">
                <div className="config-item-info">
                  <h3>Sessões Ativas</h3>
                  <p>Gerencie dispositivos conectados</p>
                </div>
                <button className="btn-secondary">Ver Sessões</button>
              </div>
            </div>
          </section>

          {/* SEÇÃO: SOBRE */}
          <section className="config-section">
            <div className="config-card">
              <div className="section-header">
                <div className="section-icon">
                  <Info size={28} color="#fff" />
                </div>
                <div className="section-header-titles">
                  <h2>Sobre o Sistema</h2>
                  <p>Informações e recursos do sistema</p>
                </div>
              </div>

              <div className="config-item">
                <div className="config-item-info">
                  <h3>Versão do Sistema</h3>
                  <p>1.0.0</p>
                </div>
              </div>

              <div className="config-divider" />

              <div className="config-item">
                <div className="config-item-info">
                  <h3>Documentação</h3>
                  <p>Guias e tutoriais de uso do sistema</p>
                </div>
                <button
                  className="btn-secondary"
                  onClick={() => setShowDoc((v) => !v)}
                >
                  {showDoc ? 'Fechar' : 'Acessar'}
                </button>
              </div>

              {showDoc && (
                <div style={{ marginTop: '32px' }}>
                  <DocumentacaoOnboarding />
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="dashboard-footer">
        <div className="dashboard-footer__content">
          <img
            src="/softex-logo.png"
            alt="Softex"
            className="dashboard-footer__logo"
          />
          <span>
            ©2025 Mensagens Cooperativa. Todos os direitos reservados.
          </span>
        </div>
      </footer>
    </div>
  );
}
