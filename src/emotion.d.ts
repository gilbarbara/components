import '@emotion/react';

import { Theme as BaseTheme } from './types';

declare module '@emotion/react' {
  export interface Theme extends BaseTheme {}
}
