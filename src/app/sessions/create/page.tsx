'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ShevronLeft from '@/assets/icons/chevron-left.svg?react';
import Button from '@/components/ui/Button';
import { useDaumPostcode } from '@/provider/DaumPostcodeProvider';
import DateInputField from './_components/DateInputField';
import DetailInputField from './_components/DetailInputField';
import FakeTextInputField from './_components/FakeTextInputField';
import ImageInputField from './_components/ImageInputField';
import LevelInputField from './_components/LevelInputField';
import MaxParticipantsInputField from './_components/MaxParticipantsInputField';
import NameInputField from './_components/NameInputField';
import PaceInputField from './_components/PaceInputField';
import RegisterByInputField from './_components/RegisterByInputField';
import SearchAddressButton from './_components/SearchAddressButton';

export default function Page() {
  return (
    <main className="h-main laptop:my-[50px] laptop:py-0 laptop:px-8 mx-auto flex max-w-[1120px] flex-col items-center p-6">
      <div className="mb-6 flex w-full items-center gap-2">
        <BackButton />
        <h1 className="text-body1-semibold laptop:text-title2-semibold">
          세션 생성하기
        </h1>
      </div>
      <SessionCreateForm />
    </main>
  );
}

export function BackButton() {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1) router.back();
    else router.replace('/sessions');
  };

  return (
    <ShevronLeft
      type="button"
      onClick={handleClick}
      className="size-6 hover:cursor-pointer"
    />
  );
}

function SessionCreateForm() {
  const date = new Date();
  const [location, setLocation] = useState('서울특별시 어쩌구');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const { openAddressSearch } = useDaumPostcode();

  return (
    <form className="laptop:flex-row laptop:gap-20 flex w-full flex-col">
      <div className="w-[380px]">
        <NameInputField />
        <ImageInputField />
        <div className="flex">
          <DateInputField date={date} />
        </div>
        <div className="flex flex-col gap-3">
          <FakeTextInputField location={location} />
          <SearchAddressButton
            location={location}
            onClick={() =>
              openAddressSearch((data) => {
                setLocation(data.address);
                setCity(data.sido);
                setDistrict(data.sigungu);
              })
            }
          />
        </div>
        <DetailInputField />
      </div>
      <div className="laptop:flex-1">
        <PaceInputField />
        <LevelInputField />
        <hr className="text-gray-500" />
        <MaxParticipantsInputField />
        <div className="flex">
          <RegisterByInputField date={date} />
        </div>
        <DetailInputField />
        <Button type="button" className="w-full" size="sm" disabled>
          생성하기
        </Button>
        <p>세션 생성 후에는 ‘이름/설명/이미지’만 수정할 수 있어요</p>
      </div>
    </form>
  );
}
