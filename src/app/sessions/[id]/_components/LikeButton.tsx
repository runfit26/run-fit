import { toast } from 'sonner';
import { useLikeSession } from '@/api/mutations/likeMutations';
import HeartFill from '@/assets/icons/heart-fill.svg?react';
import HeartOutline from '@/assets/icons/heart-outline.svg?react';

interface LikeButtonProps {
  liked: boolean;
  sessionId: number;
}

export default function LikeButton({ liked, sessionId }: LikeButtonProps) {
  const mutation = useLikeSession(sessionId);

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
        if (error.status === '401' || error.code === 'UNAUTHORIZED') {
          toast.error('로그인이 필요합니다.');
        }
      },
    });
  };

  return (
    <button onClick={handleClick}>
      {liked ? (
        <HeartFill className="text-brand-500 block size-7" />
      ) : (
        <HeartOutline className="block size-7 text-[#9CA3AF]" />
      )}
    </button>
  );
}
