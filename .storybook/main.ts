import type { StorybookConfig } from '@storybook/nextjs-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {
      image: {},
    },
  },
  staticDirs: ['../public'],
  viteFinal: (config) => {
    config?.plugins?.push(svgr());
    return config;
  },
};
export default config;
