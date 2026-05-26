import { createContext, useCallback, useContext, useState } from 'react';
import './Modal.css';

const ModalContext = createContext(null);

/**
 * In-app confirm/alert system. Returns Promise<boolean>.
 * Usage:
 *   const ok = await modal.confirm({ title, message, confirmText, danger });
 *   await modal.alert({ title, message });
 */
export function ModalProvider({ children }) {
  const [dialog, setDialog] = useState(null);

  const close = useCallback((result) => {
    setDialog((d) => {
      if (d?.resolve) d.resolve(result);
      return null;
    });
  }, []);

  const confirm = useCallback((opts = {}) => {
    return new Promise((resolve) => {
      setDialog({
        kind: 'confirm',
        title: opts.title || 'Are you sure?',
        message: opts.message || '',
        confirmText: opts.confirmText || 'Confirm',
        cancelText: opts.cancelText || 'Cancel',
        danger: !!opts.danger,
        resolve,
      });
    });
  }, []);

  const alert = useCallback((opts = {}) => {
    return new Promise((resolve) => {
      setDialog({
        kind: 'alert',
        title: opts.title || '',
        message: opts.message || '',
        confirmText: opts.confirmText || 'OK',
        resolve,
      });
    });
  }, []);

  return (
    <ModalContext.Provider value={{ confirm, alert }}>
      {children}
      {dialog && (
        <div className="modal-backdrop" onClick={() => close(false)} role="presentation">
          <div className="modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            {dialog.title && <h3 className="modal-title">{dialog.title}</h3>}
            {dialog.message && <p className="modal-message">{dialog.message}</p>}
            <div className="modal-actions">
              {dialog.kind === 'confirm' && (
                <button className="modal-btn modal-btn--ghost" onClick={() => close(false)}>
                  {dialog.cancelText}
                </button>
              )}
              <button
                className={`modal-btn ${dialog.danger ? 'modal-btn--danger' : 'modal-btn--primary'}`}
                onClick={() => close(true)}
                autoFocus
              >
                {dialog.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside ModalProvider');
  return ctx;
}
