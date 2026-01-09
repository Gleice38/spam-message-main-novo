import { useEffect, useState } from 'react'
import { contactsService } from '@/services/contacts/contacts.service'
// import { campaignsService } from '@/services/campaigns/campaigns.service'

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

        // 🔹 Dado real vindo do backend
        const contacts = await contactsService.getAll()

        // 🔹 Métrica simples
        setTotalContacts(contacts.length)

        // 🔹 Agregações (mockadas por enquanto)
        // Podem virar cálculo real depois
        setContactsByRegion([
          { label: 'Sudeste', value: 47, color: '#0b3c5d' },
          { label: 'Sul', value: 20, color: '#145374' },
          { label: 'Nordeste', value: 13, color: '#1c6ea4' },
          { label: 'Centro-Oeste', value: 12, color: '#2a9df4' },
          { label: 'Norte', value: 8, color: '#6ec1e4' }
        ])
        // MOCK TEMPORÁRIO
         setMessagesThisMonth(3245)
         setActiveCampaigns(lastCampaigns.filter(c => c.status === 'active').length)
         setNextDispatch('Hoje às 14h')


        setContactsByArea([
          { label: 'Ciências Humanas', value: 32, color: '#0b3c5d' },
          { label: 'Ciências Exatas', value: 26, color: '#145374' },
          { label: 'Ciências Biológicas', value: 18, color: '#1c6ea4' },
          { label: 'Engenharias', value: 14, color: '#2a9df4' },
          { label: 'Ciências da Saúde', value: 10, color: '#6ec1e4' }
        ])

        // 🔹 Campanhas (mock até existir GET /campaigns)
        setLastCampaigns([
          {
            name: 'Workshop de IA',
            datetime: '12/03/2025 • 14:00',
            region: 'Sudeste',
            contacts: 1240,
            status: 'active'
          },
          {
            name: 'Seminário de Ecologia',
            datetime: '20/03/2025 • 10:00',
            region: 'Nordeste',
            contacts: 860,
            status: 'scheduled'
          }
        ])
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