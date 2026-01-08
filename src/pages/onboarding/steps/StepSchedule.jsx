export default function StepSchedule({ onNext, onPrev }) {
  return (
    <div className="onboarding-step">

      <h1>Agende e Controle</h1>

      <p>
        Defina horários permitidos para envio e intervalos entre mensagens.
        Respeite o tempo dos seus contatos e evite bloqueios.
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