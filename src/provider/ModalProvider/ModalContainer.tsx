'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { useModal } from '.';
import type { Modal } from '.';

const MODAL_CONTAINER_ID = 'modal-container';

const getModalZIndex = (index: number) => {
  return 50 + index * 10;
};

export default function ModalContainer({ modals }: { modals: Modal[] }) {
  const { close } = useModal();

  useEffect(() => {
    if (document.getElementById(MODAL_CONTAINER_ID)) return;

    const modalDOM = document.createElement('div');
    modalDOM.id = MODAL_CONTAINER_ID;
    document.body.appendChild(modalDOM);

    return () => {
      document.body.removeChild(modalDOM);
    };
  }, []);

  const el =
    typeof window !== 'undefined'
      ? document.getElementById(MODAL_CONTAINER_ID)
      : null;

  if (!el || modals.length === 0) return null;

  const topModalIndex = modals.length - 1;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/50"
        style={{ zIndex: getModalZIndex(topModalIndex) }}
        onClick={close}
      />
      {modals.map((m, idx) => {
        const isTop = idx === topModalIndex;
        return (
          <div
            key={m.id}
            className={cn(
              'fixed inset-0 flex items-center justify-center',
              isTop || 'pointer-events-none'
            )}
            style={{ zIndex: getModalZIndex(idx) }}
          >
            {m.render()}
          </div>
        );
      })}
    </>,
    el
  );
}
