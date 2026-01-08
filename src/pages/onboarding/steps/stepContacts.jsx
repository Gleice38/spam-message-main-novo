export default function StepContacts({ onNext, onPrev }) {
  return (
    <div className="onboarding-step">

      <h1>Gerencie seus Contatos</h1>

      <p>
        Cadastre e gerencie contatos organizados por Estado, Cidade,
        Campus Universitário, Faculdade e Área Acadêmica.
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
