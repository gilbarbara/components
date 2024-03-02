import { addons } from '@storybook/manager-api';

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
