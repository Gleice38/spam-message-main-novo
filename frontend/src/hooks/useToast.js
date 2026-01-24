import { useState, useCallback } from 'react';

let globalSetToasts = null;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  // Expor setToasts globalmente
  if (!globalSetToasts) {
    globalSetToasts = setToasts;
  }

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, duration };

    setToasts((prev) => [...prev, newToast]);

    // Auto-remove após duration
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const hideToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback((message, duration) => {
    return showToast(message, 'success', duration);
  }, [showToast]);

  const error = useCallback((message, duration) => {
    return showToast(message, 'error', duration);
  }, [showToast]);

  const warning = useCallback((message, duration) => {
    return showToast(message, 'warning', duration);
  }, [showToast]);

  const info = useCallback((message, duration) => {
    return showToast(message, 'info', duration);
  }, [showToast]);

  return {
    toasts,
    showToast,
    hideToast,
    success,
    error,
    warning,
    info
  };
}

// Helper global para uso fora de componentes React
export const toast = {
  success: (message, duration = 4000) => {
    if (globalSetToasts) {
      const id = Date.now() + Math.random();
      globalSetToasts((prev) => [...prev, { id, message, type: 'success', duration }]);
      if (duration > 0) {
        setTimeout(() => {
          globalSetToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
    }
  },
  error: (message, duration = 4000) => {
    if (globalSetToasts) {
      const id = Date.now() + Math.random();
      globalSetToasts((prev) => [...prev, { id, message, type: 'error', duration }]);
      if (duration > 0) {
        setTimeout(() => {
          globalSetToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
    }
  },
  warning: (message, duration = 4000) => {
    if (globalSetToasts) {
      const id = Date.now() + Math.random();
      globalSetToasts((prev) => [...prev, { id, message, type: 'warning', duration }]);
      if (duration > 0) {
        setTimeout(() => {
          globalSetToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
    }
  },
  info: (message, duration = 4000) => {
    if (globalSetToasts) {
      const id = Date.now() + Math.random();
      globalSetToasts((prev) => [...prev, { id, message, type: 'info', duration }]);
      if (duration > 0) {
        setTimeout(() => {
          globalSetToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
    }
  }
};
