import React from 'react';
import { Database, ChevronLeft, ChevronRight } from 'lucide-react';

export default function StepSegmentation({ onNext, onPrev, onSkip }) {
  return (
    /* Este container agora usa posicionamento fixo para ignorar o "onboarding-wrapper" quebrado */
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      width: '900px',
      height: '550px',
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
      fontFamily: 'sans-serif',
      zIndex: 9999
    }}>
      
      {/* LADO ESQUERDO: AZUL */}
      <div style={{
        flex: '0 0 400px',
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{
          width: '90px', height: '90px', backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'
        }}>
          <Database size={44} color="#ffffff" strokeWidth={1.5} />
        </div>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', marginBottom: '25px' }}>
          Passo 2 de 7
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[...Array(7)].map((_, i) => (
            <div key={i} style={{ width: i === 1 ? '24px' : '8px', height: '8px', backgroundColor: i === 1 ? 'white' : 'rgba(255, 255, 255, 0.4)', borderRadius: '4px' }} />
          ))}
        </div>
      </div>

      {/* LADO DIREITO: TEXTO DO FIGMA */}
      <div style={{ flex: 1, padding: '50px', display: 'flex', flexDirection: 'column', backgroundColor: 'white', textAlign: 'left' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#003366', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' }}>MC</div>
          <div style={{textAlign: 'left'}}>
            <h3 style={{ margin: 0, fontSize: '14px', color: '#1a202c' }}>Mensagens Cooperativa</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#718096' }}>Comunicação Acadêmica</p>
          </div>
        </header>

        <main style={{ flex: 1 }}>
          <h1 style={{ fontSize: '28px', color: '#1a202c', fontWeight: 'bold', margin: '0 0 8px 0' }}>Gerencie seus Contatos</h1>
          <h2 style={{ fontSize: '18px', color: '#3b82f6', fontWeight: '500', margin: '0 0 20px 0' }}>Organize contatos por região e área acadêmica</h2>
          <p style={{ fontSize: '15px', color: '#4a5568', lineHeight: '1.6', margin: 0 }}>
            Cadastre e gerencie contatos organizados por Estado, Cidade, Campus Universitário, Faculdade e Área Acadêmica. Mantenha sua base de dados sempre atualizada.
          </p>
        </main>

        <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <button onClick={onSkip} style={{ background: 'none', border: 'none', color: '#718096', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}>
            Pular Tutorial
          </button>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={onPrev} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'white', border: '1px solid #e2e8f0', padding: '10px 20px', borderRadius: '8px', color: '#4a5568', fontWeight: '600', cursor: 'pointer' }}>
              <ChevronLeft size={18} /> Anterior
            </button>
            <button onClick={onNext} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#003366', border: 'none', padding: '10px 24px', borderRadius: '8px', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
              Próximo <ChevronRight size={18} />
            </button>
          </div>
        </footer>
        
        <p style={{ position: 'absolute', bottom: '15px', left: 0, right: 0, textAlign: 'center', fontSize: '11px', color: '#a0aec0', margin: 0 }}>
          Você pode acessar este tutorial novamente nas Configurações
        </p>
      </div>
    </div>
  );
}