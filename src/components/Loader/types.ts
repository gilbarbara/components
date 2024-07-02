import { AriaAttributes } from 'react';
import { Simplify } from '@gilbarbara/types';

import {
  StyledProps,
  TextSizes,
  WithBlock,
  WithColorsDefaultColor,
  WithHTMLAttributes,
  WithLabel,
} from '~/types';

export type LoaderLabelPosition = 'bottom' | 'left' | 'right' | 'top' | 'middle';
export type LoaderSize = number | [width: number, height: number];
export type LoaderType = 'grow' | 'pill' | 'pride' | 'pulse' | 'rotate';

export interface LoaderBaseProps
  extends StyledProps,
    AriaAttributes,
    WithBlock,
    Pick<WithColorsDefaultColor, 'color'>,
    WithHTMLAttributes,
    WithLabel {
  /**
   * Where to place the label.
   * @default bottom
   */
  labelPosition?: LoaderLabelPosition;
  /**
   * The size of the label.
   */
  labelSize?: TextSizes;
}

export type LoaderKnownProps = LoaderBaseProps &
  (
    | {
        size?: number;
        type?: Exclude<LoaderType, 'pill'>;
      }
    | {
        size?: LoaderSize;
        type: 'pill';
      }
  );

export type LoaderProps = Simplify<LoaderKnownProps>;

export interface LoaderComponentProps<T = number> extends Omit<LoaderProps, 'size' | 'type'> {
  size: T;
}
