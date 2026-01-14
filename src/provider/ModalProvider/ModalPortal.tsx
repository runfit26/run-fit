'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalWrapper from './ModalWrapper';

const MODAL_CONTAINER_ID = 'modal-container';

/** 모달 스택에 저장되는 모달 정보 */
export type Modal = {
  id: string;
  render: () => React.ReactNode;
};

/** 개별 모달 내부에서 사용하는 Context 값 */
export interface ModalContextValue {
  /** aria-labelledby 연결용 ID */
  labelId: string;
  /** aria-describedby 연결용 ID */
  descriptionId: string;
  /** 현재 모달 닫기 */
  close: () => void;
}

interface ModalPortalProps {
  modals: Modal[];
  topModalId: string | null;
  close: () => void;
}

export default function ModalPortal({
  modals,
  close,
  topModalId,
}: ModalPortalProps) {
  useEffect(() => {
    if (document.getElementById(MODAL_CONTAINER_ID)) return;

    const modalDOM = document.createElement('div');
    modalDOM.id = MODAL_CONTAINER_ID;
    document.body.appendChild(modalDOM);

    return () => {
      document.body.removeChild(modalDOM);
    };
  }, []);

  const modalContainer =
    typeof window !== 'undefined'
      ? document.getElementById(MODAL_CONTAINER_ID)
      : null;

  if (!modalContainer) return null;

  return createPortal(
    <>
      {modals.map((modal) => (
        <ModalWrapper
          key={modal.id}
          modal={modal}
          isTop={modal.id === topModalId}
          close={close}
        />
      ))}
    </>,
    modalContainer
  );
}
