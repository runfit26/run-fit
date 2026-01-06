import SessionFilterBarSkeleton from '../SessionFilterBar/SessionFilterBarSkeleton';
import SessionListSkeleton from '../SessionList/SessionListSkeleton';

export default function SessionPageContentSkeleton() {
  return (
    <div className="flex w-full flex-col">
      <SessionFilterBarSkeleton />
      <SessionListSkeleton />
    </div>
  );
}
