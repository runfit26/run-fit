import { cn } from '@/lib/utils';

export default function FakeTextInputField({ location }: { location: string }) {
  return (
    <div
      className={cn(location ? 'flex flex-col items-start gap-2' : 'hidden')}
    >
      <label className="text-body3-semibold text-gray-50">장소</label>
      <input
        disabled
        value={location}
        className="text-body2-medium w-full rounded-xl bg-gray-800 px-4 py-2 text-white"
      />
    </div>
  );
}
