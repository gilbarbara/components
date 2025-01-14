import { AriaAttributes } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';
import { UseThemeReturn } from '~/hooks/useTheme';

import {
  StyledProps,
  TextSizes,
  WithBlock,
  WithColorsDefaultColor,
  WithHTMLAttributes,
  WithLabel,
} from '~/types';

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
export type LoaderLabelPosition = 'bottom' | 'left' | 'right' | 'top' | 'middle';
export type LoaderProps = Simplify<LoaderKnownProps>;

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

export interface LoaderComponentProps<T = number>
  extends Omit<LoaderProps, 'size' | 'type' | 'theme'>,
    UseThemeReturn {
  size: T;
}

export const defaultProps = {
  color: 'primary',
  block: false,
  labelPosition: 'bottom',
  labelSize: 'sm',
  size: 32,
  type: 'pill',
} satisfies LoaderProps;

export function useLoader(props: LoaderProps) {
  return useComponentProps(props, defaultProps);
}
