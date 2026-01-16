import { useState } from 'react'
import schema from './schema.json'
import './style.css'

export default function Perfil() {
  const [activeTab, setActiveTab] = useState('perfil')

  // valores iniciais vindos do schema.json
  const [formData] = useState(() => {
    const data = {}
    schema?.perfil?.campos?.forEach((campo) => {
      data[campo.id] = campo.valor || ''
    })
    return data
  })

  return (
    <div className="perfil-page">
      <div className="perfil-shell">
        {/* SIDEBAR */}
        <aside className="sidebar-card">
          <h3>{schema?.menuLateral?.titulo || 'Menu'}</h3>

          <ul className="menu-list">
            {(schema?.menuLateral?.itens || []).map((item) => (
              <li
                key={item.id}
                className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* CONTEÚDO */}
        <main className="card">
          {/* PERFIL */}
          {activeTab === 'perfil' && (
            <>
              <div className="card-header">
                <h2>{schema?.titulo || 'Informações do Perfil'}</h2>
                <p>{schema?.descricao || 'Gerencie suas informações pessoais'}</p>
              </div>

              <div className="profile-form">
                {(schema?.perfil?.campos || []).map((campo) => (
                  <div className="form-group" key={campo.id}>
                    <label>{campo.label}</label>

                    {/* modo leitura (sem borda) */}
                    <div className="input-wrapper">
                      <input type="text" value={formData[campo.id] || ''} readOnly />
                    </div>
                  </div>
                ))}

                {/* Botão salvar (visual) */}
                <button className="btn-primary" type="button">
                  {schema?.perfil?.acaoSalvar?.label || 'Salvar Alterações'}
                </button>
              </div>

              <div className="divider"></div>

              {/* TUTORIAL */}
              <div className="tutorial">
                <div className="tutorial-head">
                  <i className="fa-regular fa-circle-question tutorial-icon"></i>
                  <h3 className="tutorial-title">
                    {schema?.tutorial?.titulo || 'Tutorial de Boas-Vindas'}
                  </h3>
                </div>

                <p className="tutorial-desc">
                  {schema?.tutorial?.descricao || 'Revise as funcionalidades principais da plataforma'}
                </p>

                <button className="btn-tutorial" type="button">
                  <i className="fa-solid fa-book-open"></i>
                  {schema?.tutorial?.acao?.label || 'Ver Tutorial Novamente'}
                </button>
              </div>
            </>
          )}

          {/* Notificações */}
          {activeTab === 'notificacoes' && (
            <div className="card-header">
              <h2>Notificações</h2>
              <p>Configurações de notificações (em construção).</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
