import React from 'react';
import { Rocket, CheckCircle2, ChevronRight } from 'lucide-react';

export default function StepFinish({ onFinish }) {
  return (
    <div className="onboarding-step">
      <div style={styles.wrapper}>
        <div style={styles.container}>

          {/* LADO ESQUERDO: VISUAL */}
          <div style={styles.visualSide}>
            <div style={styles.iconBox}>
              <Rocket size={48} color="#ffffff" />
            </div>

            <div className="progress-pill" style={styles.progressPill}>Passo 6 de 6</div>

            <div style={styles.dotsRow}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={i === 5 ? styles.activeDot : styles.dot}></div>
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
              <p style={styles.subtitle}>Comece a usar agora mesmo</p>

              <p style={styles.descriptionText}>
                Você está pronto para começar! Explore o dashboard, cadastre seus contatos e crie sua primeira campanha de comunicação.
              </p>

              <div style={styles.list}>
                <div style={styles.listItem}>
                  <CheckCircle2 color="#10b981" size={18} style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div style={{ textAlign: 'left' }}>
                    <h4 style={styles.itemTitle}>Acesso ao Dashboard</h4>
                    <p style={styles.itemDesc}>Visão geral de todas as funcionalidades.</p>
                  </div>
                </div>

                <div style={styles.listItem}>
                  <CheckCircle2 color="#10b981" size={18} style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div style={{ textAlign: 'left' }}>
                    <h4 style={styles.itemTitle}>Suporte Dedicado</h4>
                    <p style={styles.itemDesc}>Estamos aqui para ajudar você.</p>
                  </div>
                </div>

                <div className="info-box">
                  <strong>Segurança e Privacidade</strong>
                  <p>
                    Este sistema não é destinado à coleta de dados sensíveis ou PII. Mantenha a segurança dos seus contatos.
                  </p>
                </div>

              </div>

              <div className="step-actions" style={styles.footer}>
                <button className="btn-secondary" onClick={() => { localStorage.setItem('onboardingCompleted', 'true'); window.location.href = '/dashboard'; }}>Pular Tutorial</button>
                <div>
                  <button type="button" className="btn-secondary" onClick={() => window.history.back()} style={{ marginRight: 12 }}>Anterior</button>
                  <button type="button" className="btn-primary" onClick={onFinish}>Começar</button>
                </div>
              </div>

            </div>

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
  progressPill: { background: 'rgba(255,255,255,0.12)', color: '#ffffff', padding: '8px 18px', borderRadius: '999px', fontWeight: 700, marginTop: 12 },
  dotsRow: { display: 'flex', gap: '8px', marginTop: 14 },
  dot: { width: '8px', height: '8px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '50%' },
  activeDot: { width: '24px', height: '8px', backgroundColor: '#ffffff', borderRadius: '10px' },
  contentSide: { width: '60%', padding: '35px 60px', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' },
  header: { display: 'flex', alignItems: 'center', marginBottom: '10px' },
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
  footer: { marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
};
