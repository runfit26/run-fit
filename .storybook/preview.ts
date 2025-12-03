import type { Preview } from '@storybook/nextjs-vite';
import '@app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        default: { name: 'default', value: '#0F1014' },
        light: { name: 'light', value: '#FFFFFF' },
        dark: { name: 'dark', value: '#000000' },
      },
    },
  },

  initialGlobals: {
    backgrounds: { value: 'default' },
  },
};

export default preview;
