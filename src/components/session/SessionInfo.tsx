import Image from 'next/image';
import { formatTimeInKorean } from '@/lib/time';

interface SessionInfPropsProps {
  // eslint-disable-next-line
  data: any; // Session;
}

export default function SessionInfo({ data }: SessionInfPropsProps) {
  const sessionAt = new Date(data.sessionAt);
  const sessionDate = `${sessionAt.getFullYear()}년 ${sessionAt.getMonth()}월 ${sessionAt.getDay()}일`;
  const sessionTime = formatTimeInKorean(
    sessionAt.getHours(),
    sessionAt.getMinutes()
  );

  return (
    <div className="flex w-full gap-2 rounded-xl bg-gray-700 p-2">
      <div className="relative aspect-video w-16 rounded-lg">
        <Image
          src="/session.local.jpg"
          alt="Crew"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-end">
        <div className="text-caption-semibold text-gray-50">{data.name}</div>
        <div className="text-caption-regular text-gray-300">
          {`${sessionDate} • ${sessionTime}`}
        </div>
      </div>
    </div>
  );
}
