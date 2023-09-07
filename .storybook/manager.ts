import { addons } from '@storybook/addons';

import theme from './theme';

addons.setConfig({
  theme,
  sidebar: {
    filters: {
      hidden: item => {
        return !item.tags?.includes('hidden');
      },
    },
  },
});
