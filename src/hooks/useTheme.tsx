import { useCallback, useRef } from 'react';
import { useTheme as useThemeEmotion } from '@emotion/react';
import deepEqual from '@gilbarbara/deep-equal';

import { mergeTheme } from '~/modules/helpers';

import { Theme } from '~/types';

let storedEmotionTheme: Theme;
let storedTheme: Theme;

export type UseThemeReturn = ReturnType<typeof useTheme>;

export function useTheme() {
  const emotionTheme = useThemeEmotion();
  const needsUpdate = !storedTheme || !deepEqual(storedEmotionTheme, emotionTheme);
  const nextTheme = useRef<Theme>(storedTheme ?? emotionTheme);

  if (needsUpdate) {
    storedEmotionTheme = emotionTheme;
    nextTheme.current = mergeTheme(emotionTheme);
    storedTheme = nextTheme.current;
  }

  const { dataAttributeName } = nextTheme.current;

  const getDataAttributes = useCallback(
    (name: string) => {
      return {
        [`data-${dataAttributeName}`]: name,
      };
    },
    [dataAttributeName],
  );

  return { getDataAttributes, theme: nextTheme.current };
}
