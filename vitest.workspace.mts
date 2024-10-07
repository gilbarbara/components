import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'vitest.config.mts',
  {
    extends: 'vite.config.mts',
    plugins: [
      // See options at: https://storybook.js.org/docs/writing-tests/vitest-plugin#storybooktest
      storybookTest(),
    ],
    test: {
      name: 'components',
      browser: {
        enabled: true,
        headless: true,
        name: 'chromium',
        provider: 'playwright',
      },
      include: ['**/*.stories.ts?(x)'],
      setupFiles: ['./.storybook/vitest.setup.ts'],
    },
  },
]);
