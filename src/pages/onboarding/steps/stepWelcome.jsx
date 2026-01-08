export default function StepWelcome({ onNext, onSkip }) {
  return (
    <div className="onboarding-step">

      <h1>Bem-vindo ao Mensagens Cooperativa!</h1>

      <p className="step-subtitle">
        Sua plataforma completa para comunicação acadêmica via WhatsApp
      </p>

      <p className="step-description">
        Envie mensagens individuais sobre eventos acadêmicos regionais
        e nacionais para contatos de pós-graduação em todo o Brasil,
        de forma organizada, segura e profissional.
      </p>

      <ul className="step-features">
        <li>
          <strong>Envios Individuais</strong>
          <span>Mensagens personalizadas para cada contato</span>
        </li>

        <li>
          <strong>Segmentação Avançada</strong>
          <span>Filtros por região e área acadêmica</span>
        </li>

        <li>
          <strong>Dashboard Completo</strong>
          <span>Estatísticas e métricas em tempo real</span>
        </li>
      </ul>

      {/* 🔽 AQUI ESTAVA O PROBLEMA 🔽 */}
      <div className="step-actions">
        <button className="btn-secondary" onClick={onSkip}>
          Pular tutorial
        </button>

        <button className="btn-primary" onClick={onNext}>
          Próximo
        </button>
      </div>

    </div>
  )
}
