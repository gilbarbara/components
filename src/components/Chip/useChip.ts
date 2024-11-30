import { CSSProperties, MouseEvent } from 'react';
import { omit } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { textDefaultOptions } from '~/modules/options';

import {
  ColorVariantTones,
  Spacing,
  StyledProps,
  WithChildren,
  WithColors,
  WithDimension,
  WithEndContent,
  WithFlexItem,
  WithMargin,
  WithPadding,
  WithRadius,
  WithStartContent,
  WithTextOptions,
  WithVariant,
} from '~/types';

export interface ChipKnownProps
  extends StyledProps,
    WithChildren,
    WithEndContent,
    WithColors,
    WithDimension,
    WithFlexItem,
    WithMargin,
    WithPadding,
    WithRadius,
    WithStartContent,
    WithTextOptions,
    WithVariant {
  /**
   * Component background color
   * @default primary
   */
  bg?: ColorVariantTones;
  endContentOnClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Space between the start and end content
   * @default xxs
   */
  gap?: Spacing;
  startContentOnClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
}

export type ChipProps = Simplify<ChipKnownProps>;

export const defaultProps = {
  ...omit(textDefaultOptions, 'size'),
  bg: 'primary',
  gap: 'xxs',
  radius: 'md',
  size: 'sm',
  variant: 'solid',
} satisfies Omit<ChipProps, 'children'>;

export function useChip(props: ChipProps) {
  return useComponentProps(props, defaultProps);
}
