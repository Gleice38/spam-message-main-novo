import "./NewCampaign.css";
import { MessageSquare, Filter, Calendar, History, Paperclip } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { campaignsService } from "../../services/campaigns/campaigns.service";
import { contactsService } from "../../services/contacts/contacts.service";
import { REGIONS, CAMPUSES, ACADEMIC_AREAS } from "../../constants/data";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EmojiPicker from 'emoji-picker-react';

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
  // Pega data e hora atuais formatadas para os inputs
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  const defaultDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const defaultTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState(defaultDate);
  const [scheduleTime, setScheduleTime] = useState(defaultTime);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedAcademicAreas, setSelectedAcademicAreas] = useState([]);
  const [areaSearch, setAreaSearch] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaBase64, setMediaBase64] = useState("");
  const [mediaFilename, setMediaFilename] = useState("");
  const [mediaMime, setMediaMime] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const allowedImageExtensions = ["jpg", "jpeg", "png", "webp", "gif"];
  const allowedDocumentExtensions = [
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "txt",
    "csv",
    "rtf",
  ];
  const extensionMimeMap = {
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    txt: "text/plain",
    csv: "text/csv",
    rtf: "application/rtf",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
  };
  const acceptMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
    "text/csv",
    "application/rtf",
    "text/rtf",
  ].join(",");

  const getFileExtension = (name) => {
    if (!name || !name.includes(".")) return "";
    return name.split(".").pop().toLowerCase();
  };

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
      const extension = getFileExtension(file.name);
      const mime = file.type || extensionMimeMap[extension] || "";
      const isImage = mime.startsWith("image/") || allowedImageExtensions.includes(extension);
      const isDocument = allowedDocumentExtensions.includes(extension) || !!extensionMimeMap[extension];

      if (!isImage && !isDocument) {
        alert("Tipo de arquivo não permitido. Envie imagem ou documento suportado.");
        setMediaFile(null);
        setMediaBase64("");
        setMediaFilename("");
        setMediaMime("");
        return;
      }

      const fileForRead = !file.type && mime ? file.slice(0, file.size, mime) : file;
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result?.toString() || "";
        if (!result.startsWith("data:")) {
          alert("Falha ao gerar base64 do arquivo.");
          return;
        }
        setMediaFile(file);
        setMediaBase64(result);
        setMediaFilename(file.name);
        setMediaMime(mime);
      };
      reader.onerror = () => {
        alert("Erro ao ler o arquivo.");
      };
      reader.readAsDataURL(fileForRead);
    } catch (err) {
      alert("Erro ao processar o arquivo");
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
        // Monta string local e converte para UTC ISO
        const localDateTime = new Date(`${scheduleDate}T${scheduleTime}:00`);
        const now = new Date();
        if (localDateTime <= now) {
          alert("A data e hora de agendamento devem ser futuras.");
          setLoading(false);
          return;
        }
        payload.scheduled_at = localDateTime.toISOString();
      }


      // Enviar regiões e áreas acadêmicas selecionadas no filtro (formato anterior)
      payload.filters_snapshot = {
        ...payload.filters_snapshot,
        regions: selectedRegions,
        academic_areas: selectedAcademicAreas
      };

      // Incluir mídia em base64 se existir
      if (mediaBase64) {
        payload.media_base64 = mediaBase64;
        payload.media_filename = mediaFilename;
        payload.media_mime = mediaMime;
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

  // Adiciona emoji ao texto
  const handleEmojiClick = (emojiData) => {
    setFormData(prev => ({
      ...prev,
      message_body: prev.message_body + emojiData.emoji
    }));
  };

  return (
    <div className="page-container">
      {/* HEADER DA PÁGINA */}
      <div className="page-header">
        <div>
          <h1>Nova Campanha de Mensagens</h1>
          <p>Crie e envie mensagens personalizadas via WhatsApp</p>
        </div>
      </div>

      {/* GRID PRINCIPAL */}
      <form className="campaign-grid" onSubmit={handleSubmit}>

        {/* COLUNA ESQUERDA */}
        <div className="campaign-left">

        {/* CARD 1 */}
<div className="card">
  <div className="card-header" style={{ alignItems: 'center', gap: 8}}>
    <MessageSquare size={22}/>
    <div className="card-header-title" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.13rem', color: '#000000', marginLeft: 0 }}>Informações da Campanha</h2>
      <span style={{ margin: 0, color: '#183153', fontSize: 13, marginTop: 4, marginLeft:0, display: 'block', textAlign: 'left' }}>Detalhes sobre o evento que será divulgado</span>
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

    {/* Wrapper do editor */}
    <div className="quill-wrapper">
      <ReactQuill
        value={formData.message_body}
        onChange={value =>
          setFormData(prev => ({ ...prev, message_body: value }))
        }
        modules={{
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"]
          ]
        }}
        formats={["bold", "italic", "underline", "list", "bullet"]}
        // altura padrão do ReactQuill
        placeholder="Use quebras de linha para melhor formatação"
      />

      {/* Linha: emoji + contador */}
      <div className="emoji-char-row">
        <button
          type="button"
          className="emoji-button-inline"
          onClick={() => setShowEmojiPicker(v => !v)}
          aria-label="Adicionar emoji"
        >
          😊
        </button>
        <span className="char-counter">
          {formData.message_body.replace(/<[^>]+>/g, "").length} caracteres
        </span>
        {showEmojiPicker && (
          <div className="emoji-picker-container-inline">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              height={350}
              width={300}
            />
          </div>
        )}
      </div>
    </div>

    {/* helper-text removido conforme solicitado */}
  </div>

</div>


          {/* CARD 2 */}
          <div className="card">
            <div className="card-header" style={{ alignItems: 'center', gap: 8 }}>
              <Filter size={22} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.13rem', color: '#080808', marginLeft: 0 }}>Segmentação de Destinatários</h2>
                <span style={{ margin: 0, color: '#0d0d0e', fontSize: 13, marginTop: 4, marginLeft:0, display: 'block', textAlign: 'left' }}>
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
            <div className="card-header" style={{ alignItems: 'center', gap: 8 }}>
              <Calendar size={22} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.13rem', color: '#080808', marginLeft: 0 }}>Agendamento (Opcional)</h2>
                <span style={{ margin: 0, color: '#0a0a0a', fontSize: 13, marginTop: 4, marginLeft:0, display: 'block', textAlign: 'left' }}>Agende o envio para uma data e hora específica</span>
              </div>
            </div>

            <div className="card-content">
              <label className="checkbox" style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={scheduleEnabled}
                  onChange={(e) => setScheduleEnabled(e.target.checked)}
                  style={{ marginRight: 8 }}
                />
                <span className="schedule-label">Agendar envio para depois</span>
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
            <div className="card-header" style={{ alignItems: 'center', gap: 10 }}>
              <span className="check-icon" style={{ fontSize: 22, color: '#2193b0', background: 'transparent', borderRadius: '8px', padding: '6px 10px', display: 'flex', alignItems: 'center' }}>
                <Paperclip size={22} />
              </span>
              <div className="card-header-title" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.13rem', color: '#050505', marginLeft: 0 }}>Anexar Imagem ou PDF</h2>
                <span style={{ margin: 0, color: '#0d0d0e', fontSize: 13, marginTop: 4, marginLeft:0, display: 'block', textAlign: 'left' }}>Opcional: envie uma imagem ou PDF junto com a campanha</span>
              </div>
            </div>
            <div className="card-content">
              <input type="file" accept={acceptMimeTypes} onChange={handleFileChange} />
              {uploading && <span>Processando arquivo...</span>}
              {mediaBase64 && (
                <div style={{ marginTop: 8 }}>
                  <span>Arquivo pronto: {mediaFile?.name}</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* COLUNA DIREITA */}
        <div className="campaign-right">
          <div className="card sticky">
            <div className="card-header" style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span className="check-icon" style={{ fontSize: 28, color: '#2193b0', background: 'transparent', borderRadius: '8px', padding: '6px 10px', display: 'flex', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="url(#gradResumoEnvio)"/>
                  <g>
                    <rect x="5" y="7" width="14" height="10" rx="2" stroke="#fff" strokeWidth="1.5" fill="none"/>
                    <rect x="7.5" y="9.5" width="9" height="1.2" rx="0.6" fill="#fff"/>
                    <rect x="7.5" y="12" width="6" height="1.2" rx="0.6" fill="#fff"/>
                  </g>
                  <defs>
                    <linearGradient id="gradResumoEnvio" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#2193b0"/>
                      <stop offset="1" stop-color="#15608a"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <h2 style={{ fontWeight: 700, fontSize: '1.18rem',marlor: '#030303', margin: 0, marginLeft: 0, display: 'inline-block', verticalAlign: 'middle' }}>Resumo do Envio</h2>
            </div>
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
