'use client';

import Profile from 'assets/icons/profile.svg';
import { cx } from 'class-variance-authority';
import Image from 'next/image';
import { useState } from 'react';

interface UserAvatarProps {
  src?: string | null;
  alt?: string;
  className?: string;
}

export default function UserAvatar({
  src,
  alt = '사용자 프로필',
  className,
}: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = isValidImageUrl(src) && !imageError;

  return (
    <div
      className={cx(
        'relative size-10 overflow-hidden rounded-full bg-gray-200',
        className
      )}
      role="img"
      aria-label={alt}
    >
      {showImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <Profile />
      )}
    </div>
  );
}

function isValidImageUrl(url: string | null | undefined): url is string {
  if (!url || typeof url !== 'string') return false;

  if (url.trim() === '') return false;

  return (
    url.startsWith('/') ||
    url.startsWith('http://') ||
    url.startsWith('https://')
  );
}
