import React from 'react';
import StatCard from "./components/StatCard";
import LineChart from "./components/lineChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import CampaignTable from './components/CampaignTable';
import Navbar from '../../components/Navbar';
import { Database, Send, TrendingUp, Clock } from 'lucide-react';
import './style.css';
import { useDashboardData } from '@/hooks/useDashboardData';

export default function Dashboard() {
  const {
    totalContacts,
    messagesThisMonth,
    activeCampaigns,
    nextDispatch,
    contactsByRegion,
    contactsByArea,
    lastCampaigns
  } = useDashboardData();

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Bem-vindo ao Dashboard</h1>
          <p>Gerencie suas campanhas de WhatsApp para contatos de pós-graduação</p>
        </header>

        {/* Estatísticas Principais conforme protótipo */}
        <section className="dashboard-section">
          <StatCard title="Total de Contatos" value={totalContacts} icon={<Database size={20} />} trend="+342 novos este mês" />
          <StatCard title="Mensagens (Dezembro)" value={messagesThisMonth} icon={<Send size={20} />} trend="+12.2% vs mês anterior" />
          <StatCard title="Campanhas Ativas" value={activeCampaigns} icon={<TrendingUp size={20} />} trend="Em andamento" />
          <StatCard title="Próximo Disparo" value={nextDispatch} icon={<Clock size={20} />} trend="Workshop de IA" />
        </section>

        <section className="dashboard-section--charts">
          <div className="card">
            <h3 className="card-title">Histórico de Mensagens Enviadas</h3>
            <p className="card-subtitle">Evolução nos últimos meses</p>
            <LineChart />
          </div>

          <div className="card">
            <h3 className="card-title">Contatos por Região</h3>
            <p className="card-subtitle">Distribuição geográfica da base</p>
            <PieChart data={contactsByRegion} />
          </div>
        </section>

        <section className="dashboard-section--bar">
          <div className="card">
            <h3 className="card-title">Contatos por Área Acadêmica</h3>
            <p className="card-subtitle">Distribuição por campo de estudo</p>
            <BarChart data={contactsByArea} />
          </div>
        </section>

        <section className="dashboard-section--table">
          <div className="card">
            <h3 className="card-title">Últimas Campanhas</h3>
            <p className="card-subtitle">Histórico de eventos divulgados via WhatsApp</p>
            <CampaignTable campaigns={lastCampaigns} />
          </div>
        </section>

        <footer className="dashboard-footer">
          © 2026 Mensagens Cooperativa. Todos os direitos reservados.
        </footer>
      </div>
    </>
  );
}