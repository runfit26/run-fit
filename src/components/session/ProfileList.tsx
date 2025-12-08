import Avatar from '../ui/Avatar';

interface ProfileListProps {
  participants: Array<{
    id: string;
    name: string;
    image: string;
  }>;
}

export default function ProfileList({ participants }: ProfileListProps) {
  const images = [
    'https://github.com/shadcn.png',
    'https://github.com/maxleiter.png',
    'https://github.com/evilrabbit.png',
  ];
  // const maxVisible = 3;
  // const size = '16';

  // const visibleImages = images.slice(0, maxVisible);
  // const remainingCount = images.length - maxVisible;

  // const sizeClasses = {
  //   '16': 'size-4',
  //   '24': 'size-6',
  //   '40': 'size-10',
  //   '48': 'size-12',
  // };

  return (
    <div className="tablet:*:size-6 flex -space-x-1 *:size-4 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-gray-900">
      {participants.map((participant) => (
        <Avatar key={participant.id} title={participant.name}>
          <Avatar.Image src={participant.image} alt={participant.name} />
          <Avatar.Fallback>{participant.name.slice(0, 2)}</Avatar.Fallback>
        </Avatar>
      ))}
      {images.map((image, i) => (
        <Avatar key={i} title="this">
          <Avatar.Image src={image} alt="@shadcn" />
          <Avatar.Fallback>CN</Avatar.Fallback>
        </Avatar>
      ))}
    </div>
  );
}
