import "./NewCampaign.css";
import { MessageSquare, Filter, Calendar, History } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { campaignsService } from "../../services/campaigns/campaigns.service";
import { contactsService } from "../../services/contacts/contacts.service";
import { mediaService } from '../../services/media.service';
import { REGIONS, CAMPUSES, ACADEMIC_AREAS } from "../../constants/data";
import softexlogo from '../../public/softex-logo.png';
export default function NewCampaign() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contactsCount, setContactsCount] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    message_body: "",
    scheduled_at: null,
  });
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedAcademicAreas, setSelectedAcademicAreas] = useState([]);
  const [areaSearch, setAreaSearch] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const isFormValid = formData.name.trim() && formData.message_body.trim();

  // Carrega todos os contatos uma vez
  useEffect(() => {
    async function loadContacts() {
      try {
        const allContacts = await contactsService.getAll();
        setContacts(allContacts);
      } catch (error) {
        console.error("Erro ao carregar contatos", error);
      }
    }
    loadContacts();
  }, []);

  // Atualiza a contagem de contatos segmentados sempre que filtros mudam
  useEffect(() => {
    const counts = {};
    REGIONS.forEach(r => counts[r.name] = 0);
    // Filtra contatos por região e área acadêmica
    const filteredContacts = contacts.filter(c => {
      const campus = CAMPUSES.find(camp => camp.id === c.campus_id);
      if (!campus) return false;
      const region = REGIONS.find(r => r.states.includes(campus.state));
      if (!region) return false;
      // Se regiões selecionadas, filtra
      if (selectedRegions.length && !selectedRegions.includes(region.name)) return false;
      // Se áreas acadêmicas selecionadas, filtra
      if (selectedAcademicAreas.length && !selectedAcademicAreas.includes(c.academic_area_id)) return false;
      return true;
    });
    // Conta por região
    filteredContacts.forEach(c => {
      const campus = CAMPUSES.find(camp => camp.id === c.campus_id);
      if (campus) {
        const region = REGIONS.find(r => r.states.includes(campus.state));
        if (region) {
          counts[region.name] = (counts[region.name] || 0) + 1;
        }
      }
    });
    setContactsCount(counts);
  }, [contacts, selectedRegions, selectedAcademicAreas]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function toggleRegion(regionName) {
    setSelectedRegions(prev =>
      prev.includes(regionName)
        ? prev.filter(r => r !== regionName)
        : [...prev, regionName]
    );
  }

  function toggleAcademicArea(areaId) {
    setSelectedAcademicAreas(prev =>
      prev.includes(areaId)
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await mediaService.upload(file);
      setMediaUrl(result.url);
      setMediaFile(file);
    } catch (err) {
      alert("Erro ao fazer upload do arquivo");
    } finally {
      setUploading(false);
    }
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


      // Enviar regiões e áreas acadêmicas selecionadas no filtro (formato anterior)
      payload.filters_snapshot = {
        ...payload.filters_snapshot,
        regions: selectedRegions,
        academic_areas: selectedAcademicAreas
      };

      // Incluir URL da mídia se existir
      if (mediaUrl) {
        payload.media_url = mediaUrl;
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
                  <button
                    type="button"
                    key={region.id}
                    className={`region-item${selectedRegions.includes(region.name) ? " selected" : ""}`}
                    onClick={() => toggleRegion(region.name)}
                    style={{ cursor: "pointer" }}
                  >
                    {region.name} <span>{contactsCount[region.name] || 0} contatos</span>
                  </button>
                ))}
              </div>

              <strong>Áreas Acadêmicas</strong>
              <input
                placeholder="Digite para buscar área acadêmica..."
                value={areaSearch}
                onChange={e => setAreaSearch(e.target.value)}
                style={{ marginBottom: 8 }}
              />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {ACADEMIC_AREAS.filter(a =>
                  a.name.toLowerCase().includes(areaSearch.toLowerCase())
                ).map(area => (
                  <button
                    type="button"
                    key={area.id}
                    className={`region-item${selectedAcademicAreas.includes(area.id) ? " selected" : ""}`}
                    onClick={() => toggleAcademicArea(area.id)}
                    style={{ minWidth: 0, padding: "8px 12px", fontSize: 13 }}
                  >
                    {area.name}
                  </button>
                ))}
              </div>
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

          {/* CARD 4 - UPLOAD DE ARQUIVO */}
          <div className="card">
            <div className="card-header">
              <span role="img" aria-label="Arquivo">📎</span>
              <div>
                <h2>Anexar Imagem ou PDF</h2>
                <span>Opcional: envie uma imagem ou PDF junto com a campanha</span>
              </div>
            </div>
            <div className="card-content">
              <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
              {uploading && <span>Enviando arquivo...</span>}
              {mediaUrl && (
                <div style={{ marginTop: 8 }}>
                  <span>Arquivo enviado: </span>
                  <a href={mediaUrl} target="_blank" rel="noopener noreferrer">{mediaFile?.name}</a>
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
                <span className="check-value">
                  {scheduleEnabled ? 'Agendado' : 'Imediato'}
                  <span className="check-status badge-success">✔️</span>
                </span>
              </div>
              <div className="check-item">
                <span className="check-icon">👥</span>
                <span className="check-label">Total de contatos segmentados:</span>
                <span className="check-value">
                  {Object.values(contactsCount).reduce((a, b) => a + b, 0)}
                  <span className="check-status badge-success">✔️</span>
                </span>
              </div>
              <div className="check-item">
                <span className="check-icon">📍</span>
                <span className="check-label">Regiões selecionadas:</span>
                <span className="check-value">
                  {selectedRegions.length ? selectedRegions.join(', ') : 'Nenhuma'}
                  <span className="check-status badge-success">✔️</span>
                </span>
              </div>
              <div className="check-item">
                <span className="check-icon">🎓</span>
                <span className="check-label">Áreas acadêmicas selecionadas:</span>
                <span className="check-value">
                  {selectedAcademicAreas.length ?
                    ACADEMIC_AREAS.filter(a => selectedAcademicAreas.includes(a.id)).map(a => a.name).join(', ')
                    : 'Nenhuma'}
                  <span className="check-status badge-success">✔️</span>
                </span>
              </div>
              <div className="check-item">
                <span className="check-icon">📨</span>
                <span className="check-label">Mensagem:</span>
                <span className="check-value">
                  {formData.message_body ? 'Definida' : 'Pendente'}
                  <span className="check-status badge-success">✔️</span>
                </span>
              </div>
            </div>
            <div className="summary-footer">
              {scheduleEnabled ? (
                <button
                  type="submit"
                  disabled={!isFormValid || loading || !scheduleDate || !scheduleTime}
                >
                  {loading ? "Agendando..." : "Agendar Campanha"}
                </button>
              ) : (
                <button type="submit" disabled={!isFormValid || loading}>
                  {loading ? "Enviando..." : "Enviar Agora"}
                </button>
              )}
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