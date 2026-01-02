import UserAvatar from '@/components/ui/UserAvatar';
import type { CrewMember } from '@/types';

interface ProfileListProps {
  members: CrewMember[];
  memberCount: number;
}

export default function ProfileList({
  members,
  memberCount,
}: ProfileListProps) {
  return (
    <div className="flex items-center -space-x-1">
      {members.slice(0, 3).map((member: CrewMember) => (
        <UserAvatar
          key={member.userId}
          alt={member.name}
          className="tablet:size-6 size-4 data-[slot=avatar]:ring-1 data-[slot=avatar]:ring-gray-900"
          src={member.profileImage || '/assets/profile-default.png'}
        />
      ))}
      {memberCount > 3 ? (
        <span className="text-caption-regular tablet:text-body3-regular bg-gray-750 tablet:size-6 z-1 flex size-4 items-center justify-center rounded-full">
          +{memberCount - 3}
        </span>
      ) : null}
    </div>
  );
}
