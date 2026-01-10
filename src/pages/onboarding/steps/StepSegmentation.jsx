import React from 'react';
import { Database, ChevronLeft, ChevronRight } from 'lucide-react';

export default function StepSegmentation({ onNext, onPrev, onSkip }) {
  return (
    <div className="onboarding-step-container">
      <div className="step-visual-side">
        <div className="visual-icon-wrapper">
          <Database size={48} color="#ffffff" strokeWidth={1.5} />
        </div>
        
        <div className="step-badge">
          <span>Passo 2 de 7</span>
        </div>

        <div className="step-pagination-dots">
          <span className="dot"></span>
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>

      <div className="step-content-side">
        <header className="content-header">
          <div className="mini-logo">
            <div className="mini-circle">MC</div>
            <div className="mini-titles">
              <h3>Mensagens Cooperativa</h3>
              <p>Comunicação Acadêmica</p>
            </div>
          </div>
        </header>

        <main className="content-body">
          <h1 className="step-title">Gerencie seus Contatos</h1>
          <h2 className="step-subtitle">Organize contatos por região e área acadêmica</h2>
          
          <p className="step-description">
            Cadastre e gerencie contatos organizados por Estado, Cidade, 
            Campus Universitário, Faculdade e Área Acadêmica. Mantenha 
            sua base de dados sempre atualizada.
          </p>
        </main>

        <footer className="content-footer">
          <button className="btn-skip-tutorial" onClick={onSkip}>
            Pular Tutorial
          </button>

          <div className="nav-buttons-group">
            <button className="btn-prev-onboarding" onClick={onPrev}>
              <ChevronLeft size={18} />
              Anterior
            </button>
            
            <button className="btn-next-onboarding" onClick={onNext}>
              Próximo
              <ChevronRight size={18} />
            </button>
          </div>
        </footer>
        
        <p className="tutorial-reminder">
          Você pode acessar este tutorial novamente nas Configurações
        </p>
      </div>
    </div>
  );
}