import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useArgs } from 'storybook/preview-api';
import PaceSlider from './PaceSlider';

/**
 * PaceSlider 컴포넌트는 사용자가 달리기 페이스(분/킬로미터)를 조절할 수 있는 슬라이더입니다.
 * Default 스토리에서 슬라이더를 움직여볼 수 있습니다. (Interactive)
 */
const meta: Meta<typeof PaceSlider> = {
  title: 'UI/PaceSlider',
  component: PaceSlider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description: '현재 페이스 값 (초 단위 배열)',
      table: {
        category: 'State',
      },
    },
    min: {
      control: { type: 'number' },
      description: '최소값 (기본: 240)',
    },
    max: {
      control: { type: 'number' },
      description: '최대값 (기본: 600)',
    },
    step: {
      control: { type: 'number' },
      description: '증감 단위 (기본: 10)',
    },
    disabled: {
      control: 'boolean',
      description: '슬라이더 비활성화 여부',
    },
  },
  decorators: [
    (Story) => (
      <div className="flex w-[600px] items-center justify-center rounded-xl bg-black p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default (Controlled)
export const Default: Story = {
  args: {
    value: [420], // 초기값 (7분)
    min: 240,
    max: 600,
    step: 10,
    disabled: false,
    defaultValue: [420],
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const onValueChange = (newValue: number[]) => {
      updateArgs({ value: newValue });
      args.onValueChange?.(newValue);
    };

    return <PaceSlider {...args} value={value} onValueChange={onValueChange} />;
  },
};
