export default function StepSegmentation({ onNext, onPrev }) {
  return (
    <div className="onboarding-step">

      <h1>Segmentação Inteligente</h1>

      <p>
        Use filtros avançados para segmentar sua audiência por região
        e áreas acadêmicas específicas.
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
