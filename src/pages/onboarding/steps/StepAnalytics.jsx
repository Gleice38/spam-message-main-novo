export default function StepAnalytics({ onNext, onPrev }) {
  return (
    <div className="onboarding-step">

      <h1>Acompanhe Resultados</h1>

      <p>
        Visualize métricas importantes como total de contatos,
        mensagens enviadas, campanhas ativas e distribuição por região.
        Tome decisões baseadas em dados.
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
