import { Meta } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import DatePicker from '.';

const meta: Meta = {
  title: 'ui/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
      description: '날짜를 선택하는 입력 필드입니다.',
    },
  },
};

export default meta;
type Story = Meta<typeof DatePicker>;

/**
 * 단일 선택 모드 DatePicker 컴포넌트 상태 예시
 */
export const Single: Story = {
  args: {
    mode: 'single',
    label: '모임 날짜',
    placeholder: '날짜를 선택하세요',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <DatePicker {...args} mode="single" value={date} onChange={setDate} />
    );
  },
};

/**
 * 범위 선택 모드 DatePicker 컴포넌트 상태 예시
 */
export const Range: Story = {
  args: {
    mode: 'range',
    label: '기간',
    placeholder: '기간을 선택하세요',
  },
  render: (args) => {
    const [range, setRange] = useState<DateRange | undefined>(undefined);
    return (
      <DatePicker {...args} mode="range" value={range} onChange={setRange} />
    );
  },
};
