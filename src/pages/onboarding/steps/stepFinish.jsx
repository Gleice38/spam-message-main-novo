export default function StepFinish({ onFinish }) {
  return (
    <>
      <h1>Tudo Pronto!</h1>
      <p>
        Você está pronto para começar! Explore o dashboard,
        cadastre seus contatos e crie sua primeira campanha.
      </p>

      <div className="info-box">
        <strong>Segurança e Privacidade</strong>
        <p>
          Este sistema não é destinado à coleta de dados sensíveis ou PII.
          Mantenha a segurança dos seus contatos.
        </p>
      </div>

      <button onClick={onFinish}>
        Começar
      </button>
    </>
  )
}
