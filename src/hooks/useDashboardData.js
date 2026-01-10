import { useEffect, useState } from 'react'
import { contactsService } from '@/services/contacts/contacts.service'
import { campaignsService } from '@/services/campaigns/campaigns.service'

const REGION_COLORS = {
  Sudeste: '#0b3c5d',
  Sul: '#145374',
  Nordeste: '#1c6ea4',
  'Centro-Oeste': '#2a9df4',
  Norte: '#6ec1e4'
};

const AREA_COLORS = {
  'Ciências Humanas': '#0b3c5d',
  'Ciências Exatas': '#145374',
  'Ciências Biológicas': '#1c6ea4',
  Engenharias: '#2a9df4',
  'Ciências da Saúde': '#6ec1e4'
};

function aggregateData(items, key, colorMap) {
  if (!items || items.length === 0) return [];

  const aggregation = items.reduce((acc, item) => {
    const value = item[key] || 'Não definido';
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
  const [messagesThisMonth, setMessagesThisMonth] = useState(0)
  const [activeCampaigns, setActiveCampaigns] = useState(0)
  const [nextDispatch, setNextDispatch] = useState('')

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true)

        // NOTE: The API does not exist, so this will fail.
        // We are preparing the frontend for when the API is ready.
        const [contacts, campaigns] = await Promise.all([
          contactsService.getAll(),
          Promise.resolve([]) // campaignsService.getAll() is not available on the backend
        ]);
        
        setTotalContacts(contacts.length);
        
        setContactsByRegion(aggregateData(contacts, 'region', REGION_COLORS));
        setContactsByArea(aggregateData(contacts, 'area', AREA_COLORS));

        setLastCampaigns(campaigns);
        
        const active = campaigns.filter(c => c.status === 'active');
        setActiveCampaigns(active.length);

        // MOCK REMAINS: API data structure for these is unknown.
        setMessagesThisMonth(3245);
        
        const scheduled = campaigns
          .filter(c => c.status === 'scheduled' && new Date(c.datetime) > new Date())
          .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

        if (scheduled.length > 0) {
          const next = new Date(scheduled[0].datetime);
          setNextDispatch(next.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }));
        } else {
          setNextDispatch('N/A');
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
  messagesThisMonth,
  activeCampaigns,
  nextDispatch,
  contactsByRegion,
  contactsByArea,
  lastCampaigns
}

}