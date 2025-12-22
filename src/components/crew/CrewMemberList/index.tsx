import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import UserAvatar from '@/components/ui/UserAvatar';
import { CrewMember } from '@/types';

function LeaderTag() {
  return (
    <Badge variant="none" size="md" className="bg-brand-900">
      <span className="text-brand-200 font-700 text-[10px] leading-none">
        크루장
      </span>
    </Badge>
  );
}
function StaffTag() {
  return (
    <Badge variant="none" size="md" className="bg-gray-700">
      <span className="font-700 text-[10px] leading-none text-gray-200">
        운영진
      </span>
    </Badge>
  );
}

function CrewMemberListItem({ member }: { member: CrewMember }) {
  return (
    <div className="mb-5 flex gap-3">
      <UserAvatar src={member.profileImage} className="size-10 shrink-0" />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <span className="text-body3-semibold">{member.name}</span>
          {member.role === 'STAFF' && <StaffTag />}
          {member.role === 'LEADER' && <LeaderTag />}
        </div>
        <span className="text-caption-regular line-clamp-1">
          {member.introduction || '안녕하세요:) 잘 부탁드립니다!'}
        </span>
      </div>
    </div>
  );
}
interface CrewMemberListProps {
  members: CrewMember[];
  crewInfo: React.ReactNode;
  children?: React.ReactNode;
}
export default function CrewMemberList({
  members,
  crewInfo,
  children,
}: CrewMemberListProps) {
  return (
    <div className="flex flex-col">
      {crewInfo}
      {children}
      <div className="flex flex-col">
        {members.slice(0, 4).map((member) => {
          return <CrewMemberListItem key={member.userId} member={member} />;
        })}
      </div>
      <Modal>
        <Modal.Trigger aria-label="멤버 전체보기" asChild>
          <Button variant="neutral" className="mt-8 w-full">
            멤버 전체보기
          </Button>
        </Modal.Trigger>
        <Modal.Content className="tablet:h-[620px] flex h-full w-[400px] flex-col bg-gray-800">
          <Modal.Title className="self-start">{crewInfo}</Modal.Title>
          <Modal.CloseButton />
          <div className="h-0 self-stretch outline-1 outline-offset-[-0.50px] outline-gray-700" />
          <Modal.Description className="flex flex-col overflow-y-scroll [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-800">
            {members.map((member) => {
              return <CrewMemberListItem key={member.userId} member={member} />;
            })}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
}
