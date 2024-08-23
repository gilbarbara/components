import { create } from '@storybook/theming';

import { colors, variants } from '../src/modules/theme';

export default create({
  base: 'light',

  appBg: variants.primary['50'],
  barSelectedColor: colors.primary,

  colorPrimary: colors.primary,
  colorSecondary: '#101010',

  fontBase: 'Rubik, sans-serif',
  fontCode: 'monospace',

  brandTitle: 'components',
  brandUrl: 'https://github.com/gilbarbara/components',
  brandImage: 'https://files.gilbarbara.dev/logos/components.svg',
});
