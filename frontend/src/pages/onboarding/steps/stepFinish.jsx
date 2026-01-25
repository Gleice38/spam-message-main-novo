import React from 'react';
import { Check, Shield, ChevronLeft, CheckCircle } from 'lucide-react';

export default function StepFinish({ onFinish, onPrev }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        
        {/* LADO ESQUERDO: VISUAL VERDE (Passo 7) */}
        <div style={styles.visualSide}>
          <div style={styles.circleTop}></div>
          <div style={styles.circleBottom}></div>

          <div style={styles.iconCard}>
            <div style={styles.iconCircle}>
              <Check size={42} color="#ffffff" strokeWidth={3} />
            </div>
          </div>
          
          <div style={styles.stepBadge}>Passo 7 de 7</div>
          
          <div style={styles.dotsRow}>
            {[...Array(7)].map((_, i) => (
              <div key={i} style={i === 6 ? styles.activeDot : styles.dot}></div>
            ))}
          </div>
        </div>

        {/* LADO DIREITO: CONTEÚDO */}
        <div style={styles.contentSide}>
          <header style={styles.header}>
            <div style={styles.logoCircle}>MC</div>
            <div style={{ textAlign: 'left' }}>
              <h4 style={styles.brandName}>Mensagens Cooperativa</h4>
              <p style={styles.brandSub}>Comunicação Acadêmica</p>
            </div>
          </header>

          <div style={styles.body}>
            <h1 style={styles.title}>Tudo Pronto!</h1>
            <h2 style={styles.subtitle}>Comece a usar agora</h2>
            
            <p style={styles.descriptionText}>
              Você está pronto para começar! Explore o dashboard, cadastre seus contatos 
              e crie sua primeira campanha de comunicação acadêmica.
            </p>

            {/* CAIXA DE SEGURANÇA CONFORME PROTÓTIPO */}
            <div style={styles.securityBox}>
              <div style={styles.securityHeader}>
                <Shield size={18} color="#3182ce" />
                <strong style={styles.securityTitle}>Segurança e Privacidade</strong>
              </div>
              <p style={styles.securityText}>
                Este sistema não é destinado à coleta de dados sensíveis ou PII (Informações Pessoais Identificáveis). 
                Mantenha a segurança dos seus contatos.
              </p>
            </div>
          </div>

          <div style={{
            ...styles.footer,
            flexDirection: window.innerWidth <= 700 ? 'column' : 'row',
            gap: window.innerWidth <= 700 ? 8 : 0,
            alignItems: window.innerWidth <= 700 ? 'stretch' : 'center',
          }}>
            <div />
            <div style={{
              ...styles.navButtons,
              flexDirection: window.innerWidth <= 700 ? 'column' : 'row',
              width: window.innerWidth <= 700 ? '100%' : undefined,
              gap: window.innerWidth <= 700 ? 8 : 12
            }}>
              <button onClick={onPrev} style={{
                ...styles.btnPrev,
                width: window.innerWidth <= 700 ? '100%' : undefined
              }}>
                <ChevronLeft size={18} /> Anterior
              </button>
              <button onClick={onFinish} style={{
                ...styles.btnFinish,
                width: window.innerWidth <= 700 ? '100%' : undefined
              }}>
                <CheckCircle size={18} /> Começar
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Texto de rodapé externo ao container */}
      <p style={styles.disclaimerOutside}>
        Você pode acessar este tutorial novamente nas Configurações
      </p>
    </div>
  );
}

const styles = {
  wrapper: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#f4f7f9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 9999 },
  container: { width: '100%', maxWidth: '98vw', minWidth: 0, height: 'auto', minHeight: 320, backgroundColor: '#ffffff', display: 'flex', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', marginBottom: '30px', flexDirection: 'row', boxSizing: 'border-box' },
  
  // Gradiente Verde conforme o protótipo do passo 7
  visualSide: { width: '42%', minWidth: 0, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  circleTop: { position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' },
  circleBottom: { position: 'absolute', bottom: '-80px', right: '-40px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' },
  
  iconCard: { width: '140px', height: '140px', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.2)', marginBottom: '30px', zIndex: 2 },
  iconCircle: { width: '85px', height: '85px', border: '3px solid #ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  stepBadge: { backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', padding: '8px 22px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '25px', zIndex: 2 },
  dotsRow: { display: 'flex', gap: '8px', zIndex: 2 },
  dot: { width: '8px', height: '8px', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '50%' },
  activeDot: { width: '30px', height: '8px', backgroundColor: '#ffffff', borderRadius: '10px' },

  contentSide: { width: '58%', minWidth: 0, padding: '24px 4vw', display: 'flex', flexDirection: 'column', textAlign: 'left', position: 'relative', boxSizing: 'border-box' },
  header: { display: 'flex', alignItems: 'center', marginBottom: '30px' },
  logoCircle: { width: '45px', height: '45px', backgroundColor: '#004a7c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: '800', marginRight: '15px' },
  brandName: { margin: 0, color: '#004a7c', fontSize: '18px', fontWeight: '700' },
  brandSub: { margin: 0, fontSize: '12px', color: '#718096' },
  
  body: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  title: { fontSize: '34px', fontWeight: '800', color: '#1a202c', marginBottom: '8px' },
  subtitle: { fontSize: '18px', color: '#3182ce', fontWeight: '600', marginBottom: '15px' },
  descriptionText: { fontSize: '15px', color: '#4a5568', lineHeight: '1.6', maxWidth: '480px', marginBottom: '25px' },

  securityBox: { backgroundColor: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: '12px', padding: '16px', maxWidth: '480px' },
  securityHeader: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' },
  securityTitle: { color: '#0369a1', fontSize: '14px', fontWeight: '700' },
  securityText: { margin: 0, fontSize: '12px', color: '#0c4a6e', lineHeight: '1.5' },

  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  navButtons: { display: 'flex', gap: '12px' },
  btnPrev: { border: '1px solid #e2e8f0', background: '#ffffff', padding: '12px 24px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#4a5568', fontWeight: '600' },
  btnFinish: { background: '#004a7c', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' },
  
  disclaimerOutside: { fontSize: '13px', color: '#a0aec0', textAlign: 'center' }
};