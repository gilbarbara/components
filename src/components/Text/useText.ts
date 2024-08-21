import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { textDefaultOptions } from '~/modules/options';

import {
  StyledProps,
  WithChildren,
  WithColors,
  WithDisplay,
  WithFlexItem,
  WithHTMLAttributes,
  WithTextOptions,
} from '~/types';

export interface TextKnownProps
  extends StyledProps,
    WithChildren,
    Pick<WithColors, 'color'>,
    WithDisplay,
    WithFlexItem,
    WithHTMLAttributes,
    WithTextOptions {}

export type TextProps = Simplify<TextKnownProps>;

export function useText(props: TextProps) {
  return useComponentProps(props, textDefaultOptions);
}
