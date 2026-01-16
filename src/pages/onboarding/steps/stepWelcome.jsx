import React, { useState } from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

export default function StepWelcome({ onNext, onSkip }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        
        {/* LADO ESQUERDO: VISUAL AZUL */}
        <div style={styles.visualSide}>
          <div style={styles.circleTop}></div>
          <div style={styles.circleBottom}></div>
          <div style={styles.iconCard}>
            <div style={styles.iconCircle}>
              <div style={styles.chatIconBase}>
                <div style={styles.chatIconTail}></div>
              </div>
            </div>
          </div>
          <div style={styles.stepBadge}>Passo 1 de 7</div>
          <div style={styles.dotsRow}>
            <div style={styles.activeDot}></div>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={styles.dot}></div>
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
            <h1 style={styles.title}>Bem-vindo ao Mensagens Cooperativa!</h1>
            <h2 style={styles.subtitle}>Sua plataforma completa para comunicação acadêmica via WhatsApp</h2>
            
            <p style={styles.descriptionText}>
              Envie mensagens individuais sobre eventos acadêmicos regionais e nacionais para contatos de pós-graduação em todo o Brasil de forma organizada e profissional.
            </p>

            {/* LISTA COMPACTADA PARA NÃO EMPURRAR O RODAPÉ */}
            <div style={styles.list}>
              <div style={styles.listItem}>
                <CheckCircle2 size={18} color="#10b981" />
                <div>
                  <h4 style={styles.itemTitle}>Envios Individuais</h4>
                  <p style={styles.itemDesc}>Mensagens personalizadas para cada contato.</p>
                </div>
              </div>
              <div style={styles.listItem}>
                <CheckCircle2 size={18} color="#10b981" />
                <div>
                  <h4 style={styles.itemTitle}>Segmentação Avançada</h4>
                  <p style={styles.itemDesc}>Filtros por região e área acadêmica.</p>
                </div>
              </div>
              <div style={styles.listItem}>
                <CheckCircle2 size={18} color="#10b981" />
                <div>
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
                color: isHovered ? '#2d3748' : '#718096', 
                backgroundColor: isHovered ? '#f1f5f9' : 'transparent',
              }}
            >
              Pular Tutorial
            </button>
            
            <button onClick={onNext} style={styles.btnNext}>
              Próximo <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <p style={styles.disclaimerOutside}>
        Você pode acessar este tutorial novamente nas Configurações
      </p>
    </div>
  );
}

const styles = {
  wrapper: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#f4f7f9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 9999 },
  container: { width: '950px', height: '580px', backgroundColor: '#ffffff', display: 'flex', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', marginBottom: '30px' },
  visualSide: { width: '42%', background: 'linear-gradient(135deg, #005a96 0%, #003e6b 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  circleTop: { position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' },
  circleBottom: { position: 'absolute', bottom: '-80px', right: '-40px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' },
  iconCard: { width: '140px', height: '140px', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.2)', marginBottom: '30px', zIndex: 2 },
  iconCircle: { width: '85px', height: '85px', border: '3px solid #ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  chatIconBase: { width: '38px', height: '28px', border: '3px solid #ffffff', borderRadius: '6px', position: 'relative' },
  chatIconTail: { position: 'absolute', bottom: '-10px', left: '6px', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid #ffffff' },
  stepBadge: { backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', padding: '8px 22px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '25px', zIndex: 2 },
  dotsRow: { display: 'flex', gap: '8px', zIndex: 2 },
  dot: { width: '8px', height: '8px', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '50%' },
  activeDot: { width: '30px', height: '8px', backgroundColor: '#ffffff', borderRadius: '10px' },
  
  contentSide: { width: '58%', padding: '40px 60px', display: 'flex', flexDirection: 'column', textAlign: 'left', position: 'relative' },
  header: { display: 'flex', alignItems: 'center', marginBottom: '20px' },
  logoCircle: { width: '45px', height: '45px', backgroundColor: '#004a7c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: '800', marginRight: '15px' },
  brandName: { margin: 0, color: '#004a7c', fontSize: '18px', fontWeight: '700' },
  brandSub: { margin: 0, fontSize: '12px', color: '#647286' },
  
  body: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' },
  title: { fontSize: '30px', fontWeight: '800', color: '#1a202c', marginBottom: '8px', lineHeight: '1.2' },
  subtitle: { fontSize: '17px', color: '#3182ce', fontWeight: '600', marginBottom: '12px' },
  descriptionText: { fontSize: '14px', color: '#414a5a', lineHeight: '1.4', marginBottom: '20px' },
  
  // AQUI: Reduzi o GAP para os itens ficarem mais próximos e não empurrarem o footer
  list: { display: 'flex', flexDirection: 'column', gap: '14px' }, 
  listItem: { display: 'flex', gap: '12px', alignItems: 'flex-start' },
  itemTitle: { margin: 0, fontSize: '14px', fontWeight: '700', color: '#2d3748' },
  itemDesc: { margin: 0, fontSize: '12px', color: '#718096' },

  // AQUI: Ajuste fixo no rodapé para ele não descer mais
  footer: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 'auto', 
    paddingTop: '20px',
    paddingBottom: '5px' 
  },
  btnSkip: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600', padding: '10px 20px', borderRadius: '10px', transition: 'all 0.2s ease', marginLeft: '-20px' },
  btnNext: { background: '#004a7c', color: '#ffffff', border: 'none', padding: '12px 32px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '15px' },
  disclaimerOutside: { fontSize: '13px', color: '#a0aec0', textAlign: 'center' }
};