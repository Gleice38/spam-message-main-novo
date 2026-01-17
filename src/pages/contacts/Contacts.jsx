import "./Contacts.css";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { contactsService } from "../../services/contacts/contacts.service";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function loadContacts() {
    try {
      const data = await contactsService.getAll();
      console.log("Contatos carregados:", data); // DEBUG: ver estrutura dos dados
      setContacts(data);
    } catch (error) {
      console.error("Erro ao carregar contatos", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirm = window.confirm("Deseja realmente excluir este contato?");
    if (!confirm) return;

    try {
      await contactsService.remove(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Erro ao excluir contato", error);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  if (loading) return <p>Carregando contatos...</p>;

  return (
    <div className="contacts-page">
      {/* HEADER */}
      <div className="contacts-header">
        <div>
          <h1>Gerenciar Contatos</h1>
          <p>Cadastre e organize contatos do banco de dados</p>
        </div>

        <button
          className="btn-primary"
          onClick={() => navigate("/contacts/new")}
        >
          <Plus size={16} />
          Novo Contato
        </button>
      </div>

      {/* CARD */}
      <div className="contacts-card">
        <div className="contacts-card-header">
          <div>
            <h2>Contatos cadastrados</h2>
            <span>{contacts.length} contatos no banco de dados</span>
          </div>

          <div className="search-box">
            <Search size={16} />
            <input placeholder="Buscar contatos..." />
          </div>
        </div>

        {/* TABLE */}
        <table className="contacts-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Perfil</th>
              <th>Campus</th>
              <th>Faculdade</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>
                  <span className="state-badge">{c.role}</span>
                </td>
                <td>{c.campus}</td>
                <td>{c.course}</td>
                <td className="actions">
                  <button
                    className="icon-btn edit"
                    onClick={() => navigate(`/contacts/edit/${c.id}`)}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="icon-btn delete"
                    onClick={() => handleDelete(c.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
