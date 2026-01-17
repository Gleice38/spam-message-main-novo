import "./NewContact.css";
import { Phone, MapPin, GraduationCap, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { contactsService } from "@/services/contacts/contacts.service";

export default function NewContact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    city: '',
    campus: '',
    course: ''
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await contactsService.create(formData);
      console.log("Contato cadastrado");
      navigate("/contacts");
    } catch (error) {
      console.error("Erro ao cadastrar contato:", error);
      // TODO: mostrar erro ao usuário
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="contacts-page">
      {/* HEADER */}
      <div className="contacts-header">
        <div>
          <h1>Novo Contato</h1>
          <p>Preencha os dados para adicionar o contato ao banco de dados</p>
        </div>
      </div>

      {/* CARD */}
      <div className="contacts-card">
        <form className="contact-form" onSubmit={handleSubmit}>
          
          {/* Nome */}
          <div className="form-group">
            <label>Nome Completo *</label>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Ex: Dr. João Silva" required />
          </div>

          {/* Linha 2 */}
          <div className="form-row">
            <div className="form-group">
              <label>Telefone / WhatsApp *</label>
              <div className="input-icon">
                <Phone size={16} />
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="(11) 98765-4321" required />
              </div>
            </div>

            <div className="form-group">
              <label>Estado *</label>
              <div className="input-icon">
                <MapPin size={16} />
                <select name="state" value={formData.state} onChange={handleChange} required>
                  <option value="">Selecione o Estado</option>
                  <option value="AC">AC - Acre</option>
                  <option value="AL">AL - Alagoas</option>
                  <option value="AP">AP - Amapá</option>
                  <option value="AM">AM - Amazonas</option>
                  <option value="BA">BA - Bahia</option>
                  <option value="CE">CE - Ceará</option>
                  <option value="DF">DF - Distrito Federal</option>
                  <option value="ES">ES - Espírito Santo</option>
                  <option value="GO">GO - Goiás</option>
                  <option value="MA">MA - Maranhão</option>
                  <option value="MT">MT - Mato Grosso</option>
                  <option value="MS">MS - Mato Grosso do Sul</option>
                  <option value="MG">MG - Minas Gerais</option>
                  <option value="PA">PA - Pará</option>
                  <option value="PB">PB - Paraíba</option>
                  <option value="PR">PR - Paraná</option>
                  <option value="PE">PE - Pernambuco</option>
                  <option value="PI">PI - Piauí</option>
                  <option value="RJ">RJ - Rio de Janeiro</option>
                  <option value="RN">RN - Rio Grande do Norte</option>
                  <option value="RS">RS - Rio Grande do Sul</option>
                  <option value="RO">RO - Rondônia</option>
                  <option value="RR">RR - Roraima</option>
                  <option value="SC">SC - Santa Catarina</option>
                  <option value="SP">SP - São Paulo</option>
                  <option value="SE">SE - Sergipe</option>
                  <option value="TO">TO - Tocantins</option>
                </select>
              </div>
            </div>
          </div>

          {/* Linha 3 */}
          <div className="form-row">
            <div className="form-group">
              <label>Cidade *</label>
              <div className="input-icon">
                <MapPin size={16} />
                <input name="city" value={formData.city} onChange={handleChange} placeholder="Ex: São Paulo" required />
              </div>
            </div>

            <div className="form-group">
              <label>Campus Universitário *</label>
              <div className="input-icon">
                <GraduationCap size={16} />
                <input name="campus" value={formData.campus} onChange={handleChange} placeholder="Ex: USP - Campus Capital" required />
              </div>
            </div>
          </div>

          {/* Faculdade */}
          <div className="form-group">
            <label>Faculdade / Curso *</label>
            <div className="input-icon">
              <Building2 size={16} />
              <input name="course" value={formData.course} onChange={handleChange} placeholder="Ex: Faculdade de Medicina" required />
            </div>
          </div>

          {/* Ações */}
          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar Contato'}
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/contacts")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
