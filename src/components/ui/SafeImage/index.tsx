import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

type SafeImageProps = Omit<ImageProps, 'src'> & {
  src?: string | null;
  fallbackSrc: string;
};

/**
 * 이미지 URL이 잘못되었거나, 로드를 실패한 경우 대체 이미지를 보여주는 컴포넌트
 */
export default function SafeImage({
  src,
  fallbackSrc,
  alt,
  ...rest
}: SafeImageProps) {
  const [currentImgSrc, setCurrentImgSrc] = useState<string>(
    isValidImageUrl(src) ? src : fallbackSrc
  );

  return (
    <Image
      {...rest}
      src={currentImgSrc}
      alt={alt}
      onError={() => setCurrentImgSrc(fallbackSrc)}
    />
  );
}

function isValidImageUrl(url: string | null | undefined): url is string {
  if (typeof url !== 'string') return false;

  if (url.trim() === '') return false;

  return (
    url.startsWith('/') ||
    url.startsWith('http://') ||
    url.startsWith('https://')
  );
}
