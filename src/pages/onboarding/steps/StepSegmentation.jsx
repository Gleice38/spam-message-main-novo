import React from 'react';
import { Filter, ChevronRight, ChevronLeft } from 'lucide-react';

export default function StepSegmentation({ onNext, onPrev, onSkip }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        
        {/* LADO ESQUERDO: VISUAL AZUL */}
        <div style={styles.visualSide}>
          <div style={styles.circleTop}></div>
          <div style={styles.circleBottom}></div>

          <div style={styles.iconCard}>
            <div style={styles.iconCircle}>
              <Filter size={42} color="#ffffff" />
            </div>
          </div>
          
          <div style={styles.stepBadge}>Passo 3 de 7</div>
          
          <div style={styles.dotsRow}>
            {[...Array(7)].map((_, i) => (
              <div key={i} style={i === 2 ? styles.activeDot : styles.dot}></div>
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
            <h1 style={styles.title}>Segmentação Inteligente</h1>
            <h2 style={styles.subtitle}>Filtre destinatários com precisão</h2>
            
            <p style={styles.descriptionText}>
              Use filtros avançados para segmentar sua audiência por região (Norte, Sul, Sudeste, 
              Nordeste, Centro-Oeste) e áreas acadêmicas específicas. Envie mensagens relevantes para o público certo.
            </p>
          </div>

          <div style={styles.footer}>
            {/* Botão Pular Tutorial ajustado e funcional */}
            <button onClick={onSkip} style={styles.btnSkip}>
              Pular Tutorial
            </button>
            
            <div style={styles.navButtons}>
              <button onClick={onPrev} style={styles.btnPrev}>
                <ChevronLeft size={18} /> Anterior
              </button>
              <button onClick={onNext} style={styles.btnNext}>
                Próximo <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Frase posicionada FORA do card conforme protótipo */}
      <p style={styles.disclaimerOutside}>
        Você pode acessar este tutorial novamente nas Configurações
      </p>
    </div>
  );
}

const styles = {
  wrapper: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#f4f7f9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 9999 },
  container: { width: '950px', height: '580px', backgroundColor: '#ffffff', display: 'flex', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', marginBottom: '30px' },
  
  visualSide: { width: '42%', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  circleTop: { position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' },
  circleBottom: { position: 'absolute', bottom: '-80px', right: '-40px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' },
  
  iconCard: { width: '140px', height: '140px', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.2)', marginBottom: '30px', zIndex: 2 },
  iconCircle: { width: '85px', height: '85px', border: '3px solid #ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  stepBadge: { backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', padding: '8px 22px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '25px', zIndex: 2 },
  dotsRow: { display: 'flex', gap: '8px', zIndex: 2 },
  dot: { width: '8px', height: '8px', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '50%' },
  activeDot: { width: '30px', height: '8px', backgroundColor: '#ffffff', borderRadius: '10px' },

  contentSide: { width: '58%', padding: '50px 60px', display: 'flex', flexDirection: 'column', textAlign: 'left' },
  header: { display: 'flex', alignItems: 'center', marginBottom: '40px' },
  logoCircle: { width: '45px', height: '45px', backgroundColor: '#004a7c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: '800', marginRight: '15px' },
  brandName: { margin: 0, color: '#004a7c', fontSize: '18px', fontWeight: '700' },
  brandSub: { margin: 0, fontSize: '12px', color: '#718096' },
  
  body: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  title: { fontSize: '34px', fontWeight: '800', color: '#1a202c', marginBottom: '12px' },
  subtitle: { fontSize: '18px', color: '#3182ce', fontWeight: '600', marginBottom: '20px' },
  descriptionText: { fontSize: '15px', color: '#4a5568', lineHeight: '1.7', maxWidth: '480px' },

  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  btnSkip: { background: 'none', border: 'none', color: '#718096', cursor: 'pointer', fontSize: '14px', fontWeight: '500', padding: '10px 0' },
  navButtons: { display: 'flex', gap: '12px' },
  btnPrev: { border: '1px solid #e2e8f0', background: '#ffffff', padding: '12px 24px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#4a5568', fontWeight: '600' },
  btnNext: { background: '#004a7c', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' },
  
  disclaimerOutside: { fontSize: '13px', color: '#a0aec0', textAlign: 'center' }
};