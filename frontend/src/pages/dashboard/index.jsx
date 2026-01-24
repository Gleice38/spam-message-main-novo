import React from 'react';
import StatCard from "./components/StatCard";
import LineChart from "./components/lineChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import CampaignTable from './components/CampaignTable';
import { Database, TrendingUp, Clock } from 'lucide-react';
import './style.css';
import { useDashboardData } from '@/hooks/useDashboardData';

export default function Dashboard() {
  const {
    totalContacts,
    activeCampaigns,
    nextDispatch,
    nextDispatchName,
    contactsByRegion,
    contactsByArea,
    lastCampaigns,
    messageHistory
  } = useDashboardData();

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Gerencie suas campanhas de WhatsApp para contatos de pós-graduação</p>
      </header>

      {/* KPIs */}
      <section className="dashboard-section dashboard-section--stats">
        <StatCard
          title="Total de Contatos"
          value={totalContacts}
          icon={<Database size={24} />}
          subtitle=""
        />

        <StatCard
          title="Campanhas Ativas"
          value={activeCampaigns}
          icon={<TrendingUp size={24} />}
          subtitle="Em andamento"
        />

        <StatCard
          title="Próximo Disparo"
          value={nextDispatch}
          icon={<Clock size={24} />}
          subtitle={nextDispatchName}
        />
      </section>


      {/* GRÁFICOS PRINCIPAIS */}
      <section className="dashboard-section dashboard-section--charts">
        <div className="card">
          <h3 className="card-title">Contatos por Região</h3>
          <p className="card-subtitle">Distribuição geográfica da base</p>
          <PieChart data={contactsByRegion} />
        </div>
        <div className="card">
          <h3 className="card-title">Contatos por Área Acadêmica</h3>
          <p className="card-subtitle">Distribuição por campo de estudo</p>
          <BarChart data={contactsByArea} />
        </div>
      </section>



      {/* FOOTER */}
      <footer className="dashboard-footer">
        <div className="dashboard-footer__content">
          <img
            src="/softex-logo.png"
            alt="Softex"
            className="dashboard-footer__logo"
          />
          <span>
            ©2025 Mensagens Cooperativa. Todos os direitos reservados.
          </span>
        </div>
      </footer>

    </div>
  );
}
