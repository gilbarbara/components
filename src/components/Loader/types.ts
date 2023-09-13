import { OmitElementProps, StyledProps, WithBlock, WithColorsDefaultColor } from '~/types';

export type LoaderType = 'grow' | 'pill' | 'pride' | 'pulse' | 'rotate';

export interface LoaderProps
  extends OmitElementProps<
    HTMLDivElement,
    StyledProps & WithBlock & Pick<WithColorsDefaultColor, 'color'>
  > {
  size?: number;
  /** @default pill */
  type?: LoaderType;
}
