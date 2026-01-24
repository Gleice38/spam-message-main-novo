import './CampaignTable.css'

export default function CampaignTable({ campaigns = [] }) {
  if (!Array.isArray(campaigns) || !campaigns.length) return null

  const getStatusLabel = (status) => {
    switch ((status || '').toUpperCase()) {
      case 'FINISHED':
      case 'COMPLETED':
        return 'Concluído';
      case 'SCHEDULED':
        return 'Agendado';
      case 'ACTIVE':
      case 'RUNNING':
        return 'Em andamento';
      case 'PENDING':
        return 'Pendente';
      case 'SENT':
        return 'Enviado';
      case 'FAILED':
        return 'Falhou';
      default:
        return status;
    }
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
        {campaigns.map((item, index) => {
          // Mostra scheduled_at se existir, senão created_at
          let dateToShow = item.scheduled_at || item.created_at || '';
          let dateStr = dateToShow ? new Date(dateToShow).toLocaleString('pt-BR') : '—';
          return (
            <tr key={index}>
              <td className="event-name">{item.name}</td>
              <td className="datetime">{dateStr}</td>
              <td>{item.region}</td>
              <td>{item.contacts?.toLocaleString?.() ?? 0}</td>
              <td>
                <span className={`status-badge ${item.status?.toLowerCase?.()}`}>{getStatusLabel(item.status)}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}
