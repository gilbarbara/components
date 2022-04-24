import * as React from 'react';
import { css } from '@emotion/react';
import { omit } from '@gilbarbara/helpers';
import { AnyObject, StringOrNumber } from '@gilbarbara/types';
import * as deepmerge from 'deepmerge';
import is from 'is-lite';
import { PartialDeep } from 'type-fest';

import { getColorScale, getGrayScale } from './colors';
import * as theme from './theme';

import {
  BaseProps,
  Breakpoints,
  MediaQueries,
  RecursiveChildrenMapOptions,
  ResponsiveInput,
  ResponsiveSizes,
  Shades,
  Theme,
  Variants,
} from '../types';

interface RecursiveElementFindOptions {
  property?: string;
  type: string;
}

const { black, breakpoints, white } = theme;

export function clearNumber(value = '') {
  return value.replace(/\D+/g, '');
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

/**
 * Get color from theme
 */
export function getColorVariant(
  variant: Variants,
  shade: Shades = 'mid',
  variants: Theme['variants'] = theme.variants,
) {
  try {
    switch (variant) {
      case 'black': {
        return { bg: black, color: white };
      }
      case 'white': {
        return { bg: white, color: black };
      }
      default: {
        return variants[variant][shade];
      }
    }
  } catch {
    return variants.primary.mid;
  }
}

export function getMediaQueries(): MediaQueries {
  return Object.keys(breakpoints)
    .filter(d => Number.isNaN(parseInt(d, 10)))
    .reduce((acc: AnyObject, d) => {
      acc[d] = `@media screen and (min-width: ${px(breakpoints[d as Breakpoints])})`;

      return acc;
    }, {}) as MediaQueries;
}

export function getTheme(props: BaseProps): Theme {
  return mergeTheme(props?.theme || {});
}

export function isCSSUnit(value: unknown): value is string {
  const units = ['em', 'px', 'rem', 'vh', 'vmax', 'vmin', 'vw'];
  const regex = new RegExp(`\\d+(${units.join('|')})$`);

  return typeof value === 'string' && regex.test(value);
}

export function mergeTheme(customTheme: PartialDeep<Theme> = {}): Theme {
  const nextTheme = deepmerge(theme, customTheme, {
    arrayMerge: (destination: any[], source: any[]) => source,
  }) as Theme;

  const { gray, grayDark, grayDarker, grayDarkest, grayLight, grayLighter, grayLightest } =
    nextTheme;

  const baseVariants = Object.entries({ ...nextTheme.colors, gray: nextTheme.gray })
    .filter(([key]) => !['black', 'white'].includes(key))
    .reduce((acc, [key, value]) => {
      acc[key as keyof Theme['variants']] =
        key === 'gray'
          ? getGrayScale(
              grayLightest,
              grayLighter,
              grayLight,
              gray,
              grayDark,
              grayDarker,
              grayDarkest,
            )
          : getColorScale(value);

      return acc;
    }, {} as Theme['variants']);

  return {
    ...nextTheme,
    variants: deepmerge(baseVariants, customTheme.variants || {}) as Theme['variants'],
  };
}

export function px(value: StringOrNumber): string {
  return is.number(value) || is.numericString(value) ? `${value}px` : value || '0px';
}

export function recursiveElementFind(
  element: React.ReactElement,
  options: RecursiveElementFindOptions,
): string | null {
  const { children } = element.props;
  const { property, type } = options;

  const getValue = (input: React.ReactElement) => {
    const props = input.props as any;

    if (input.type === type) {
      if (property) {
        return props?.[property] || null;
      }

      return props.children || '';
    }

    return input;
  };

  if (is.array(children)) {
    for (const child of children) {
      const childrenElement =
        child.props?.children?.type === type ? child.props.children : undefined;
      const selectedElement = child.type === type ? child : childrenElement;

      if (selectedElement) {
        return getValue(selectedElement);
      }

      if (is.array(child.props.children)) {
        return recursiveElementFind(child, options);
      }
    }
  } else if (React.isValidElement(children)) {
    return getValue(children);
  }

  return null;
}

export function recursiveChildrenMap(
  children: React.ReactNode,
  props: AnyObject,
  options: RecursiveChildrenMapOptions = {},
): React.ReactNode {
  const { filter, overrideProps } = options;

  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }

    const nextProps = overrideProps ? props : omit(props, ...Object.keys(child.props));

    if (child.props.children) {
      let childProps = {
        children: is.function(child.props.children)
          ? child.props.children
          : recursiveChildrenMap(child.props.children, nextProps, options),
      };

      if (filter && child.type === filter) {
        childProps = { ...childProps, ...nextProps };
      }

      return React.cloneElement(child, childProps);
    }

    if (filter && child.type !== filter) {
      return child;
    }

    return React.cloneElement(child, nextProps);
  });
}

/**
 * SC Helper to generate responsive media queries1
 */
export function responsive(rules: ResponsiveInput) {
  const entries: AnyObject = {};
  const mediaQueries = getMediaQueries();

  for (const rule in rules) {
    /* istanbul ignore else */
    if ({}.hasOwnProperty.call(rules, rule)) {
      const breakpoint = rule as ResponsiveSizes;
      const styles = rules[rule];
      const query = createMediaQuery(breakpoint, mediaQueries);

      if (breakpoint === '_') {
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
