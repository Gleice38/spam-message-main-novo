import "./NewContact.css";
import { Phone, MapPin, GraduationCap, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NewContact() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // depois entra integração com backend
    console.log("Contato cadastrado");
    navigate("/contacts");
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
            <input placeholder="Ex: Dr. João Silva" required />
          </div>

          {/* Linha 2 */}
          <div className="form-row">
            <div className="form-group">
              <label>Telefone / WhatsApp *</label>
              <div className="input-icon">
                <Phone size={16} />
                <input placeholder="(11) 98765-4321" required />
              </div>
            </div>

            <div className="form-group">
              <label>Estado *</label>
              <div className="input-icon">
                <MapPin size={16} />
                <select required>
                  <option value="">Selecione o Estado</option>
                  <option value="SP">SP</option>
                  <option value="RJ">RJ</option>
                  <option value="MG">MG</option>
                </select>
              </div>
            </div>
          </div>

          {/* Linha 3 */}
          <div className="form-row">
            <div className="form-group">
              <label>Cidade *</label>
              <select required>
                <option value="">Selecione a Cidade</option>
              </select>
            </div>

            <div className="form-group">
              <label>Campus Universitário *</label>
              <div className="input-icon">
                <GraduationCap size={16} />
                <input placeholder="Ex: USP - Campus Capital" required />
              </div>
            </div>
          </div>

          {/* Faculdade */}
          <div className="form-group">
            <label>Faculdade / Curso *</label>
            <div className="input-icon">
              <Building2 size={16} />
              <input placeholder="Ex: Faculdade de Medicina" required />
            </div>
          </div>

          {/* Ações */}
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Cadastrar Contato
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
