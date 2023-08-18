import { PlainObject } from '@gilbarbara/types';
import { desaturate, hex2hsl, hsl2hex, saturate } from 'colorizr';

import type { ColorTone } from '~/types';

const LIGHTNESS_MAP = [95, 90, 80, 70, 60, 50, 40, 30, 20, 10];
const SATURATION_MAP = [32, 16, 8, 4, 0, 0, 4, 8, 16, 32];

export function generatePalette(baseColor: string, monochromatic = false) {
  const hsl = hex2hsl(baseColor);

  const lightnessGoal = hsl.l;
  const closestLightness = LIGHTNESS_MAP.reduce((previous, current) =>
    Math.abs(current - lightnessGoal) < Math.abs(previous - lightnessGoal) ? current : previous,
  );
  const baseColorIndex = LIGHTNESS_MAP.findIndex(l => l === closestLightness);

  return LIGHTNESS_MAP.reduce<PlainObject<string>>((acc, l, index) => {
    const color = hsl2hex({ ...hsl, l });
    const key = `${index === 0 ? 50 : index * 100}`;

    if (monochromatic) {
      acc[key] = color;
    } else {
      const saturationDelta = SATURATION_MAP[index] - SATURATION_MAP[baseColorIndex];

      acc[key] =
        saturationDelta >= 0
          ? saturate(color, saturationDelta)
          : desaturate(color, saturationDelta * -1);
    }

    return acc;
  }, {}) as Record<ColorTone, string>;
}
