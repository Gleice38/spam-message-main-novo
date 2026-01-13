import "./Contacts.css";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

export default function Contacts() {
  const contacts = [
    {
      id: 1,
      name: "Dr. João Silva",
      phone: "(11) 98765-4321",
      state: "SP",
      city: "São Paulo",
      campus: "USP - Campus Capital",
      faculty: "Faculdade de Medicina",
    },
    {
      id: 2,
      name: "Dra. Maria Santos",
      phone: "(21) 99876-5432",
      state: "RJ",
      city: "Rio de Janeiro",
      campus: "UFRJ - Ilha do Fundão",
      faculty: "Faculdade de Engenharia",
    },
  ];

  return (
    <div className="contacts-page">
      {/* HEADER */}
      <div className="contacts-header">
        <div>
          <h1>Gerenciar Contatos</h1>
          <p>Cadastre e organize contatos do banco de dados</p>
        </div>

        <button className="btn-primary">
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
              <th>Estado</th>
              <th>Cidade</th>
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
                  <span className="state-badge">{c.state}</span>
                </td>
                <td>{c.city}</td>
                <td>{c.campus}</td>
                <td>{c.faculty}</td>
                <td className="actions">
                  <button className="icon-btn edit">
                    <Pencil size={16} />
                  </button>
                  <button className="icon-btn delete">
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
