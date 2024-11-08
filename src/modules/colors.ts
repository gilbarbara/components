import { objectKeys } from '@gilbarbara/helpers';
import { StringOrNull } from '@gilbarbara/types';
import {
  darken,
  hex2hsl,
  hsl2hex,
  lighten,
  parseCSS,
  textColor as contrastingColor,
} from 'colorizr';

import * as theme from '~/modules/theme';

import { Color, ColorTone, Theme } from '~/types';

export function getColorComplement(color: string) {
  const { l } = parseCSS(color, 'hsl');

  return l >= 90 ? darken(color, 10) : lighten(color, 10);
}

export function getColorWithTone(color: string, tone: ColorTone) {
  const hsl = hex2hsl(parseCSS(color, 'hex'));
  const lightness = 100 - parseInt(tone, 10) / 10;

  return hsl2hex({ ...hsl, l: lightness });
}

/**
 * Get color from theme
 */
export function getColorTokens(
  mainColor: string,
  textColor?: StringOrNull,
  { colors, variants }: Pick<Theme, 'colors' | 'variants'> = theme,
): { hoverColor: string; mainColor: string; textColor: string; variant?: Color } {
  try {
    const variantKeys = objectKeys(variants);

    const selectedTextColor =
      textColor && variantKeys.some(d => textColor.startsWith(d))
        ? getColorTokens(textColor, undefined, { colors, variants })?.mainColor
        : textColor;

    switch (mainColor) {
      case 'black': {
        return {
          mainColor: theme.black,
          textColor: selectedTextColor ?? theme.white,
          hoverColor: theme.grayScale['800'],
        };
      }
      case 'white': {
        return {
          mainColor: theme.white,
          textColor: selectedTextColor ?? theme.black,
          hoverColor: theme.grayScale['100'],
        };
      }
      case 'transparent': {
        return {
          mainColor: 'transparent',
          textColor: selectedTextColor ?? theme.black,
          hoverColor: 'transparent',
        };
      }
      default: {
        if (variantKeys.some(d => mainColor.startsWith(d))) {
          const [variant, tone] = mainColor.split('.') as [Color, ColorTone];

          const selectedMainColor = tone ? variants[variant][tone] : colors[variant];

          return {
            mainColor: selectedMainColor,
            textColor: selectedTextColor ?? contrastingColor(selectedMainColor),
            hoverColor: getColorComplement(selectedMainColor),
            variant,
          };
        }

        return {
          mainColor,
          textColor: selectedTextColor ?? contrastingColor(mainColor),
          hoverColor: getColorComplement(mainColor),
        };
      }
    }
  } catch {
    return {
      mainColor: colors.primary,
      textColor: contrastingColor(colors.primary),
      hoverColor: getColorComplement(colors.primary),
      variant: 'primary',
    };
  }
}
