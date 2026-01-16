import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import './Toast.css';

export function Toast({ message, type = 'info', onClose, duration = 4000 }) {
  const icons = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    warning: <AlertCircle size={20} />,
    info: <Info size={20} />
  };

  // Auto-close após duration
  if (duration > 0) {
    setTimeout(() => {
      onClose?.();
    }, duration);
  }

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">{icons[type]}</div>
      <span className="toast-message">{message}</span>
      {onClose && (
        <button className="toast-close" onClick={onClose} aria-label="Fechar">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
