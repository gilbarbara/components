import { ElementType, HTMLProps, ReactNode } from 'react';
import { Option } from '@gilbarbara/react-dropdown';
import { StringOrNumber } from '@gilbarbara/types';

import { WithDisabled, WithLabel } from './shared';
import { ColorVariantTones, Theme } from './theme';

export interface BaseProps {
  [hey: string]: any;
  theme?: Partial<Theme>;
}

export interface StyledProps {
  as?: ElementType;
  theme?: Theme;
}

export interface CheckboxItem extends WithDisabled, WithLabel {
  name: string;
}

export interface DropdownOption extends Option {
  prefix?: ReactNode;
  suffix?: ReactNode;
  type?: string;
}

export type OmitElementProps<TElement, TProps, TProperties extends string = never> = TProps &
  Omit<HTMLProps<TElement>, 'ref' | 'size' | 'wrap' | keyof TProps | TProperties>;

export interface RadioItem extends WithDisabled, WithLabel {
  accent?: ColorVariantTones;
  value: StringOrNumber;
}
