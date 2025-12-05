import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Image from 'next/image';
import LevelIcon from '../../assets/icons/level.svg?icon';
import Badge, { DdayBadge, LevelBadge, PaceBadge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['level', 'pace', 'dday'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};
export default meta;

export const Default: StoryObj<typeof Badge> = {
  args: {
    children: 'Badge',
  },
};

// SVG가 포함된 LevelBadge 스토리 임시로 주석처리.
export const Level: StoryObj<typeof LevelBadge> = {
  render: (args) => {
    const iconSize = {
      sm: 'size-3',
      md: 'size-3',
      lg: 'size-4',
    };
    const color = {
      easy: '--color-gray-200',
      medium: '--color-[#F2B48A]',
      hard: '--color-[#FF819E]',
    };
    const text = {
      easy: '초급',
      medium: '중급',
      hard: '고급',
    };
    return (
      <Badge variant="level" {...args}>
        <Image
          src={LevelIcon}
          alt="Level Icon"
          className={`${iconSize[args.size]}`}
          style={{ color: `var(${color[args.level]})` }}
        />
        <span className={`text-[var(${color[args.level]})]`}>
          {text[args.level]}
        </span>
      </Badge>
    );
  },
  args: {
    level: 'easy',
  },
  argTypes: {
    level: {
      control: { type: 'select' },
      options: ['easy', 'medium', 'hard'],
    },
  },
};

export const Pace: StoryObj<typeof PaceBadge> = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <PaceBadge {...args} size="sm" />
      <PaceBadge {...args} size="md" />
      <PaceBadge {...args} size="lg" />
    </div>
  ),
  args: {
    pace: 300,
  },
  argTypes: {
    pace: {
      control: { type: 'number' },
    },
  },
};

export const Dday: StoryObj<typeof DdayBadge> = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <DdayBadge {...args} size="sm" />
      <DdayBadge {...args} size="md" />
      <DdayBadge {...args} size="lg" />
    </div>
  ),
  args: {
    children: 'D-day',
  },
};
