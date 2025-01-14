import { ReactNode } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';
import { textDefaultOptions } from '~/modules/options';

import {
  StyledProps,
  WithChildren,
  WithColors,
  WithHTMLAttributes,
  WithInline,
  WithMargin,
  WithTextOptions,
} from '~/types';

export type LabelProps = Simplify<LabelKnownProps>;

export interface LabelKnownProps
  extends StyledProps,
    Pick<WithColors, 'color'>,
    WithChildren,
    WithHTMLAttributes<HTMLLabelElement>,
    WithInline,
    WithMargin,
    WithTextOptions {
  /** For the htmlFor attribute */
  labelId?: string;
  labelInfo?: ReactNode;
}

export const defaultProps = {
  ...textDefaultOptions,
  bold: true,
  inline: false,
} satisfies Omit<LabelProps, 'children'>;

export function useLabel(props: LabelProps) {
  return useComponentProps(props, defaultProps);
}
