import "./Contacts.css";
import { Plus, Search, Pencil, Trash2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { contactsService } from "../../services/contacts/contacts.service";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { SkeletonTable } from "../../components/Skeleton/SkeletonTable";
import { toast } from "../../hooks/useToast";
import {
  ROLES,
  CAMPUSES,
  ACADEMIC_AREAS,
  REGIONS
} from "../../constants/data";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [openRegion, setOpenRegion] = useState(null);

  const navigate = useNavigate();

  /* ===============================
     HELPERS
  =============================== */

  const getRoleBadgeClass = (role) => {
    const roleMap = {
      STUDENT: "badge-student",
      PROFESSOR: "badge-professor",
      COORDINATOR: "badge-coordinator",
      VISITOR: "badge-visitor",
      RESEARCHER: "badge-professor",
    };
    return roleMap[role] || "badge-visitor";
  };

  const getCampusName = (id) => {
    const campus = CAMPUSES.find((c) => c.id === id);
    return campus ? campus.name : id;
  };

  const getAreaName = (id) => {
    const area = ACADEMIC_AREAS.find((a) => a.id === id);
    return area ? area.name : id;
  };

  // Corrigido para usar o array REGIONS corretamente
  const getRegionByState = (state) => {
    const region = REGIONS.find(r => Array.isArray(r.states) && r.states.includes(state));
    return region ? region.name : 'Sem Região';
  };

  /* ===============================
     LOAD
  =============================== */

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

  
   useEffect(() => {
    loadContacts();
  }, []);
 

  /* ===============================
     SEARCH
  =============================== */

  function handleSearch(term) {
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredContacts(contacts);
      return;
    }

    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(term.toLowerCase()) ||
        contact.phone.includes(term) ||
        (contact.email &&
          contact.email.toLowerCase().includes(term.toLowerCase()))
    );

    setFilteredContacts(filtered);
  }

  /* ===============================
     DELETE
  =============================== */

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

  /* ===============================
     ACCORDION
  =============================== */

  function toggleRegion(region) {
    setOpenRegion((prev) => (prev === region ? null : region));
  }

  /* ===============================
     GROUP BY CAMPUS (FRONT-END)
  =============================== */

  const groupedContacts = filteredContacts.reduce((acc, contact) => {
    const campus = CAMPUSES.find(c => c.id === contact.campus_id);
    const campusName = campus ? campus.name : 'Sem Campus';
    if (!acc[campusName]) acc[campusName] = [];
    acc[campusName].push(contact);
    return acc;
  }, {});

  return (
    <div className="contacts-page">
      {/* HEADER */}
      <div className="contacts-header">
        <div>
          <h1>Gerenciar Contatos</h1>
          <p>Cadastre e organize contatos do banco de dados</p>
        </div>

        <button className="btn-primary" onClick={() => navigate("/contacts/new")}>
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

        {/* CONTENT */}
        {loading ? (
          <SkeletonTable rows={5} columns={6} />
        ) : filteredContacts.length === 0 ? (
          <EmptyState
            icon={Users}
            title={
              searchTerm
                ? "Nenhum contato encontrado"
                : "Nenhum contato cadastrado"
            }
            description={
              searchTerm
                ? `Nenhum resultado para "${searchTerm}".`
                : "Comece adicionando seu primeiro contato no sistema."
            }
            action={
              !searchTerm && (
                <button
                  className="btn-primary"
                  onClick={() => navigate("/contacts/new")}
                >
                  <Plus size={16} />
                  Adicionar Primeiro Contato
                </button>
              )
            }
          />
        ) : (
          <div className="contacts-groups">
            {Object.entries(groupedContacts).map(([campusName, items]) => (
              <div key={campusName} className="contacts-group" data-campus={campusName}>
                {/* ACCORDION HEADER */}
                <button
                  className="contacts-group-header"
                  onClick={() => toggleRegion(campusName)}
                >
                  <div className="group-title">
                    <span className="group-location-icon">
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.11 10.61 8.13 11.36a1 1 0 0 0 1.13 0C13.89 21.61 21 16.25 21 11c0-4.97-4.03-9-9-9Zm0 18.54C9.14 18.07 5 14.39 5 11c0-3.87 3.13-7 7-7s7 3.13 7 7c0 3.39-4.14 7.07-7 9.54ZM12 6a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/></svg>
                    </span>
                    <span className="group-uf">{campusName}</span>
                    <span className="group-count">
                      ({items.length} contato{items.length > 1 ? "s" : ""})
                    </span>
                  </div>
                  <span
                    className={`arrow ${
                      openRegion === campusName ? "open" : ""
                    }`}
                  />
                </button>

                {/* TABLE */}
                {openRegion === campusName && (
                  <table className="contacts-table">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Perfil</th>
                        <th>Campus</th>
                        <th>Área Acadêmica</th>
                        <th>Ações</th>
                      </tr>
                    </thead>

                    <tbody>
                      {items.map((c) => (
                        <tr key={c.id}>
                          <td>{c.name}</td>
                          <td>{c.phone}</td>
                          <td>
                            <span
                              className={`state-badge ${getRoleBadgeClass(
                                c.role
                              )}`}
                            >
                              {ROLES[c.role] || c.role}
                            </span>
                          </td>
                          <td>{getCampusName(c.campus_id)}</td>
                          <td>{getAreaName(c.academic_area_id)}</td>
                          <td className="actions">
                            <button
                              className="icon-btn edit"
                              onClick={() =>
                                navigate(`/contacts/edit/${c.id}`)
                              }
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
            ))}
          </div>
        )}
      </div>

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
