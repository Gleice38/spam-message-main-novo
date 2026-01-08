import './CampaignTable.css'

export default function CampaignTable({ campaigns = [] }) {
  if (!campaigns.length) return null

  const getStatusLabel = (status) => {
    if (status === 'finished') return 'Concluído'
    if (status === 'scheduled') return 'Agendado'
    if (status === 'active') return 'Em andamento'
    return status
  }

  return (
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
            <td className="event-name">{item.name}</td>
<td className="datetime">
  {typeof item.datetime === 'string' && item.datetime.includes('•')
    ? item.datetime.split('•').map((part, i) => (
        <div key={i}>{part.trim()}</div>
      ))
    : (
        <div>{item.datetime || '—'}</div>
      )
  }
</td>


            <td>{item.region}</td>

            <td>{item.contacts.toLocaleString()}</td>

            <td>
              <span className={`status-badge ${item.status}`}>
                {getStatusLabel(item.status)}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
