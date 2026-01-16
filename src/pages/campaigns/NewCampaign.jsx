import "./NewCampaign.css";
import { MessageSquare, Filter, Calendar } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { campaignsService } from "../../services/campaigns/campaigns.service";

export default function NewCampaign() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    message_body: "",
    scheduled_at: null,
  });
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const isFormValid = formData.name.trim() && formData.message_body.trim();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isFormValid) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);

    try {
      const payload = { ...formData };

      // Se agendamento estiver habilitado
      if (scheduleEnabled && scheduleDate && scheduleTime) {
        payload.scheduled_at = `${scheduleDate}T${scheduleTime}:00`;
      }

      await campaignsService.send(payload);
      alert("Campanha criada com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      alert("Erro ao criar campanha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container">

      {/* HEADER DA PÁGINA */}
      <div className="page-header">
        <h1>Nova Campanha de Mensagens</h1>
        <p>Crie e envie mensagens personalizadas via WhatsApp</p>
      </div>

      {/* GRID PRINCIPAL */}
      <form className="campaign-grid" onSubmit={handleSubmit}>

        {/* COLUNA ESQUERDA */}
        <div className="campaign-left">

          {/* CARD 1 */}
          <div className="card">
            <div className="card-header">
              <MessageSquare size={18} />
              <div>
                <h2>Informações da Campanha</h2>
                <span>Detalhes sobre o evento que será divulgado</span>
              </div>
            </div>

            <div className="card-content">
              <label>Nome do Evento *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Congresso Nacional de Medicina 2025"
                required
              />

              <label>Mensagem *</label>
              <textarea
                name="message_body"
                value={formData.message_body}
                onChange={handleChange}
                placeholder="Digite a mensagem que será enviada via WhatsApp..."
                rows={6}
                required
              />

              <div className="helper-text">
                Use quebras de linha para melhor formatação
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="card">
            <div className="card-header">
              <Filter size={18} />
              <div>
                <h2>Segmentação de Destinatários</h2>
                <span>
                  Selecione regiões e áreas acadêmicas para segmentar o envio
                </span>
              </div>
            </div>

            <div className="card-content">
              <strong>Regiões do Brasil</strong>

              <div className="region-grid">
                <div className="region-item">Sudeste <span>7.500 contatos</span></div>
                <div className="region-item">Sul <span>3.200 contatos</span></div>
                <div className="region-item">Nordeste <span>2.147 contatos</span></div>
                <div className="region-item">Centro-Oeste <span>1.800 contatos</span></div>
                <div className="region-item">Norte <span>1.200 contatos</span></div>
              </div>

              <strong>Áreas Acadêmicas</strong>
              <input placeholder="Digite para buscar área acadêmica..." />
            </div>
          </div>

          {/* CARD 3 */}
          <div className="card">
            <div className="card-header">
              <Calendar size={18} />
              <div>
                <h2>Agendamento (Opcional)</h2>
                <span>Agende o envio para uma data e hora específica</span>
              </div>
            </div>

            <div className="card-content">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={scheduleEnabled}
                  onChange={(e) => setScheduleEnabled(e.target.checked)}
                />
                Agendar envio para depois
              </label>

              {scheduleEnabled && (
                <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label>Data</label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label>Hora</label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* COLUNA DIREITA */}
        <div className="campaign-right">
          <div className="card sticky">
            <h2>Resumo do Envio</h2>

            <div className="summary-box">
              <span>Total de Destinatários</span>
              <strong>Todos os contatos</strong>
            </div>

            <ul className="summary-list">
              <li style={{ opacity: formData.name ? 1 : 0.5 }}>
                {formData.name ? '✓' : '○'} Nome do evento definido
              </li>
              <li style={{ opacity: formData.message_body ? 1 : 0.5 }}>
                {formData.message_body ? '✓' : '○'} Mensagem escrita
              </li>
              <li style={{ opacity: scheduleEnabled ? 1 : 0.5 }}>
                {scheduleEnabled ? '✓' : '○'} {scheduleEnabled ? 'Agendado' : 'Envio imediato'}
              </li>
            </ul>

            <div className="summary-footer">
              <button type="submit" disabled={!isFormValid || loading}>
                {loading ? "Enviando..." : "Revisar e Enviar"}
              </button>
              <small>
                {isFormValid ? "Pronto para enviar" : "Preencha todos os campos obrigatórios"}
              </small>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
