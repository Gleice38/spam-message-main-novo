import React from 'react';
import StatCard from "./components/StatCard";
import LineChart from "./components/lineChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import CampaignTable from './components/CampaignTable';
import { Database, TrendingUp, Clock, GraduationCap, MapPin } from 'lucide-react';
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
          title="Contatos Totais"
          value={totalContacts}
          icon={<Database size={24} />}
          subtitle=""
        />

        <StatCard
          title="Campanhas Ativas"
          value={activeCampaigns}
          icon={<TrendingUp size={24} />}
          subtitle=""
        />
      </section>



      {/* PRÓXIMOS DISPAROS AGENDADOS */}
      <section className="dashboard-section dashboard-section--scheduled">
        <div className="scheduled-card">
          <div className="scheduled-card-header">
            <span className="scheduled-card-icon"><Clock size={28} /></span>
            <div>
              <h3 className="scheduled-card-title">Próximos Disparos Agendados</h3>
              <p className="scheduled-card-subtitle">Campanhas programadas para envio via WhatsApp</p>
            </div>
          </div>
          <CampaignTable campaigns={lastCampaigns.filter(c => c.status === 'agendado' || c.status === 'scheduled' || c.status === 'SCHEDULED')} />
        </div>
      </section>

      {/* GRÁFICOS PRINCIPAIS */}
       <section className="dashboard-section dashboard-section--charts">

  <div className="card">
    <div className="card-with-icon">
      <div className="card-icon">
        <MapPin size={24} />
      </div>

      <div className="card-titles">
        <h3 className="card-title">Contatos por Região</h3>
        <p className="card-subtitle">Distribuição geográfica da base de dados</p>
      </div>
    </div>

    <div className="card-content-chart">
      <PieChart data={contactsByRegion} />
    </div>
  </div>

  <div className="card">
    <div className="card-with-icon">
      <div className="card-icon">
        <GraduationCap size={24} />
      </div>

      <div className="card-titles">
        <h3 className="card-title">Contatos por Área Acadêmica</h3>
        <p className="card-subtitle">Distribuição por campo de estudo</p>
      </div>
    </div>

    <div className="card-content-chart">
      <BarChart data={contactsByArea} />
    </div>
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
