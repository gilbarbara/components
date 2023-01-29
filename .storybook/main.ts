import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-a11y', '@storybook/addon-storysource'],
  docs: {
    autodocs: true
  },
  framework: {
    name: '@storybook/react-vite',
    options: {}
  }
}

export default config;
