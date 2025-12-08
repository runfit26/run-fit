import Image from 'next/image';

// interface SessionCardProps {
//   data: Session;
// }

// export default function SessionCard({ data }: SessionCardProps) {
export default function SessionInfo() {
  return (
    <div className="flex w-full gap-2 rounded-xl bg-gray-700 p-2">
      <div className="relative w-16 rounded-lg bg-blue-300">
        <Image
          src="/session.local.jpg"
          alt="Crew"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col">
        <div className="text-caption-semibold text-gray-50">
          상쾌한 한강 아침 러닝
        </div>
        <div className="text-caption-regular text-gray-300">
          2025년 12월 25일 • 오전 7:00
        </div>
      </div>
    </div>
  );
}
