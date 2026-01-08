import React from 'react'
import './CampaignTable.css'

const STATUS_LABELS = {
  active: 'Ativa',
  scheduled: 'Agendada',
  finished: 'Finalizada'
}

export default function CampaignTable({
  title = 'Últimas Campanhas',
  subtitle = 'Resumo das campanhas recentes',
  campaigns = []
}) {
  return (
    <div className="table-card">
      <header className="table-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </header>

      {/* Desktop / Tablet */}
      <div className="table-wrapper desktop-only">
        <table className="campaign-table">
          <thead>
            <tr>
              <th>Evento</th>
              <th>Data / Hora</th>
              <th>Região</th>
              <th>Contatos</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.datetime}</td>
                <td>{item.region}</td>
                <td>{item.contacts}</td>
                <td>
                  <span className={`status-badge ${item.status}`}>
                    {STATUS_LABELS[item.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="mobile-only">
        {campaigns.map((item, index) => (
          <div key={index} className="campaign-card">
            <div className="campaign-card-header">
              <strong>{item.name}</strong>
              <span className={`status-badge ${item.status}`}>
                {STATUS_LABELS[item.status]}
              </span>
            </div>

            <div className="campaign-card-row">
              <span>Data</span>
              <span>{item.datetime}</span>
            </div>

            <div className="campaign-card-row">
              <span>Região</span>
              <span>{item.region}</span>
            </div>

            <div className="campaign-card-row">
              <span>Contatos</span>
              <span>{item.contacts}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
