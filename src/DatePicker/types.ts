import { DayPickerProps } from 'react-day-picker';

import { ColorVariants, StyledProps } from '../types';

export type DatePickerRangeParameter = [string | undefined, string | undefined];

export type DatePickerClickHandler = (isoString: string | DatePickerRangeParameter) => void;
export type DatePickerRangeClickHandler = (isoString: DatePickerRangeParameter) => void;
export type DatePickerSingleClickHandler = (isoString: string) => void;

export interface DatePickerBaseProps<
  T extends DatePickerSingleClickHandler | DatePickerRangeClickHandler,
> extends StyledProps,
    DayPickerProps {
  finalDate?: string | Date;
  initialDate?: string | Date;
  /** @default en */
  locale?: 'en' | 'pt';
  onClick?: T;
  /** @default primary */
  variant?: ColorVariants;
}
