'use client';

import React from 'react';
import stackReducer from '@/lib/stackReducer';
import ModalContainer from './ModalContainer';

export type Modal = {
  id: string;
  render: () => React.ReactNode;
};

interface ModalActions {
  open: (id: string, render: () => React.ReactNode) => void;
  close: () => void;
}

const ModalActionsContext = React.createContext<ModalActions | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modals, dispatch] = React.useReducer(stackReducer<Modal>, []);

  const open = React.useCallback(
    (id: string, render: () => React.ReactNode) => {
      dispatch({ type: 'PUSH', item: { id, render } });
    },
    []
  );

  const close = React.useCallback(() => {
    dispatch({ type: 'POP' });
  }, []);

  return (
    <ModalActionsContext.Provider value={{ open, close }}>
      {children}
      <ModalContainer modals={modals} />
    </ModalActionsContext.Provider>
  );
}

export function useModal() {
  const ctx = React.useContext(ModalActionsContext);
  if (!ctx) throw new Error('useModal must be used within a ModalProvider');
  return ctx;
}
