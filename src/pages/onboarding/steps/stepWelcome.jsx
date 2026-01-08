import React, { useState } from 'react';
import { MessageSquare, CheckCircle2, ChevronRight } from 'lucide-react';

export default function StepWelcome({ onNext, onSkip }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        
        {/* LADO ESQUERDO: VISUAL */}
        <div style={styles.visualSide}>
          <div style={styles.iconBox}>
            <MessageSquare size={48} color="#ffffff" />
          </div>
          <p style={styles.stepText}>PASSO 1 DE 7</p>
          <div style={styles.dotsRow}>
            <div style={styles.activeDot}></div>
            {[...Array(6)].map((_, i) => <div key={i} style={styles.dot}></div>)}
          </div>
        </div>

        {/* LADO DIREITO: CONTEÚDO TOTALMENTE RECUPERADO */}
        <div style={styles.contentSide}>
          <header style={styles.header}>
            <div style={styles.logoCircle}>MC</div>
            <div style={{ textAlign: 'left' }}>
              <h4 style={styles.brandName}>Mensagens Cooperativa</h4>
              <p style={styles.brandSub}>Comunicação Acadêmica</p>
            </div>
          </header>

          <div style={styles.body}>
            <h1 style={styles.title}>Bem-vindo!</h1>
            <p style={styles.subtitle}>Sua plataforma completa para comunicação via WhatsApp</p>
            
            <p style={styles.descriptionText}>
              Envie mensagens individuais sobre eventos acadêmicos regionais e nacionais para contatos de pós-graduação em todo o Brasil de forma organizada e profissional.
            </p>
            
            <div style={styles.list}>
              {/* ITEM 1 */}
              <div style={styles.listItem}>
                <CheckCircle2 color="#10b981" size={18} style={{ flexShrink: 0, marginTop: '3px' }} />
                <div style={{ textAlign: 'left' }}>
                  <h4 style={styles.itemTitle}>Envios Individuais</h4>
                  <p style={styles.itemDesc}>Mensagens personalizadas para cada contato.</p>
                </div>
              </div>
              
              {/* ITEM 2 */}
              <div style={styles.listItem}>
                <CheckCircle2 color="#10b981" size={18} style={{ flexShrink: 0, marginTop: '3px' }} />
                <div style={{ textAlign: 'left' }}>
                  <h4 style={styles.itemTitle}>Segmentação Avançada</h4>
                  <p style={styles.itemDesc}>Filtros por região e área acadêmica.</p>
                </div>
              </div>

              {/* ITEM 3: RECUPERADO AQUI */}
              <div style={styles.listItem}>
                <CheckCircle2 color="#10b981" size={18} style={{ flexShrink: 0, marginTop: '3px' }} />
                <div style={{ textAlign: 'left' }}>
                  <h4 style={styles.itemTitle}>Dashboard Completo</h4>
                  <p style={styles.itemDesc}>Estatísticas e métricas em tempo real.</p>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.footer}>
            <button 
              onClick={onSkip}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                ...styles.btnSkip,
                border: isHovered ? '1px solid #cbd5e0' : '1px solid transparent',
                backgroundColor: isHovered ? '#f7fafc' : 'transparent',
              }}
            >
              PULAR TUTORIAL
            </button>

            <button onClick={onNext} style={styles.btnNext}>
              PRÓXIMO <ChevronRight size={18} color="#ffffff" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 },
  container: { width: '1000px', height: '620px', backgroundColor: '#ffffff', display: 'flex', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' },
  visualSide: { width: '40%', background: 'linear-gradient(135deg, #005a96 0%, #003366 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  iconBox: { background: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '22px', border: '1px solid rgba(255, 255, 255, 0.2)', marginBottom: '10px' },
  stepText: { fontWeight: '700', fontSize: '13px', margin: '10px 0', color: '#ffffff' },
  dotsRow: { display: 'flex', gap: '8px' },
  dot: { width: '8px', height: '8px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '50%' },
  activeDot: { width: '24px', height: '8px', backgroundColor: '#ffffff', borderRadius: '10px' },
  contentSide: { width: '60%', padding: '35px 60px', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' },
  header: { display: 'flex', alignItems: 'center', marginBottom: '20px' },
  logoCircle: { width: '40px', height: '40px', backgroundColor: '#004a7c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: '800', marginRight: '15px' },
  brandName: { margin: 0, fontWeight: '800', color: '#1a202c', fontSize: '15px' },
  brandSub: { margin: 0, fontSize: '11px', color: '#718096' },
  body: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  title: { fontSize: '26px', fontWeight: '800', color: '#1a202c', margin: '0 0 5px 0', textAlign: 'left' },
  subtitle: { color: '#007bff', fontWeight: '700', fontSize: '14px', margin: '0 0 12px 0', textAlign: 'left' },
  descriptionText: { fontSize: '13px', color: '#4a5568', lineHeight: '1.4', margin: '0 0 20px 0', textAlign: 'left' },
  list: { display: 'flex', flexDirection: 'column', gap: '15px' },
  listItem: { display: 'flex', gap: '12px' },
  itemTitle: { margin: '0 0 1px 0', color: '#2d3748', fontSize: '14px', fontWeight: '700' },
  itemDesc: { margin: 0, fontSize: '12px', color: '#718096' },
  footer: { marginTop: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  btnSkip: { background: 'transparent', padding: '8px 16px', borderRadius: '8px', fontWeight: '800', fontSize: '12px', cursor: 'pointer', transition: '0.2s', color: '#718096' },
  btnNext: { background: '#004a7c', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }
};