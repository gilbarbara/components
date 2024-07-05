import react from '@vitejs/plugin-react-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  test: {
    coverage: {
      all: true,
      include: ['src/hooks/**/*.ts?(x)', 'src/modules/**/*.ts?(x)'],
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'json'],
      thresholds: {
        statements: 90,
        branches: 80,
        functions: 90,
        lines: 90,
      },
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['@testing-library/react/dont-cleanup-after-each', './src/tests/vitest.setup.ts'],
  },
});
