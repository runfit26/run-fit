import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLikeSession, postLikeSession } from '@/lib/api/fetch/sessions';
import { sessionQueries } from '@/lib/api/queries/sessionQueries';
import { userQueries } from '@/lib/api/queries/userQueries';

// 세션 찜/취소
export function useLikeSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionId,
      liked,
    }: {
      sessionId: number;
      liked: boolean;
    }) => (liked ? deleteLikeSession(sessionId) : postLikeSession(sessionId)),

    onMutate: async ({ sessionId, liked }) => {
      await queryClient.cancelQueries({
        queryKey: sessionQueries.detail(sessionId).queryKey,
      });
      const previousSessionData = queryClient.getQueryData(
        sessionQueries.detail(sessionId).queryKey
      );

      if (previousSessionData) {
        queryClient.setQueryData(
          sessionQueries.detail(sessionId).queryKey,
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              liked: !liked,
            };
          }
        );
      }

      return { previousSessionData };
    },

    onError: (_err, variables, context) => {
      const sessionId = variables.sessionId;
      if (context?.previousSessionData) {
        queryClient.setQueryData(
          sessionQueries.detail(sessionId).queryKey,
          context.previousSessionData
        );
      }
    },

    onSettled: (_response, _error, variables) => {
      const sessionId = variables.sessionId;

      queryClient.invalidateQueries({
        queryKey: sessionQueries.detail(sessionId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: sessionQueries.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: userQueries.me.likeAll(),
      });
    },
  });
}
