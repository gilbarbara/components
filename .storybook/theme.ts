import { create } from '@storybook/theming';

import { variants } from '../src/modules/theme';

export default create({
  base: 'light',

  appBg: variants.primary['50'],
  barSelectedColor: variants.primary['500'],

  colorPrimary: variants.primary['500'],
  colorSecondary: '#101010',

  fontBase: 'Rubik, sans-serif',
  fontCode: 'monospace',

  brandTitle: 'components',
  brandUrl: 'https://github.com/gilbarbara/components',
  brandImage: 'https://files.gilbarbara.dev/logos/components.svg',
});
