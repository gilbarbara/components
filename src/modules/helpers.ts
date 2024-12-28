import { CSSProperties } from 'react';
import { css } from '@emotion/react';
import { canUseDOM, objectEntries, objectKeys, px } from '@gilbarbara/helpers';
import { PartialDeep, PlainObject } from '@gilbarbara/types';
import { swatch } from 'colorizr';
import { deepmergeCustom } from 'deepmerge-ts';
import is from 'is-lite';

import * as defaultTheme from '~/modules/theme';

import { MediaQueries, ResponsiveInput, ResponsiveSizes, Target, Theme } from '../types';

const { breakpoints } = defaultTheme;

const deepmerge = deepmergeCustom({
  mergeArrays: false,
});

export function clearNumber(value: string) {
  return value.replace(/\D+/g, '');
}

export function convertCamelCaseToKebabCase(string_: string): string {
  return string_.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}

export function convertKebabCaseToCamelCase(value: string) {
  return value.replace(/-./g, m => m[1].toUpperCase());
}

/**
 * Generate the media query
 */
export function createMediaQuery(size: ResponsiveSizes, mediaQueries: MediaQueries): string {
  if (isCSSUnit(size) || is.numericString(size)) {
    return `@media screen and (min-width: ${px(size)})`;
  }

  return mediaQueries[size];
}

export function formatBreakpoints(theme: Theme) {
  return Object.entries(theme.breakpoints).reduce<Record<string, number>>(
    (acc, [key, value]) => {
      acc[key] = parseInt(value, 10);

      return acc;
    },
    { _: 0 },
  );
}

export function getElement<T extends Element>(target: Target<T>) {
  if (!canUseDOM()) {
    return null;
  }

  let targetEl: Element | null;

  if (typeof target === 'string') {
    targetEl = document.querySelector(target);
  } else {
    targetEl = target && 'current' in target ? target.current : target;
  }

  return targetEl;
}

export function getMediaQueries(): MediaQueries {
  return objectKeys(breakpoints)
    .filter(d => Number.isNaN(parseInt(d, 10)))
    .reduce((acc: PlainObject, d) => {
      acc[d] = `@media screen and (min-width: ${px(breakpoints[d])})`;

      return acc;
    }, {}) as MediaQueries;
}

export function isCSSUnit(value: unknown): value is string {
  const units = ['em', 'px', 'rem', 'vh', 'vmax', 'vmin', 'vw'];
  const regex = new RegExp(`\\d+(${units.join('|')})$`);

  return typeof value === 'string' && regex.test(value);
}

export function mergeTheme(customTheme: PartialDeep<Theme> = {}): Theme {
  const nextTheme = deepmerge({ ...defaultTheme }, customTheme) as Theme;

  const baseVariants = objectEntries(nextTheme.colors).reduce(
    (acc, [key, value]) => {
      acc[key] = swatch(value, nextTheme.swatchOptions);

      return acc;
    },
    {} as Theme['variants'],
  );

  return {
    ...nextTheme,
    variants: deepmerge(baseVariants, customTheme.variants ?? {}) as Theme['variants'],
  };
}

/**
 * Helper to generate responsive media queries
 */
export function responsive(rules: ResponsiveInput) {
  const entries: PlainObject<any> = {};
  const mediaQueries = getMediaQueries();

  for (const rule in rules) {
    if ({}.hasOwnProperty.call(rules, rule)) {
      const styles = rules[rule];
      const query = createMediaQuery(rule, mediaQueries);

      if (rule === '_') {
        Object.entries(styles).forEach(([k, v]) => {
          entries[k] = v;
        });
      } else if (query) {
        entries[query] = styles;
      }
    }
  }

  return css(entries);
}

export function stringifyCSSProperties(style?: CSSProperties) {
  if (!style || !is.plainObject(style)) {
    return '';
  }

  return objectKeys(style as CSSProperties).reduce((accumulator, key) => {
    // transform the key from camelCase to kebab-case
    const cssKey = convertCamelCaseToKebabCase(key);
    // remove ' in value
    const cssValue = is.string(style[key]) ? px(style[key].replace("'", '')) : style[key];

    // build the result
    // you can break the line, add indent for it if you need
    return `${accumulator}${cssKey}:${cssValue};`;
  }, '');
}
