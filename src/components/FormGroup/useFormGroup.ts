import { CSSProperties, ReactNode } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  StyledProps,
  WithBorder,
  WithChildren,
  WithHTMLAttributes,
  WithInline,
  WithLabel,
  WithLayout,
  WithMargin,
  WithPadding,
  WithRadius,
} from '~/types';

export interface FormGroupKnownProps
  extends StyledProps,
    WithBorder,
    WithChildren,
    WithHTMLAttributes,
    WithInline,
    WithLabel,
    WithLayout,
    WithMargin,
    WithPadding,
    WithRadius {
  assistiveText?: ReactNode;
  error?: ReactNode;
  hideAssistiveText?: boolean;
  labelId?: string;
  labelInfo?: ReactNode;
  labelStyles?: CSSProperties;
  required?: boolean;
  skipIcon?: boolean;
  valid?: boolean;
}

export type FormGroupProps = Simplify<FormGroupKnownProps>;

export const defaultProps = {
  hideAssistiveText: false,
  inline: false,
  required: false,
  skipIcon: false,
} satisfies Omit<FormGroupProps, 'children'>;

export function useFormGroup(props: FormGroupProps) {
  return useComponentProps(props, defaultProps);
}
