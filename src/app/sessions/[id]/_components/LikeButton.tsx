'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { useLikeSession } from '@/api/mutations/likeMutations';
import HeartFill from '@/assets/icons/heart-fill.svg?react';
import HeartOutline from '@/assets/icons/heart-outline.svg?react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

interface LikeButtonProps {
  liked: boolean;
  sessionId: number;
}

export default function LikeButton({ liked, sessionId }: LikeButtonProps) {
  const { handleClick, isLoginModalOpen, setIsLoginModalOpen } = useLikeButton({
    liked,
    sessionId,
  });

  return (
    <>
      <button onClick={handleClick}>
        {liked ? (
          <HeartFill className="text-brand-500 block size-7" />
        ) : (
          <HeartOutline className="block size-7 text-[#9CA3AF]" />
        )}
      </button>

      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
    </>
  );
}

export const useLikeButton = ({
  liked,
  sessionId,
}: {
  liked: boolean;
  sessionId: number;
}) => {
  const mutation = useLikeSession(sessionId);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleClick = () => {
    mutation.mutate(liked, {
      onSuccess: () => {
        toast.success(
          liked
            ? '찜한 세션에서 제외되었습니다.'
            : '찜한 세션에 추가되었습니다.'
        );
      },

      onError: (error) => {
        const status = error.status;
        const code = error.code;
        const message = error.message;

        if (status === '401' || code === 'UNAUTHORIZED') {
          setIsLoginModalOpen(true);
          return;
        }

        if (code === 'ALREADY_LIKED_SESSION') {
          toast.error(message || '이미 찜한 세션입니다.');
          return;
        }

        if (code === 'SESSION_LIKE_NOT_FOUND') {
          toast.error(message || '찜한 세션을 찾을 수 없습니다.');
          return;
        }

        toast.error(
          '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        );
      },
    });
  };

  return { handleClick, isLoginModalOpen, setIsLoginModalOpen };
};

export function LoginModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  return (
    <Modal open={isOpen}>
      <Modal.Content className="flex h-[200px] w-[360px] flex-col gap-7">
        <Modal.Title />
        <Modal.CloseButton onClick={() => setIsOpen(false)} />
        <Modal.Description>
          세션을 찜하려면 로그인이 필요해요!
        </Modal.Description>
        <Modal.Footer>
          <Modal.Close asChild>
            <Button asChild>
              <Link href={`/signin`}>로그인하러 가기</Link>
            </Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
