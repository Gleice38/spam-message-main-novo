import React from 'react'
import StatCard from "./components/StatCard"
import LineChart from "./components/lineChart"
import PieChart from "./components/PieChart"
import BarChart from "./components/BarChart"
import CampaignTable from './components/CampaignTable'
import Navbar from '../../components/Navbar'
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
          <StatCard title="Total de Contatos" value="15.847" icon={<Database size={20} />} />
          <StatCard title="Mensagens (Dezembro)" value="3.245" icon={<Send size={20} />} />
          <StatCard title="Campanhas Ativas" value="5" icon={<TrendingUp size={20} />} />
          <StatCard title="Próximo Disparo" value="Hoje às 14h" icon={<Clock size={20} />} />
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

