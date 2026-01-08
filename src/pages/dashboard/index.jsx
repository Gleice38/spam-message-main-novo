import React from 'react'
import StatCard from "./components/StatCard"
import LineChart from "./components/lineChart" // "l" minúsculo conforme sua pasta
import PieChart from "./components/PieChart"   // "P" maiúsculo conforme sua pasta
import BarChart from "./components/BarChart"
import CampaignTable from './components/CampaignTable'
import { Database, Send, TrendingUp, Clock } from 'lucide-react'
import './style.css'

export default function Dashboard() {
  const contactsByRegion = [
    { label: 'Sudeste', value: 47, color: '#0b3c5d' },
    { label: 'Sul', value: 20, color: '#145374' },
    { label: 'Nordeste', value: 13, color: '#1c6ea4' },
    { label: 'Centro-Oeste', value: 12, color: '#2a9df4' },
    { label: 'Norte', value: 8, color: '#6ec1e4' }
  ]

  const contactsByArea = [
    { label: 'Ciências Humanas', value: 32, color: '#0b3c5d' },
    { label: 'Ciências Exatas', value: 26, color: '#145374' },
    { label: 'Ciências Biológicas', value: 18, color: '#1c6ea4' },
    { label: 'Engenharias', value: 14, color: '#2a9df4' },
    { label: 'Ciências da Saúde', value: 10, color: '#6ec1e4' }
  ]

  const lastCampaigns = [
    { name: 'Workshop de IA', datetime: '12/03/2025 • 14:00', region: 'Sudeste', contacts: 1240, status: 'active' },
    { name: 'Seminário de Ecologia', datetime: '20/03/2025 • 10:00', region: 'Nordeste', contacts: 860, status: 'scheduled' },
    { name: 'Congresso Nacional', datetime: '02/03/2025 • 09:00', region: 'Nacional', contacts: 3200, status: 'finished' }
  ]

  return (
    <div className="dashboard-container" style={{ padding: '20px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <h1 style={{ color: '#0b3c5d', marginBottom: '20px' }}>Painel Cooperativa</h1>
      
      {/* Seção de Cards de Estatísticas */}
      <section className="dashboard-stats" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <StatCard title="Total de Contatos" value="15.847" icon={<Database size={20} />} />
        <StatCard title="Mensagens (Dez)" value="3.245" icon={<Send size={20} />} />
        <StatCard title="Campanhas Ativas" value="5" icon={<TrendingUp size={20} />} />
        <StatCard title="Próximo Disparo" value="Hoje às 14h" icon={<Clock size={20} />} />
      </section>

      {/* Seção de Gráficos */}
      <section className="dashboard-charts" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '10px', color: '#667' }}>Evolução</h3>
          <LineChart />
        </div>
        <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '10px', color: '#667' }}>Região</h3>
          {<PieChart data={contactsByRegion} />}
        </div>
        <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '10px', color: '#667' }}>Área</h3>
          {<BarChart data={contactsByArea} /> }
        </div>
      </section>

      {/* Seção de Tabela */}
      <section className="dashboard-table" style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '15px', color: '#0b3c5d' }}>Últimas Campanhas</h3>
        { <CampaignTable campaigns={lastCampaigns} />}
      </section>
    </div>
  )
}