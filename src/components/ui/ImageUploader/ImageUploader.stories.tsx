import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CoverImageUploader from './CoverImageUploader';
import ReviewImageUploader from './ReviewImageUploader';

/**
 * ImageUploader 컴포넌트는 사용자가 이미지를 업로드할 수 있는 UI를 제공합니다.
 * CoverImageUploader와 ReviewImageUploader 두 가지 변형이 있습니다.
 */
const meta: Meta = {
  title: 'UI/ImageUploader',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const CoverImage: Story = {
  render: () => <CoverImageUploader />,
};

export const ReviewImage: Story = {
  render: () => <ReviewImageUploader />,
};
