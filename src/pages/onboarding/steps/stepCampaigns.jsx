export default function StepCampaigns({ onNext, onPrev }) {
  return (
    <div className="onboarding-step">

      <h1>Crie Campanhas Personalizadas</h1>

      <p>
        Crie campanhas de WhatsApp com mensagens personalizadas.
        Todas as mensagens são enviadas individualmente, garantindo
        comunicação profissional.
      </p>

      <div className="step-actions">
        <button className="btn-secondary" onClick={onPrev}>
          Anterior
        </button>

        <button className="btn-primary" onClick={onNext}>
          Próximo
        </button>
      </div>

    </div>
  )
}
