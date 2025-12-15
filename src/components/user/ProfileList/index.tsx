import UserAvatar from '@/components/ui/UserAvatar';
import { cn } from '@/lib/utils';
import { CrewMember } from '@/types';

interface ProfileListProps {
  data: CrewMember[];
  className?: React.ComponentProps<'div'>;
}

export default function ProfileList({
  data: profiles,
  className,
}: ProfileListProps) {
  return (
    <div
      className={cn(
        'tablet:*:size-6 flex -space-x-1 *:size-4 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-gray-900',
        className
      )}
    >
      {profiles.slice(0, 3).map((profile) => (
        <UserAvatar
          key={profile.userId}
          src={profile.profileImage}
          alt={profile.name}
        />
      ))}
    </div>
  );
}
