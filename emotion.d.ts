import '@emotion/react';

import { Theme as BaseTheme } from './src/types';

declare module '@emotion/react' {
  export interface Theme extends BaseTheme {
    darkMode?: boolean;
  }
}
