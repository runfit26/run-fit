'use client';

import { mockSessions } from '@/mocks/data';
import SessionInfo from '../session/SessionInfo';
import Avatar from '../ui/Avatar';
import Rating from '../ui/Rating';

interface ReviewCardProps {
  // eslint-disable-next-line
  data: any; // Review;
}

export default function ReviewCard({ data }: ReviewCardProps) {
  // const { status, data: sessions, error } = useSessionList(); // tanstack-query hook

  const createdAt = new Date(data.createdAt);
  const createdAtText = `${createdAt.getFullYear()}.${createdAt.getMonth()}.${createdAt.getDay()}`;
  return (
    <li className="flex flex-col gap-2">
      <Rating value={data.ranks} disabled onChange={() => {}} />
      <div className="text-body3-regular">{data.description}</div>
      <div className="*:text-caption-regular flex items-center gap-2 *:text-gray-300">
        <Avatar>
          <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
          <Avatar.Fallback>CN</Avatar.Fallback>
        </Avatar>
        <div>럽윈즈올</div>
        <div>|</div>
        <div>{createdAtText}</div>
      </div>
      <SessionInfo data={mockSessions[0]} />
    </li>
  );
}
