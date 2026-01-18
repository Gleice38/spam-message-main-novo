import React, { useState } from 'react';
import { X, Check, Copy, ShieldCheck } from 'lucide-react';
import './TwoFactorModal.css';
import { toast } from '../../hooks/useToast';

export default function TwoFactorModal({ isOpen, onClose, onEnable }) {
  const [step, setStep] = useState(1); // 1: Intro, 2: QR Code, 3: Verify
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCopyKey = () => {
    navigator.clipboard.writeText('JBSWY3DPEHPK3PXP');
    toast.success('Chave copiada!');
  };

  const handleVerify = () => {
    if (code.length !== 6) {
      toast.error('O código deve ter 6 dígitos');
      return;
    }
    
    setLoading(true);
    // Simulação de verificação com backend
    setTimeout(() => {
      setLoading(false);
      if (code === '123456') { // Código de teste
        onEnable();
        onClose();
        toast.success('Autenticação em 2 fatores ativada!');
      } else {
        toast.error('Código incorreto. Tente novamente.');
      }
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="modal-icon">
            <ShieldCheck size={32} />
          </div>
          <h2>Autenticação em Dois Fatores (2FA)</h2>
          <p>Proteja sua conta adicionando uma camada extra de segurança.</p>
        </div>

        <div className="modal-content">
          {step === 1 && (
            <div className="step-content">
              <p>
                A autenticação em dois fatores (2FA) aumenta a segurança da sua conta exigindo um código temporário gerado pelo seu celular, além da sua senha.
              </p>
              <div className="step-actions">
                <button className="btn-primary" onClick={() => setStep(2)}>
                  Começar Configuração
                </button>
                <button className="btn-secondary" onClick={onClose}>
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <p className="instruction">
                1. Baixe um app autenticador (Google Authenticator, Authy, etc).
                <br />
                2. Escaneie o QR Code abaixo:
              </p>
              
              <div className="qr-code-container">
                {/* Placeholder QR Code */}
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/MensagensCooperativa:admin@test.com?secret=JBSWY3DPEHPK3PXP&issuer=MensagensCooperativa" 
                  alt="QR Code" 
                />
              </div>

              <div className="manual-entry">
                <span>Ou digite a chave manualmente:</span>
                <div className="key-display">
                  <code>JBSWY3DPEHPK3PXP</code>
                  <button onClick={handleCopyKey} title="Copiar">
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              <div className="step-actions">
                <button className="btn-primary" onClick={() => setStep(3)}>
                  Próximo
                </button>
                <button className="btn-secondary" onClick={() => setStep(1)}>
                  Voltar
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <p className="instruction">
                Digite o código de 6 dígitos gerado pelo seu aplicativo para confirmar.
              </p>

              <div className="code-input-container">
                <input
                  type="text"
                  maxLength="6"
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  className="code-input"
                />
              </div>
              <small className="hint">Dica para teste: use 123456</small>

              <div className="step-actions">
                <button 
                  className="btn-primary" 
                  onClick={handleVerify}
                  disabled={loading || code.length !== 6}
                >
                  {loading ? 'Verificando...' : 'Verificar e Ativar'}
                </button>
                <button className="btn-secondary" onClick={() => setStep(2)} disabled={loading}>
                  Voltar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
