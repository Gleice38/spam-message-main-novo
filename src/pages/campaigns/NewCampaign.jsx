import "./NewCampaign.css";
import { MessageSquare, Filter, Calendar, History } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { campaignsService } from "../../services/campaigns/campaigns.service";
import { contactsService } from "../../services/contacts/contacts.service";
import { REGIONS, CAMPUSES } from "../../constants/data";
import softexlogo from '../../public/softex-logo.png';
export default function NewCampaign() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [contactsCount, setContactsCount] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    message_body: "",
    scheduled_at: null,
  });
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const isFormValid = formData.name.trim() && formData.message_body.trim();

  useEffect(() => {
    async function loadCounts() {
      try {
        const contacts = await contactsService.getAll();
        const counts = {};
        
        // Initialize counts
        REGIONS.forEach(r => counts[r.name] = 0);

        contacts.forEach(c => {
          const campus = CAMPUSES.find(camp => camp.id === c.campus_id);
          if (campus) {
            const region = REGIONS.find(r => r.states.includes(campus.state));
            if (region) {
              counts[region.name] = (counts[region.name] || 0) + 1;
            }
          }
        });
        setContactsCount(counts);
      } catch (error) {
        console.error("Erro ao carregar contagem de contatos", error);
      }
    }
    loadCounts();
  }, []);

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
        <div>
          <h1>Nova Campanha de Mensagens</h1>
          <p>Crie e envie mensagens personalizadas via WhatsApp</p>
        </div>
        <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
          <History size={16} />
          Ver Histórico
        </button>
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
                {REGIONS.map(region => (
                  <div key={region.id} className="region-item">
                    {region.name} <span>{contactsCount[region.name] || 0} contatos</span>
                  </div>
                ))}
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
            <h2 style={{ textAlign: 'center', marginBottom: 16 }}>Checklist do Envio</h2>
            <div className="summary-list checklist">
              <div className="check-item">
                <span className="check-icon">📅</span>
                <span className="check-label">Tipo de envio:</span>
                <span className="check-status badge-success">✔️ {scheduleEnabled ? 'Agendado' : 'Imediato'}</span>
              </div>
              <div className="check-item">
                <span className="check-icon">👥</span>
                <span className="check-label">Total de contatos:</span>
                <span className="check-status badge-success">✔️ {Object.values(contactsCount).reduce((a, b) => a + b, 0)}</span>
              </div>
              <div className="check-item">
                <span className="check-icon">📍</span>
                <span className="check-label">Regiões:</span>
                <span className="check-status badge-success">
                  ✔️ {
                    Object.entries(contactsCount)
                      .filter(([region, count]) => count > 0)
                      .map(([region]) => region)
                      .join(', ') || 'Nenhuma'
                  }
                </span>
              </div>
              <div className="check-item">
                <span className="check-icon">📨</span>
                <span className="check-label">Mensagem:</span>
                <span className="check-status badge-success">✔️ {formData.message_body ? 'Definida' : 'Pendente'}</span>
              </div>
            </div>
            <div className="summary-footer">
              <button type="submit" disabled={!isFormValid || loading}>
                {loading ? "Enviando..." : "Enviar Agora"}
              </button>
              <small style={{ textAlign: 'center' }}>
                {isFormValid ? "Tudo pronto para enviar!" : "Preencha todos os campos obrigatórios"}
              </small>
            </div>
          </div>
        </div>

      </form>
      {/* FOOTER */}
            <footer className="dashboard-footer">
              <div className="dashboard-footer__content">
                <img
                  src="/softex-logo.png"
                  alt="Softex"
                  className="dashboard-footer__logo"
                />
                <span>
                  ©2025 Mensagens Cooperativa. Todos os direitos reservados.
                </span>
                  </div>
      </footer>
    </div>
  );
}