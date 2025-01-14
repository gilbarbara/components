import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { StyledProps, WithChildren, WithHTMLAttributes, WithMargin } from '~/types';

export type AspectRatioProps = Simplify<AspectRatioKnownProps>;

export interface AspectRatioKnownProps
  extends StyledProps,
    WithChildren,
    WithHTMLAttributes,
    WithMargin {
  maxWidth?: number;
  ratio: number;
}

export function useAspectRatio(props: AspectRatioProps) {
  return useComponentProps(props);
}
