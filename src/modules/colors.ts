import { rangeLimit } from '@gilbarbara/helpers';
import { hex2hsl, hsl2hex, textColor } from 'colorizr';

export function getColorScale(color: string) {
  const { h, l, s } = hex2hsl(color);

  const lightest = hsl2hex({ h, s, l: rangeLimit(l * 1.9, 92, 96) });
  const lighter = hsl2hex({ h, s, l: rangeLimit(l * 1.6, 82, 92) });
  const light = hsl2hex({ h, s, l: rangeLimit(l * 1.4, 64, 72) });
  const dark = hsl2hex({ h, s, l: rangeLimit(l * 0.7, 32) });
  const darker = hsl2hex({ h, s, l: rangeLimit(l * 0.45, 16) });
  const darkest = hsl2hex({ h, s, l: rangeLimit(l * 0.3, 8) });

  return {
    lightest: { bg: lightest, color: textColor(lightest) },
    lighter: { bg: lighter, color: textColor(lighter) },
    light: { bg: light, color: textColor(light) },
    mid: { bg: color, color: textColor(color) },
    dark: { bg: dark, color: textColor(dark) },
    darker: { bg: darker, color: textColor(darker) },
    darkest: { bg: darkest, color: textColor(darkest) },
  };
}

export function getGrayScale(
  lightest: string,
  lighter: string,
  light: string,
  mid: string,
  dark: string,
  darker: string,
  darkest: string,
) {
  return {
    lightest: { bg: lightest, color: textColor(lightest) },
    lighter: { bg: lighter, color: textColor(lighter) },
    light: { bg: light, color: textColor(light) },
    mid: { bg: mid, color: textColor(mid) },
    dark: { bg: dark, color: textColor(dark) },
    darker: { bg: darker, color: textColor(darker) },
    darkest: { bg: darkest, color: textColor(darkest) },
  };
}
