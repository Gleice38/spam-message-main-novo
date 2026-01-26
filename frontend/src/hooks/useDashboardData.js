import { useEffect, useState } from 'react'
import { contactsService } from '@/services/contacts/contacts.service'
import { campaignsService } from '@/services/campaigns/campaigns.service'
import { CAMPUSES, ACADEMIC_AREAS, REGIONS } from '@/constants/data'

const REGION_COLORS = {
  Sudeste: '#0b3c5d',
  Sul: '#145374',
  Nordeste: '#1c6ea4',
  'Centro-Oeste': '#2a9df4',
  Norte: '#6ec1e4'
};

const AREA_COLORS = {
  'Ciências Humanas': '#0b3c5d',
  'Ciências Exatas e da Terra': '#145374',
  'Ciências Biológicas': '#1c6ea4',
  'Engenharias': '#2a9df4',
  'Ciências da Saúde': '#6ec1e4',
  'Ciências Agrárias': '#88d8b0',
  'Ciências Sociais Aplicadas': '#ff6f69',
  'Linguística, Letras e Artes': '#ffcc5c'
};

function getRegionByCampusId(campusId) {
  const campus = CAMPUSES.find(c => c.id === campusId);
  if (!campus) return 'Não definido';
  const region = REGIONS.find(r => r.states.includes(campus.state));
  return region ? region.name : 'Não definido';
}

function getAreaNameById(areaId) {
  const area = ACADEMIC_AREAS.find(a => a.id === areaId);
  return area ? area.name : 'Não definido';
}

function aggregateData(items, keyExtractor, colorMap) {
  if (!Array.isArray(items) || items.length === 0) return [];

  const aggregation = items.reduce((acc, item) => {
    const value = keyExtractor(item);
    if (!acc[value]) {
      acc[value] = 0;
    }
    acc[value]++;
    return acc;
  }, {});

  return Object.entries(aggregation).map(([label, value]) => ({
    label,
    value,
    color: colorMap[label] || '#cccccc' 
  })).sort((a, b) => b.value - a.value);
}


export function useDashboardData() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [totalContacts, setTotalContacts] = useState(0)
  const [contactsByRegion, setContactsByRegion] = useState([])
  const [contactsByArea, setContactsByArea] = useState([])
  const [lastCampaigns, setLastCampaigns] = useState([])
  const [activeCampaigns, setActiveCampaigns] = useState(0)
  const [nextDispatch, setNextDispatch] = useState('')
  const [nextDispatchName, setNextDispatchName] = useState('')
  const [messageHistory, setMessageHistory] = useState([
    { month: 'Jul', value: 1800 },
    { month: 'Ago', value: 2100 },
    { month: 'Set', value: 2450 },
    { month: 'Out', value: 2200 },
    { month: 'Nov', value: 2900 },
    { month: 'Dez', value: 3300 }
  ])

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true)

        const [contactsRaw, campaignsRaw] = await Promise.all([
          contactsService.getAll(),
          campaignsService.getAll()
        ]);
        const contacts = Array.isArray(contactsRaw) ? contactsRaw : [];
        const campaigns = Array.isArray(campaignsRaw) ? campaignsRaw : [];

        setTotalContacts(contacts.length);
        setContactsByRegion(aggregateData(contacts, (c) => getRegionByCampusId(c.campus_id), REGION_COLORS));
        setContactsByArea(aggregateData(contacts, (c) => getAreaNameById(c.academic_area_id), AREA_COLORS));

        // Exibe todas as campanhas, inclusive agendadas
        setLastCampaigns(campaigns.map(c => ({
          ...c,
          datetime: c.scheduled_at ? new Date(c.scheduled_at).toLocaleString('pt-BR') : '',
          region: c.filters_snapshot?.regions?.join(', ') || '',
          contacts: c.contacts_count || 0,
          status: c.status?.toLowerCase() || ''
        })));

        // Considera como ativa apenas campanhas com status realmente ativos
        const ACTIVE_STATUS = ['pending', 'running', 'active'];
        const INACTIVE_STATUS = ['completed', 'finished', 'sent', 'failed', 'cancelled', 'canceled', 'concluida', 'concluído', 'finalizada', 'finalizado'];
        const active = campaigns.filter(c => {
          const status = (c.status || '').toLowerCase();
          return ACTIVE_STATUS.includes(status) && !INACTIVE_STATUS.includes(status);
        });
        setActiveCampaigns(active.length);

        const scheduled = campaigns
          .filter(c => c.status === 'SCHEDULED' && c.scheduled_at && new Date(c.scheduled_at) > new Date())
          .sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at));

        // Log para depuração: campanhas agendadas e seus horários
        if (scheduled.length > 0) {
          console.log('Campanhas agendadas (ordenadas):');
          scheduled.forEach(c => {
            console.log(`Nome: ${c.name} | scheduled_at: ${c.scheduled_at} | Data local: ${new Date(c.scheduled_at).toLocaleString('pt-BR')}`);
          });
          const next = new Date(scheduled[0].scheduled_at);
          setNextDispatch(next.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }));
          setNextDispatchName(scheduled[0].name || '');
        } else {
          setNextDispatch('N/A');
          setNextDispatchName('');
        }

      } catch (err) {
        setError(err.message || 'Erro ao carregar dashboard')
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

 return {
  loading,
  error,
  totalContacts,
   activeCampaigns,
  nextDispatch,
  nextDispatchName,
  contactsByRegion,
  contactsByArea,
  lastCampaigns,
  messageHistory
}

}
