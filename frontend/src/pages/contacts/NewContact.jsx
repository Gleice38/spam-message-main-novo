// NewContact.jsx
import "./NewContact.css";
import { Phone, Mail, User, GraduationCap, MapPin, BookOpen, ArrowLeft } from "lucide-react";
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

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const roleToSend = formData.role === 'RESEARCHER' ? 'PROFESSOR' : formData.role;
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
      navigate("/contacts");
    } catch (error) {
      alert("Erro ao cadastrar contato.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="contacts-full-page">
      <div className="contacts-content-wrapper">
        
        <header className="page-header">
          <div className="header-text-group">
            <button className="back-button" onClick={() => navigate("/contacts")} style={{marginRight: '15px'}}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 style={{color: 'white', margin: 0}}>Novo Contato</h1>
              <p style={{color: '#dbeafe', margin: 0}}>Preencha os dados para o banco de dados</p>
            </div>
          </div>
        </header>

        <div className="main-card">
          <form onSubmit={handleSubmit}>
            <div className="form-layout">
              
              <div className="input-group full-width">
                <label>Nome Completo *</label>
                <div className="inner-input">
                  <User size={18} />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex: Dr. João Silva"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Telefone / WhatsApp *</label>
                <div className="inner-input">
                  <Phone size={18} />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(11) 98765-4321"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Email (opcional)</label>
                <div className="inner-input">
                  <Mail size={18} />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="exemplo@email.com"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Perfil *</label>
                <div className="inner-input">
                  <GraduationCap size={18} />
                  <select name="role" value={formData.role} onChange={handleChange} required>
                    <option value="STUDENT">Estudante</option>
                    <option value="PROFESSOR">Professor</option>
                    <option value="RESEARCHER">Pesquisador</option>
                    <option value="COORDINATOR">Coordenador</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label>Região (Filtro)</label>
                <div className="inner-input">
                  <MapPin size={18} />
                  <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                    <option value="">Todas as Regiões</option>
                    {REGIONS.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label>Campus / Universidade *</label>
                <div className="inner-input">
                  <MapPin size={18} />
                  <select name="campus_id" value={formData.campus_id} onChange={handleChange} required>
                    <option value="">Selecione um Campus</option>
                    {filteredCampuses.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.state})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label>Área Acadêmica *</label>
                <div className="inner-input">
                  <BookOpen size={18} />
                  <select name="academic_area_id" value={formData.academic_area_id} onChange={handleChange} required>
                    <option value="">Selecione uma Área</option>
                    {ACADEMIC_AREAS.map(a => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            <div className="form-footer">
              <button type="submit" className="btn-confirm" disabled={loading} style={{padding: '12px 30px'}}>
                {loading ? "Cadastrando..." : "Cadastrar Contato"}
              </button>
              <button type="button" className="btn-cancel" onClick={() => navigate("/contacts")} style={{padding: '12px 30px'}}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}