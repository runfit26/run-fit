'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { sessionQueries } from '@/api/queries/sessionQueries';
import KakaoMap from '@/components/session/KakaoMap';
import Badge, { LevelBadge, PaceBadge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import TimeSlider from '@/components/ui/TimeSlider';
import UserAvatar from '@/components/ui/UserAvatar';
import { Level } from '@/types';

export default function Page() {
  const { id } = useParams();
  // const {
  //   data: session,
  //   error,
  //   isLoading,
  // } = useQuery(sessionQueries.detail(Number(id)));

  const { data, error, isLoading } = {
    data: {
      id: 1,
      crewId: 1,
      hostUserId: 3,
      name: '여의도에서 잠실로 변경',
      description: '변경되었습니다',
      image:
        'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      city: '서울',
      district: '영등포구',
      coords: {
        lat: 37.5267,
        lng: 126.9347,
      },
      sessionAt: '2025-12-17T09:39:44.324',
      registerBy: '2025-12-16T09:39:44.324',
      level: 'BEGINNER',
      status: 'CLOSED',
      pace: 360,
      maxParticipantCount: 40,
      currentParticipantCount: 2,
      liked: false,
      createdAt: '2025-12-15T18:55:20.314495',
    },
    error: false,
    isLoading: false,
  };

  const participants = [
    {
      userId: 2,
      name: '김철수',
      profileImage: null,
      role: 'MEMBER',
      joinedAt: '2025-12-15T23:07:29.253478',
    },
    {
      userId: 4,
      name: '김길동',
      profileImage:
        'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      role: 'MEMBER',
      joinedAt: '2025-12-15T23:52:19.581889',
    },
  ];

  const {
    name,
    description,
    image,
    city,
    district,
    coords,
    sessionAt,
    registerBy,
    level,
    status,
    pace,
    maxParticipantCount,
    currentParticipantCount,
    createdAt,
    liked,
  } = data;

  const crew = {
    id: 0,
    name: '크루짱',
    description: '엄청난 크루',
    city: '서울',
    image: 'string',
    createdAt: '2025-12-16T07:28:11.912Z',
  };

  const review = {
    id: 0,
    sessionId: 0,
    sessionName: '엄청난 세션',
    crewId: 0,
    userId: 0,
    userName: '하이',
    userImage: 'string',
    description: '와 대박',
    ranks: 0,
    image: 'string',
    createdAt: '2025-12-16T07:30:41.004Z',
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {(error as Error).message}</div>;
  // }

  return (
    <main className="h-main flex flex-col items-center">
      <Image src={image} alt={name} height={200} width={300} />
      <div className="rounded-t-[20px]">
        <div>
          <Badge variant="dday" size="sm">
            {registerBy}
          </Badge>
          <h1>{name}</h1>
          <div>{sessionAt}</div>
          <PaceBadge size="sm" pace={pace} />
          <LevelBadge size="sm" level={level as Level} />
        </div>
        <ProgressBar
          value={currentParticipantCount}
          max={maxParticipantCount}
        />
        <div>
          <h2>세션 소개</h2>
          {description}
        </div>
        <div>
          <h2>일정</h2>
          <ul>
            <li>모임 일시: {sessionAt}</li>
            <li>모집 일정: {registerBy}</li>
          </ul>
        </div>
        <div>
          <h2>장소</h2>
          <KakaoMap coords={coords} address="city" />
        </div>
        <div>
          <h2>참여 멤버 {participants.length}</h2>
          {participants.map((participant) => (
            <div key={participant.userId}>
              <div>{participant.name}</div>
              <UserAvatar src={participant.profileImage} className="size-12" />
              <Badge size="sm" variant="dday">
                {participant.role}
              </Badge>
              {/* {participant.introduction} */}
            </div>
          ))}
          <Button variant="neutral" size="sm" className="w-full">
            더보기
          </Button>
        </div>
        <div>
          <div>
            <Image
              src={
                'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              alt={crew.name}
              height={200}
              width={300}
            />
            {crew.name}
            {crew.city}
            {/* {crew.membersCount}
          {crew.description} */}
          </div>
          <div>
            {review.ranks} {review.description}
          </div>
        </div>
      </div>
    </main>
  );
}
