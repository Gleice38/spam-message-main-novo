import React from 'react'
import StatCard from "./components/StatCard"
import LineChart from "./components/lineChart"
import PieChart from "./components/PieChart"
import BarChart from "./components/BarChart"
import CampaignTable from './components/CampaignTable'
import Navbar from '../../components/Navbar'
import { Database, Send, TrendingUp, Clock } from 'lucide-react'
import './style.css'
import { useDashboardData } from '@/hooks/useDashboardData'


export default function Dashboard() {
const {
  loading,
  error,
  totalContacts,
  messagesThisMonth,
  activeCampaigns,
  nextDispatch,
  contactsByRegion,
  contactsByArea,
  lastCampaigns
} = useDashboardData()



  const cardStyle = {
    background: '#fff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  }

  const cardTitle = {
    fontSize: '16px',
    color: '#0b3c5d',
    marginBottom: '4px'
  }

  const cardSubtitle = {
    fontSize: '13px',
    color: '#667',
    marginBottom: '16px'
  }

  return (
    <>
      {/* NAVBAR FIXA */}
      <Navbar />

      {/* CONTEÚDO */}
      <div
        className="dashboard-container"
        style={{
          padding: '32px',
          paddingTop: '96px', // espaço da navbar
          backgroundColor: '#f4f7f6',
          minHeight: '100vh'
        }}
      >
        {/* Boas-vindas */}
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ color: '#0b3c5d', fontSize: '24px', marginBottom: '6px' }}>
            Bem-vindo ao Dashboard
          </h1>
          <p style={{ color: '#667', fontSize: '14px' }}>
            Gerencie suas campanhas de WhatsApp para contatos de pós-graduação
          </p>
        </header>

        {/* Cards principais */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}
        >
          <StatCard title="Total de Contatos" value={totalContacts} icon={<Database size={20} />} />
          <StatCard title="Mensagens (Dezembro)" value={messagesThisMonth} icon={<Send size={20} />} />
          <StatCard title="Campanhas Ativas" value={activeCampaigns} icon={<TrendingUp size={20} />} />
          <StatCard title="Próximo Disparo" value={nextDispatch} icon={<Clock size={20} />} />

        </section>

        {/* Gráficos */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '20px',
            marginBottom: '40px'
          }}
        >
          <div style={cardStyle}>
            <h3 style={cardTitle}>Histórico de Mensagens Enviadas</h3>
            <p style={cardSubtitle}>Evolução nos últimos meses</p>
            <LineChart />
          </div>

          <div style={cardStyle}>
            <h3 style={cardTitle}>Contatos por Região</h3>
            <p style={cardSubtitle}>Distribuição geográfica da base</p>
            <PieChart data={contactsByRegion} />
          </div>
        </section>

        {/* Barra */}
        <section style={{ marginBottom: '40px' }}>
          <div style={cardStyle}>
            <h3 style={cardTitle}>Contatos por Área Acadêmica</h3>
            <p style={cardSubtitle}>Distribuição por campo de estudo</p>
            <BarChart data={contactsByArea} />
          </div>
        </section>

        {/* Tabela */}
        <section style={{ marginBottom: '40px' }}>
          <div style={cardStyle}>
            <h3 style={cardTitle}>Últimas Campanhas</h3>
            <p style={cardSubtitle}>Histórico de eventos divulgados via WhatsApp</p>
            <CampaignTable campaigns={lastCampaigns} />
          </div>
        </section>

        {/* Métricas finais */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}
        >
          <StatCard title="Instituições Cadastradas" value="78" subtitle="Universidades em todo Brasil" icon={<Database size={20} />} />
          <StatCard title="Média de Envios" value="1.200" subtitle="Mensagens por dia útil" icon={<Send size={20} />} />
          <StatCard title="Crescimento da Base" value="+2.2%" subtitle="Novos contatos este mês" icon={<TrendingUp size={20} />} />
        </section>

        <footer style={{ textAlign: 'center', fontSize: '12px', color: '#999' }}>
          © 2025 Mensagens Cooperativa. Todos os direitos reservados.
        </footer>
      </div>
    </>
  )
}

