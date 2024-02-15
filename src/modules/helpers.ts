import { Children, cloneElement, isValidElement, ReactNode } from 'react';
import { css } from '@emotion/react';
import { objectEntries, objectKeys, omit, px } from '@gilbarbara/helpers';
import { PartialDeep, PlainObject } from '@gilbarbara/types';
import { deepmergeCustom, DeepMergeLeafURI } from 'deepmerge-ts';
import is from 'is-lite';

import * as theme from '~/modules/theme';

import { generatePalette } from './palette';

import {
  BaseProps,
  MediaQueries,
  RecursiveChildrenEnhancerOptions,
  ResponsiveInput,
  ResponsiveSizes,
  Theme,
} from '../types';

const { breakpoints } = theme;

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

export function getMediaQueries(): MediaQueries {
  return objectKeys(breakpoints)
    .filter(d => Number.isNaN(parseInt(d, 10)))
    .reduce((acc: PlainObject, d) => {
      acc[d] = `@media screen and (min-width: ${px(breakpoints[d])})`;

      return acc;
    }, {}) as MediaQueries;
}

export function getTheme(props: BaseProps): Theme {
  return mergeTheme(props?.theme ?? {});
}

export function isCSSUnit(value: unknown): value is string {
  const units = ['em', 'px', 'rem', 'vh', 'vmax', 'vmin', 'vw'];
  const regex = new RegExp(`\\d+(${units.join('|')})$`);

  return typeof value === 'string' && regex.test(value);
}

export function mergeTheme(customTheme: PartialDeep<Theme> = {}): Theme {
  const nextTheme = deepmerge({ ...theme }, customTheme) as Theme;

  const baseVariants = objectEntries(nextTheme.colors).reduce(
    (acc, [key, value]) => {
      acc[key] = generatePalette(value, key === 'gray');

      return acc;
    },
    {} as Theme['variants'],
  );

  return {
    ...nextTheme,
    variants: deepmerge(baseVariants, customTheme.variants ?? {}) as Theme['variants'],
  };
}

export function recursiveChildrenEnhancer(
  children: ReactNode,
  props: PlainObject,
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
