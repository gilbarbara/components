import { ElementType, HTMLProps, ReactNode } from 'react';
import { Option } from '@gilbarbara/react-dropdown';
import { StringOrNumber } from '@gilbarbara/types';

import { WithDisabled } from './shared';
import { Theme, VariantWithTones } from './theme';

export interface BaseProps {
  [hey: string]: any;
  theme?: Partial<Theme>;
}

export interface StyledProps {
  as?: ElementType;
  theme?: Theme;
}

export interface CheckboxItem extends WithDisabled {
  label?: ReactNode;
  name: string;
}

export interface DropdownOption extends Option {
  prefix?: ReactNode;
  suffix?: ReactNode;
  type?: string;
}

export type OmitElementProps<TElement, TProps, TProperties extends string = never> = TProps &
  Omit<HTMLProps<TElement>, 'ref' | 'size' | keyof TProps | TProperties>;

export interface RadioItem extends WithDisabled {
  accent?: VariantWithTones;
  label?: ReactNode;
  value: StringOrNumber;
}
