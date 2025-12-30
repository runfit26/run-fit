import { useMutation } from '@tanstack/react-query';
import { getPresignedUrl, uploadToPresignedUrl } from '@/lib/api/fetch/image';

export function useUploadImage() {
  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const { presignedUrl, imageUrl } = await getPresignedUrl({
        imageName: file.name,
      });
      await uploadToPresignedUrl({ uploadUrl: presignedUrl, file });
      return { url: imageUrl };
    },
  });
}
