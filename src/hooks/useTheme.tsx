import { useCallback } from 'react';
import { useTheme as useThemeEmotion } from '@emotion/react';

import { mergeTheme } from '~/modules/helpers';

export function useTheme() {
  const theme = mergeTheme(useThemeEmotion());
  const { dataAttributeName } = theme;

  const getDataAttributes = useCallback(
    (name: string) => {
      return {
        [`data-${dataAttributeName}`]: name,
      };
    },
    [dataAttributeName],
  );

  return { getDataAttributes, theme };
}
