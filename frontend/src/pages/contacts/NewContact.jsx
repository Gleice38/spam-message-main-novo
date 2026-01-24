import "./NewContact.css";
import { Phone, Mail, User, GraduationCap, MapPin, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { contactsService } from "../../services/contacts/contacts.service";
import { REGIONS, ACADEMIC_AREAS, CAMPUSES } from "../../constants/data";

export default function NewContact() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "STUDENT",
    campus_id: "",
    academic_area_id: "",
  });

  const filteredCampuses = useMemo(() => {
    if (!selectedRegion) return CAMPUSES;
    const region = REGIONS.find(r => r.id === selectedRegion);
    if (!region) return CAMPUSES;
    return CAMPUSES.filter(c => region.states.includes(c.state));
  }, [selectedRegion]);


  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 11;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    if (!validatePhone(formData.phone)) {
      alert("Telefone inválido. Use o formato: (11) 98765-4321");
      return;
    }

    setLoading(true);

    try {
      // Mapeia "RESEARCHER" para "PROFESSOR" se necessário, ou mantém se o backend suportar
      // Assumindo que o backend não suporta RESEARCHER, mapeamos para PROFESSOR
      const roleToSend = formData.role === 'RESEARCHER' ? 'PROFESSOR' : formData.role;


      // Busca campus selecionado para preencher state/city
      const campusObj = CAMPUSES.find(c => String(c.id) === String(formData.campus_id));
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.replace(/\D/g, ''),
        email: formData.email.trim() || null,
        role: roleToSend,
        campus_id: formData.campus_id ? Number(formData.campus_id) : null,
        academic_area_id: formData.academic_area_id ? Number(formData.academic_area_id) : null,
        state: campusObj?.state || null,
        city: campusObj?.city || null,
      };

      await contactsService.create(payload);
      alert("Contato cadastrado com sucesso!");
      navigate("/contacts");
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.detail || "Erro ao cadastrar contato. Tente novamente.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="contacts-page">
      <div className="contacts-header">
        <div>
          <h1>Novo Contato</h1>
          <p>Preencha os dados para adicionar o contato ao banco de dados</p>
        </div>
      </div>

      <div className="contacts-card">
        <form className="contact-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Nome Completo *</label>
            <div className="input-icon">
              <User size={16} />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Dr. João Silva"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Telefone / WhatsApp *</label>
              <div className="input-icon">
                <Phone size={16} />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(11) 98765-4321"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email (opcional)</label>
              <div className="input-icon">
                <Mail size={16} />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="exemplo@email.com"
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Perfil *</label>
              <div className="input-icon">
                <GraduationCap size={16} />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="STUDENT">Estudante</option>
                  <option value="PROFESSOR">Professor</option>
                  <option value="RESEARCHER">Pesquisador</option>
                  <option value="COORDINATOR">Coordenador</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Região (Filtro)</label>
              <div className="input-icon">
                <MapPin size={16} />
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="">Todas as Regiões</option>
                  {REGIONS.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Campus / Universidade *</label>
              <div className="input-icon">
                <MapPin size={16} />
                <select
                  name="campus_id"
                  value={formData.campus_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione um Campus</option>
                  {filteredCampuses.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.state})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Área Acadêmica *</label>
              <div className="input-icon">
                <BookOpen size={16} />
                <select
                  name="academic_area_id"
                  value={formData.academic_area_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma Área</option>
                  {ACADEMIC_AREAS.map(a => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar Contato"}
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/contacts")}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
