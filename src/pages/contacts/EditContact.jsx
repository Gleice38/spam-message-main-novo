import "./NewContact.css";
import { Phone, Mail, User, GraduationCap } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { contactsService } from "../../services/contacts/contacts.service";

export default function EditContact() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "STUDENT",
    campus_id: null,
    academic_area_id: null,
  });

  useEffect(() => {
    loadContact();
  }, [id]);

  async function loadContact() {
    try {
      const contacts = await contactsService.getAll();
      const contact = contacts.find(c => c.id === Number(id));

      if (!contact) {
        alert("Contato não encontrado");
        navigate("/contacts");
        return;
      }

      setFormData({
        name: contact.name || "",
        phone: contact.phone || "",
        email: contact.email || "",
        role: contact.role || "STUDENT",
        campus_id: contact.campus_id || null,
        academic_area_id: contact.academic_area_id || null,
      });
    } catch (error) {
      alert("Erro ao carregar contato");
      navigate("/contacts");
    } finally {
      setLoadingData(false);
    }
  }

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
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.replace(/\D/g, ''),
        email: formData.email.trim() || null,
        role: formData.role,
        campus_id: formData.campus_id ? Number(formData.campus_id) : null,
        academic_area_id: formData.academic_area_id ? Number(formData.academic_area_id) : null,
      };

      await contactsService.update(id, payload);
      alert("Contato atualizado com sucesso!");
      navigate("/contacts");
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Erro ao atualizar contato. Tente novamente.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  if (loadingData) {
    return (
      <div className="contacts-page">
        <div className="contacts-header">
          <h1>Carregando contato...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="contacts-page">
      {/* HEADER */}
      <div className="contacts-header">
        <div>
          <h1>Editar Contato</h1>
          <p>Atualize os dados do contato</p>
        </div>
      </div>

      {/* CARD */}
      <div className="contacts-card">
        <form className="contact-form" onSubmit={handleSubmit}>

          {/* Nome */}
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

          {/* Linha 2 */}
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
              <small style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem', display: 'block' }}>
                Apenas números ou com formatação
              </small>
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

          {/* Linha 3 */}
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
              <label>ID do Campus (opcional)</label>
              <input
                name="campus_id"
                type="number"
                value={formData.campus_id || ""}
                onChange={handleChange}
                placeholder="Ex: 1"
              />
            </div>
          </div>

          {/* Área Acadêmica */}
          <div className="form-group">
            <label>ID da Área Acadêmica (opcional)</label>
            <input
              name="academic_area_id"
              type="number"
              value={formData.academic_area_id || ""}
              onChange={handleChange}
              placeholder="Ex: 5"
            />
          </div>

          {/* Ações */}
          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Alterações"}
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
