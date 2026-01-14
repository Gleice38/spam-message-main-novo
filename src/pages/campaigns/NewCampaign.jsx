import "./NewCampaign.css";
import { MessageSquare, Filter, Calendar } from "lucide-react";

export default function NewCampaign() {
  return (
    <div className="page-container">
      
      {/* HEADER DA PÁGINA */}
      <div className="page-header">
        <h1>Nova Campanha de Mensagens</h1>
        <p>Crie e envie mensagens personalizadas via WhatsApp</p>
      </div>

      {/* GRID PRINCIPAL */}
      <div className="campaign-grid">

        {/* COLUNA ESQUERDA */}
        <div className="campaign-left">

          {/* CARD 1 */}
          <div className="card">
            <div className="card-header">
              <MessageSquare size={18} />
              <div>
                <h2>Informações da Campanha</h2>
                <span>Detalhes sobre o evento que será divulgado</span>
              </div>
            </div>

            <div className="card-content">
              <label>Nome do Evento *</label>
              <input placeholder="Ex: Congresso Nacional de Medicina 2025" />

              <label>Mensagem *</label>
              <textarea
                placeholder="Digite a mensagem que será enviada via WhatsApp..."
                rows={6}
              />

              <div className="helper-text">
                Use quebras de linha para melhor formatação
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="card">
            <div className="card-header">
              <Filter size={18} />
              <div>
                <h2>Segmentação de Destinatários</h2>
                <span>
                  Selecione regiões e áreas acadêmicas para segmentar o envio
                </span>
              </div>
            </div>

            <div className="card-content">
              <strong>Regiões do Brasil</strong>

              <div className="region-grid">
                <div className="region-item">Sudeste <span>7.500 contatos</span></div>
                <div className="region-item">Sul <span>3.200 contatos</span></div>
                <div className="region-item">Nordeste <span>2.147 contatos</span></div>
                <div className="region-item">Centro-Oeste <span>1.800 contatos</span></div>
                <div className="region-item">Norte <span>1.200 contatos</span></div>
              </div>

              <strong>Áreas Acadêmicas</strong>
              <input placeholder="Digite para buscar área acadêmica..." />
            </div>
          </div>

          {/* CARD 3 */}
          <div className="card">
            <div className="card-header">
              <Calendar size={18} />
              <div>
                <h2>Agendamento (Opcional)</h2>
                <span>Agende o envio para uma data e hora específica</span>
              </div>
            </div>

            <div className="card-content">
              <label className="checkbox">
                <input type="checkbox" />
                Agendar envio para depois
              </label>
            </div>
          </div>

        </div>

        {/* COLUNA DIREITA */}
        <div className="campaign-right">
          <div className="card sticky">
            <h2>Resumo do Envio</h2>

            <div className="summary-box">
              <span>Total de Destinatários</span>
              <strong>0</strong>
            </div>

            <ul className="summary-list">
              <li>Nome do evento definido</li>
              <li>Mensagem escrita</li>
              <li>Destinatários selecionados</li>
            </ul>

            <div className="summary-footer">
              <button disabled>Revisar e Enviar</button>
              <small>Preencha todos os campos obrigatórios</small>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
