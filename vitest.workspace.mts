import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'vitest.config.mts',
  {
    extends: 'vite.config.mts',
    plugins: [storybookTest()],
    test: {
      name: 'components',
      browser: {
        enabled: true,
        headless: true,
        instances: [{ browser: 'chromium', name: 'stories' }],
        provider: 'playwright',
      },
      setupFiles: ['./.storybook/vitest.setup.ts'],
    },
  },
]);
