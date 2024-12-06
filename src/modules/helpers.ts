import {
  Children,
  cloneElement,
  ElementType,
  isValidElement,
  JSXElementConstructor,
  ReactNode,
} from 'react';
import { css } from '@emotion/react';
import { canUseDOM, objectEntries, objectKeys, omit, px } from '@gilbarbara/helpers';
import { PartialDeep, PlainObject } from '@gilbarbara/types';
import { deepmergeCustom } from 'deepmerge-ts';
import is from 'is-lite';

import * as defaultTheme from '~/modules/theme';

import { generatePalette } from './palette';

import { MediaQueries, ResponsiveInput, ResponsiveSizes, Target, Theme } from '../types';

const { breakpoints } = defaultTheme;

const deepmerge = deepmergeCustom({
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

export function formatBreakpoints(theme: Theme) {
  return Object.entries(theme.breakpoints).reduce<Record<string, number>>(
    (acc, [key, value]) => {
      acc[key] = parseInt(value, 10);

      return acc;
    },
    { _: 0 },
  );
}

export function formatKebabCaseToCamelCase(value: string) {
  return value.replace(/-./g, m => m[1].toUpperCase());
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

export function pickChildren<T = ReactNode>(
  children: T,
  targetChild: ElementType,
): [T | undefined, T[]] {
  const components: T[] = [];

  const withoutTargetChildren = Children.map(children, item => {
    if (!isValidElement(item)) {
      return item;
    }

    if (item.type === targetChild) {
      components.push(item as T);

      return null;
    }

    return item;
  })?.filter(Boolean) as T;

  return [withoutTargetChildren, components];
}

export interface RecursiveChildrenEnhancerOptions {
  componentType?: JSXElementConstructor<any>;
  overrideProps?: boolean;
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
