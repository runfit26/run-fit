import { useFormContext } from 'react-hook-form';
import { useUploadImage } from '@/api/mutations/imageMutations';
import { CoverImageUploader } from '@/components/ui/ImageUploader';
import { SessionCreateFormValues } from '../_others/schema';

interface ImageInputFieldProps {
  className?: string;
}

export default function ImageInputField({ className }: ImageInputFieldProps) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<SessionCreateFormValues>();

  const upload = useUploadImage();

  const handleFileChange = async (file: File | null) => {
    if (!file) {
      setValue('image', '', { shouldDirty: true, shouldValidate: true });
      return;
    }

    const { url } = await upload.mutateAsync(
      { file },
      {
        onError: () => {
          alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        },
      }
    );
    setValue('image', url, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <div>
      <CoverImageUploader
        className={className}
        label="세션 대표 이미지"
        maxSizeMB={10}
        onFileChange={handleFileChange}
      />
      <p className="error-message">{errors.image?.message}</p>
    </div>
  );
}
