import "./Contacts.css";
import { Plus, Search, Pencil, Trash2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { contactsService } from "../../services/contacts/contacts.service";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { SkeletonTable } from "../../components/Skeleton/SkeletonTable";
import { toast } from "../../hooks/useToast";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getRoleBadgeClass = (role) => {
    const roleMap = {
      'STUDENT': 'badge-student',
      'PROFESSOR': 'badge-professor',
      'COORDINATOR': 'badge-coordinator',
      'VISITOR': 'badge-visitor'
    };
    return roleMap[role] || 'badge-visitor';
  };

  async function loadContacts() {
    try {
      const data = await contactsService.getAll();
      setContacts(data);
      setFilteredContacts(data);
    } catch (error) {
      toast.error("Erro ao carregar contatos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(term) {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredContacts(contacts);
      return;
    }

    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(term.toLowerCase()) ||
      contact.phone.includes(term) ||
      (contact.email && contact.email.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredContacts(filtered);
  }

  async function handleDelete(id) {
    const confirm = window.confirm("Deseja realmente excluir este contato?");
    if (!confirm) return;

    try {
      await contactsService.remove(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      setFilteredContacts((prev) => prev.filter((c) => c.id !== id));
      toast.success("Contato excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir contato. Tente novamente.");
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  // Renderização removida daqui - movida para dentro do JSX

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
            <span>
              {searchTerm
                ? `${filteredContacts.length} de ${contacts.length} contatos`
                : `${contacts.length} contatos no banco de dados`}
            </span>
          </div>

          <div className="search-box">
            <Search size={16} />
            <input
              placeholder="Buscar contatos..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        {loading ? (
          <SkeletonTable rows={5} columns={6} />
        ) : filteredContacts.length === 0 ? (
          <EmptyState
            icon={Users}
            title={searchTerm ? "Nenhum contato encontrado" : "Nenhum contato cadastrado"}
            description={
              searchTerm
                ? `Nenhum resultado para "${searchTerm}". Tente outro termo de busca.`
                : "Comece adicionando seu primeiro contato no sistema."
            }
            action={
              !searchTerm && (
                <button className="btn-primary" onClick={() => navigate("/contacts/new")}>
                  <Plus size={16} />
                  Adicionar Primeiro Contato
                </button>
              )
            }
          />
        ) : (
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
              {filteredContacts.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>
                    <span className={`state-badge ${getRoleBadgeClass(c.role)}`}>{c.role}</span>
                  </td>
                  <td>{c.campus_id}</td>
                  <td>{c.academic_area_id}</td>
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
        )}
      </div>
    </div>
  );
}
