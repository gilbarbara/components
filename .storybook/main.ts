import type { StorybookConfig } from '@storybook/react-vite';

import { variants } from '../src/modules/theme';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../src/components/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-coverage',
      options: {
        istanbul: {
          include: ['src/**/*.tsx'],
          exclude: ['**/*.test.ts?x', '**/*.snap'],
        },
      },
    },
  ],
  docs: {
    autodocs: true,
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  managerHead: head => `
    ${head}
    <style>
      #storybook-explorer-menu [data-nodetype="root"] [data-action="collapse-root"] {
        color: ${variants.primary['600']};
        width: 100%;
      }

      #storybook-explorer-menu [data-nodetype="root"] [data-action="collapse-root"][aria-expanded="true"] {
        background-color: ${variants.primary['100']};
      }
      
      [data-selected='true'] {
        background-color: ${variants.primary['400']} !important;
       }
    </style>
  `,
  staticDirs: ['./public'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
