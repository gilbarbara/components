import { Children, cloneElement, isValidElement, ReactElement, ReactNode } from 'react';
import { css } from '@emotion/react';
import { omit } from '@gilbarbara/helpers';
import { AnyObject, StringOrNumber } from '@gilbarbara/types';
import { deepmergeCustom, DeepMergeLeafURI } from 'deepmerge-ts';
import is from 'is-lite';
import { PartialDeep } from 'type-fest';

import { getColorScale, getGrayScale } from './colors';
import * as theme from './theme';

import {
  BaseProps,
  Breakpoints,
  GetElementPropertyOptions,
  MediaQueries,
  RecursiveChildrenEnhancerOptions,
  ResponsiveInput,
  ResponsiveSizes,
  Shades,
  Theme,
  Variants,
} from '../types';

const { black, breakpoints, white } = theme;

const deepmerge = deepmergeCustom<{
  DeepMergeArraysURI: DeepMergeLeafURI; // <-- Needed for correct output type.
}>({
  mergeArrays: false,
});

export function clearNumber(value: string) {
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

export function getElementProperty(
  element: ReactElement,
  options: GetElementPropertyOptions,
): string | null {
  const { children } = element.props;
  const { property, type } = options;

  const getValue = (input: ReactElement) => {
    const { props } = input;

    if (input.type === type) {
      if (property) {
        return props?.[property] || null;
      }

      return props.children || null;
    }

    return null;
  };

  for (const child of Children.toArray(children)) {
    if (!isValidElement(child)) {
      return getValue(element);
    }

    const childrenElement = child.props?.children?.type === type ? child.props.children : undefined;
    const selectedElement = child.type === type ? child : childrenElement;

    if (selectedElement) {
      return getValue(selectedElement);
    }

    if (is.array(child.props.children)) {
      return getElementProperty(child, options);
    }
  }

  return null;
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
  const nextTheme = deepmerge({ ...theme }, customTheme) as Theme;

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

export function px(value: StringOrNumber | undefined): string | undefined {
  return is.number(value) || is.numericString(value) ? `${value}px` : value;
}

export function recursiveChildrenEnhancer(
  children: ReactNode,
  props: AnyObject,
  options: RecursiveChildrenEnhancerOptions,
): ReactNode {
  const { componentType, overrideProps } = options;

  return Children.map(children, child => {
    if (!isValidElement(child)) {
      return child;
    }

    const nextProps = overrideProps ? props : omit(props, ...Object.keys(child.props));

    if (child.props.children) {
      let childProps = {
        children: is.function(child.props.children)
          ? child.props.children
          : recursiveChildrenEnhancer(child.props.children, nextProps, options),
      };

      if (child.type === componentType) {
        childProps = { ...childProps, ...nextProps };
      }

      return cloneElement(child, childProps);
    }

    if (child.type !== componentType) {
      return child;
    }

    return cloneElement(child, nextProps);
  });
}

/**
 * Helper to generate responsive media queries
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
