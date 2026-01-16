import { Moon, Sun, Monitor, User, Bell, Shield, Info } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import './style.css';

export default function Configuracoes() {
  const { theme, setTheme, isDark } = useTheme();

  const themeOptions = [
    { value: 'light', label: 'Claro', icon: Sun, description: 'Tema claro para ambientes iluminados' },
    { value: 'dark', label: 'Escuro', icon: Moon, description: 'Tema escuro para reduzir fadiga visual' },
    { value: 'system', label: 'Sistema', icon: Monitor, description: 'Seguir configuração do sistema' },
  ];

  return (
    <div className="configuracoes-page">
      <div className="configuracoes-header">
        <div>
          <h1>Configurações</h1>
          <p>Personalize sua experiência no sistema</p>
        </div>
      </div>

      <div className="configuracoes-container">
        {/* SEÇÃO: APARÊNCIA */}
        <section className="config-section">
          <div className="section-header">
            <div className="section-icon">
              <Monitor size={20} />
            </div>
            <div>
              <h2>Aparência</h2>
              <p>Escolha como o sistema deve ser exibido</p>
            </div>
          </div>

          <div className="config-card">
            <div className="config-item-header">
              <h3>Tema da Interface</h3>
              <span className="config-badge">{isDark ? 'Escuro' : 'Claro'}</span>
            </div>
            <p className="config-description">
              Selecione entre tema claro ou escuro para personalizar a aparência do sistema
            </p>

            <div className="theme-options">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isActive = theme === option.value;

                return (
                  <button
                    key={option.value}
                    className={`theme-option ${isActive ? 'active' : ''}`}
                    onClick={() => setTheme(option.value)}
                  >
                    <div className="theme-option-icon">
                      <Icon size={24} />
                    </div>
                    <div className="theme-option-content">
                      <span className="theme-option-label">{option.label}</span>
                      <span className="theme-option-description">{option.description}</span>
                    </div>
                    {isActive && (
                      <div className="theme-option-check">✓</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* SEÇÃO: CONTA */}
        <section className="config-section">
          <div className="section-header">
            <div className="section-icon">
              <User size={20} />
            </div>
            <div>
              <h2>Conta e Perfil</h2>
              <p>Gerencie suas informações pessoais</p>
            </div>
          </div>

          <div className="config-card">
            <div className="config-item">
              <div className="config-item-info">
                <h3>Email</h3>
                <p>admin@test.com</p>
              </div>
              <button className="btn-secondary">Alterar</button>
            </div>

            <div className="config-divider"></div>

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
          <div className="section-header">
            <div className="section-icon">
              <Bell size={20} />
            </div>
            <div>
              <h2>Notificações</h2>
              <p>Controle como você recebe notificações</p>
            </div>
          </div>

          <div className="config-card">
            <div className="config-item">
              <div className="config-item-info">
                <h3>Notificações de Campanhas</h3>
                <p>Receba alertas quando campanhas forem enviadas</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="config-divider"></div>

            <div className="config-item">
              <div className="config-item-info">
                <h3>Notificações de Erros</h3>
                <p>Receba alertas quando houver falhas no envio</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="config-divider"></div>

            <div className="config-item">
              <div className="config-item-info">
                <h3>Resumo Diário</h3>
                <p>Receba um resumo diário das atividades</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </section>

        {/* SEÇÃO: PRIVACIDADE */}
        <section className="config-section">
          <div className="section-header">
            <div className="section-icon">
              <Shield size={20} />
            </div>
            <div>
              <h2>Privacidade e Segurança</h2>
              <p>Gerencie suas configurações de privacidade</p>
            </div>
          </div>

          <div className="config-card">
            <div className="config-item">
              <div className="config-item-info">
                <h3>Autenticação em Dois Fatores</h3>
                <p>Adicione uma camada extra de segurança</p>
              </div>
              <button className="btn-secondary">Configurar</button>
            </div>

            <div className="config-divider"></div>

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
          <div className="section-header">
            <div className="section-icon">
              <Info size={20} />
            </div>
            <div>
              <h2>Sobre o Sistema</h2>
              <p>Informações e recursos do sistema</p>
            </div>
          </div>

          <div className="config-card">
            <div className="config-item">
              <div className="config-item-info">
                <h3>Versão do Sistema</h3>
                <p>1.0.0</p>
              </div>
            </div>

            <div className="config-divider"></div>

            <div className="config-item">
              <div className="config-item-info">
                <h3>API Backend</h3>
                <p>http://89.117.33.220:8000</p>
              </div>
              <a href="http://89.117.33.220:8000/docs" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Ver Docs
              </a>
            </div>

            <div className="config-divider"></div>

            <div className="config-item">
              <div className="config-item-info">
                <h3>Documentação</h3>
                <p>Guias e tutoriais de uso do sistema</p>
              </div>
              <button className="btn-secondary">Acessar</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
