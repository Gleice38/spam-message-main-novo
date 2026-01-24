import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import schema from "./schema.json";
import "./style.css";

export default function Notificacoes() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeMenuId = useMemo(() => {
    if (location.pathname.startsWith("/preferencias")) return "preferencias";
    if (location.pathname.startsWith("/perfil")) return "perfil";
    return "notificacoes";
  }, [location.pathname]);

  const [options, setOptions] = useState(() => {
    const obj = {};
    schema.opcoes.forEach((o) => (obj[o.id] = !!o.ativo));
    return obj;
  });

  const [saved, setSaved] = useState(false);

  function goTo(route) {
    navigate(route);
  }

  function toggle(id) {
    setOptions((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleSave() {
    setSaved(false);

    // TODO: Salvar no backend
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  }

  return (
    <div className="notificacoes-page">
      <div className="notificacoes-shell">
        {/* MENU LATERAL (NO ESTILO DO PRINT) */}
        <aside className="menu-card">
          <h3 className="menu-title">{schema.menuLateral.titulo}</h3>

          <div className="menu-items">
            {(Array.isArray(schema.menuLateral?.itens) ? schema.menuLateral.itens : []).map((item) => {
              const isActive = item.id === activeMenuId;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`menu-btn ${isActive ? "active" : ""}`}
                  onClick={() => goTo(item.route)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </aside>

        {/* CONTEÚDO */}
        <main className="card">
          <div className="card-header">
            <h2>{schema.titulo}</h2>
            <p>{schema.descricao}</p>
          </div>

          <div className="notif-list">
            {(Array.isArray(schema?.opcoes) ? schema.opcoes : []).map((op) => (
              <label key={op.id} className="notif-item">
                <input
                  type="checkbox"
                  checked={!!options[op.id]}
                  onChange={() => toggle(op.id)}
                />

                <div className="notif-texts">
                  <strong>{op.titulo}</strong>
                  <span>{op.descricao}</span>
                </div>
              </label>
            ))}
          </div>

          <button type="button" className="btn-primary" onClick={handleSave}>
            {saved ? "Notificações Salvas!" : schema.botaoSalvar}
          </button>
        </main>
      </div>
    </div>
  );
}
