import type { StorybookConfig } from '@storybook/react-vite';

import { colors } from '../src/modules/theme';

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
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  managerHead: head => `
    ${head}
    <style>
      #storybook-explorer-menu [data-nodetype="root"] [data-action="collapse-root"] {
        color: ${colors.primary};
        width: 100%;
      }

      #storybook-explorer-menu [data-nodetype="root"] [data-action="collapse-root"][aria-expanded="true"] {
        font-size: 14px;
      }
      
      [data-selected='true'] {
        background-color: ${colors.primary} !important;
       }
    </style>
  `,
  staticDirs: ['./public'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
