'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { crewQueries } from '@/api/queries/crewQueries';
import SafeImage from '@/components/ui/SafeImage';
import { generateNextImageSizes } from '@/lib/Image';
import { Crew } from '@/types';

interface CrewInfoProps {
  crewId: Crew['id'];
}

export default function CrewInfo({ crewId }: CrewInfoProps) {
  const { data: crew } = useSuspenseQuery({
    ...crewQueries.detail(Number(crewId)),
  });

  return (
    <Link href={`/crews/${crewId}`} className="flex items-center gap-3">
      <div className="tablet:aspect-84/56 tablet:w-[84px] relative aspect-66/44 w-[66px]">
        <SafeImage
          src={crew.image}
          alt={`${crew.name} 크루 이미지`}
          fallbackSrc="/assets/crew-default.png"
          className="rounded-lg object-cover"
          fill
          sizes={generateNextImageSizes({
            mobile: '66px',
            tablet: '84px',
          })}
        />
      </div>
      <div>
        <div className="text-caption-semibold tablet:text-body2-semibold mb-0.5">
          {crew.name}
        </div>
        <div className="text-caption-regular tablet:text-body3-regular text-gray-300">
          {`${crew.city} • 멤버 ${crew.memberCount}명`}
        </div>
      </div>
    </Link>
  );
}
