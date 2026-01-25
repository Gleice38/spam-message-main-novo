// Contact.jsx - Ajustado conforme Contacts.css
import "./Contacts.css";
import { Plus, Search, Pencil, Trash2, Users, MapPin } from "lucide-react"; // Adicionei MapPin para o estilo
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

  /* HELPERS */
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

  async function loadContacts() {
    try {
      const data = await contactsService.getAll();
      setContacts(data);
      setFilteredContacts(data);
    } catch (error) {
      toast.error("Erro ao carregar contatos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

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
      toast.success("Contato excluído!");
    } catch (error) {
      toast.error("Erro ao excluir contato.");
    }
  }

  function toggleRegion(region) {
    setOpenRegion((prev) => (prev === region ? null : region));
  }

  const groupedContacts = filteredContacts.reduce((acc, contact) => {
    const campus = CAMPUSES.find(c => c.id === contact.campus_id);
    const campusName = campus ? campus.name : 'Sem Campus';
    if (!acc[campusName]) acc[campusName] = [];
    acc[campusName].push(contact);
    return acc;
  }, {});

  return (
    <div className="contacts-full-page"> {/* AJUSTADO */}
      <div className="contacts-content-wrapper"> {/* ADICIONADO WRAPPER */}
        
        {/* HEADER */}
        <header className="page-header"> {/* AJUSTADO */}
          <div className="header-text-group"> {/* AJUSTADO */}
            <div>
              <h1>Gerenciar Contatos</h1>
              <p>Cadastre e organize contatos do banco de dados</p>
            </div>
          </div>

          <button className="btn-add-new" onClick={() => navigate("/contacts/new")}> {/* AJUSTADO */}
            <Plus size={16} />
            Novo Contato
          </button>
        </header>

        {/* CARD PRINCIPAL */}
        <div className="main-card"> {/* AJUSTADO */}
          <div className="card-header-actions" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}> {/* ADICIONADO ESTILO FLEX */}
            <div className="card-intro"> {/* AJUSTADO */}
              <div className="icon-badge"> {/* AJUSTADO */}
                <Users size={24} />
              </div>
              <div>
                <h2>Contatos cadastrados</h2>
                <p> {/* AJUSTADO PARA P */}
                  {searchTerm
                    ? `${filteredContacts.length} de ${contacts.length} contatos`
                    : `${contacts.length} contatos no banco de dados`}
                </p>
              </div>
            </div>

            <div className="search-container"> {/* AJUSTADO */}
              <Search size={18} />
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
              title={searchTerm ? "Nenhum contato encontrado" : "Nenhum contato cadastrado"}
              description={searchTerm ? `Nenhum resultado para "${searchTerm}".` : "Comece adicionando seu primeiro contato."}
              action={!searchTerm && (
                <button className="btn-confirm" onClick={() => navigate("/contacts/new")}>
                  <Plus size={16} /> Adicionar Primeiro Contato
                </button>
              )}
            />
          ) : (
            <div className="accordion-list">
              {Object.entries(groupedContacts).map(([campusName, items]) => (
                <div key={campusName} className="accordion-item"> {/* AJUSTADO */}
                  <button
                    className="accordion-trigger" /* AJUSTADO */
                    onClick={() => toggleRegion(campusName)}
                  >
                    <div className="trigger-content"> {/* AJUSTADO */}
                      <MapPin size={18} className="pin" /> {/* ADICIONADO ÍCONE PIN */}
                      <strong>{campusName}</strong>
                      <span className="count">({items.length} contato{items.length > 1 ? "s" : ""})</span>
                    </div>
                    {/* A seta agora é controlada pela classe ou ícone direto se preferir */}
                    <Plus size={18} style={{ transform: openRegion === campusName ? 'rotate(45deg)' : 'none', transition: '0.2s' }} />
                  </button>

                  {openRegion === campusName && (
                    <div className="table-wrapper" style={{ overflowX: 'auto' }}>
                      <table className="contacts-table"> {/* Use a classe se tiver, ou apenas <table> */}
                        <thead>
                          <tr>
                            <th style={{ textAlign: 'left', padding: '12px' }}>Nome</th>
                            <th style={{ textAlign: 'left', padding: '12px' }}>Telefone</th>
                            <th style={{ textAlign: 'left', padding: '12px' }}>Perfil</th>
                            <th style={{ textAlign: 'left', padding: '12px' }}>Campus</th>
                            <th style={{ textAlign: 'left', padding: '12px' }}>Área Acadêmica</th>
                            <th style={{ textAlign: 'right', padding: '12px' }}>Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((c) => (
                            <tr key={c.id}>
                              <td style={{ padding: '12px', fontWeight: '700' }}>{c.name}</td>
                              <td style={{ padding: '12px' }}>{c.phone}</td>
                              <td style={{ padding: '12px' }}>
                                <span className={`state-badge ${getRoleBadgeClass(c.role)}`}>
                                  {ROLES[c.role] || c.role}
                                </span>
                              </td>
                              <td style={{ padding: '12px' }}>{getCampusName(c.campus_id)}</td>
                              <td style={{ padding: '12px' }}>{getAreaName(c.academic_area_id)}</td>
                              <td style={{ padding: '12px', textAlign: 'right' }}>
                                <button className="icon-btn edit" onClick={() => navigate(`/contacts/edit/${c.id}`)}>
                                  <Pencil size={16} color="#0EA5E9" />
                                </button>
                                <button className="icon-btn delete" onClick={() => handleDelete(c.id)}>
                                  <Trash2 size={16} color="#EF4444" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <footer className="dashboard-footer" style={{ marginTop: '40px' }}>
          <div className="dashboard-footer__content" style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#6b7280' }}>
            <img src="/softex-logo.png" alt="Softex" style={{ height: '30px' }} />
            <span>©2025 Mensagens Cooperativa. Todos os direitos reservados.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}