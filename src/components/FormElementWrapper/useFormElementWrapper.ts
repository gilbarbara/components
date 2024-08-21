import { CSSProperties } from 'react';
import { Simplify, StringOrNumber } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { StyledProps, WithChildren, WithEndContent, WithMargin, WithStartContent } from '~/types';

export interface FormElementWrapperKnownProps
  extends StyledProps,
    WithChildren,
    WithEndContent,
    WithMargin,
    WithStartContent {
  /**
   * A single value for both or [width,height]
   * @default 40
   */
  size?: StringOrNumber | [width: StringOrNumber, height: StringOrNumber];
  style?: CSSProperties;
  /** @default 100% */
  width?: StringOrNumber;
}

export type FormElementWrapperProps = Simplify<FormElementWrapperKnownProps>;

export const defaultProps = {
  size: 40,
  width: '100%',
} satisfies Omit<FormElementWrapperProps, 'children'>;

export function useFormElementWrapper(props: FormElementWrapperProps) {
  return useComponentProps(props, defaultProps);
}
