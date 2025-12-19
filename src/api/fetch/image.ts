import { SuccessResponse } from '@/types';

export type getPresignedUrlRequest = {
  imageName: string; // ex) 'cover.png', 'review.jpg'
};

export type getPresignedUrlResponse = {
  presignedUrl: string; // PUT 요청을 통해 이미지를 업로드할 주소
  imageUrl: string; // 이미지 업로드 이후 이미지 사용을 위한 public URL
};

export async function getPresignedUrl(body: getPresignedUrlRequest) {
  const response = await fetch(`/api/images/presigned-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: SuccessResponse<getPresignedUrlResponse> =
    await response.json();
  return data;
}

type UploadToPresignedUrlParams = {
  uploadUrl: string;
  file: File | Blob;
  contentType?: string;
};

export async function uploadToPresignedUrl({
  uploadUrl,
  file,
  contentType,
}: UploadToPresignedUrlParams) {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type':
        contentType ??
        (file instanceof File ? file.type : 'application/octet-stream'),
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error('이미지 업로드에 실패했습니다.');
  }

  const etag = response.headers.get('ETag');
  const status = response.status;

  return { etag, status };
}
