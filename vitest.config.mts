import react from '@vitejs/plugin-react-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  test: {
    name: 'modules',
    coverage: {
      all: true,
      include: ['src/**/*.ts?(x)'],
      exclude: [
        ...configDefaults.exclude,
        'src/**/*.stories.tsx',
        'src/**/*.test.ts?(x)',
        'src/**/*.d.ts',
        'src/tests/**/*',
        'src/types/**/*',
      ],
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'json'],
      thresholds: {
        statements: 90,
        branches: 75,
        functions: 90,
        lines: 90,
      },
    },
    environment: 'jsdom',
    globals: true,
    // TODO: Remove this after Storybook fixes the issue with @emotion/react
    onConsoleLog(message) {
      let shouldLog = true;

      if (
        message.includes('You are loading @emotion/react when it is already loaded.') ||
        message.includes('You are using Testing Library')
      ) {
        shouldLog = false;
      }

      return shouldLog;
    },
    setupFiles: ['@testing-library/react/dont-cleanup-after-each', './tests/vitest.setup.ts'],
  },
});
