import type { StorybookConfig } from '@storybook/react-vite';
import { variants } from '../src/modules/theme';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../src/components/**/*.stories.@(ts|tsx)'],
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
      #storybook-explorer-menu [data-nodetype="root"] button[aria-expanded="true"],
      #storybook-explorer-menu [data-nodetype="root"] button:focus,
      #storybook-explorer-menu [data-nodetype="root"] a[data-selected]:hover {
        background-color: #fff;
        color: ${variants.primary['400']};
      }
      
      [data-selected='true'] {
        background-color: ${variants.primary['400']} !important;
       }
    </style>
  `,
  staticDirs: ['./public'],
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;
