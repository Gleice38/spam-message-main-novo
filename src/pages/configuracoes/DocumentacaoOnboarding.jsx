import { ONBOARDING_DOC } from '../../constants/onboardingContent';
import './style.css';

export default function DocumentacaoOnboarding() {
  return (
    <div className="doc-onboarding">
      <h2>Documentação do Sistema</h2>
      <p className="doc-onboarding-desc">Todos os tópicos do onboarding estão disponíveis aqui para consulta rápida.</p>
      <div className="doc-onboarding-list">
        {ONBOARDING_DOC.map((item, idx) => (
          <section key={idx} className="doc-onboarding-section">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
