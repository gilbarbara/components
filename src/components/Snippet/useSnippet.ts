import { ReactNode } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { CopyToClipboardProps } from '~/components/CopyToClipboard/CopyToClipboard';

import {
  Spacing,
  StyledProps,
  WithBorder,
  WithChildren,
  WithColors,
  WithComponentSize,
  WithDimension,
  WithDisplay,
  WithFlexBox,
  WithHTMLAttributes,
  WithMargin,
  WithPadding,
  WithRadius,
} from '~/types';

export interface SnippetKnownProps
  extends Pick<
      CopyToClipboardProps,
      | 'checkIcon'
      | 'copyIcon'
      | 'onCopy'
      | 'onError'
      | 'timeout'
      | 'tooltipCopiedText'
      | 'tooltipProps'
      | 'tooltipText'
    >,
    StyledProps,
    WithBorder,
    WithChildren,
    WithColors,
    WithComponentSize,
    WithDimension,
    WithDisplay,
    WithFlexBox,
    Omit<WithHTMLAttributes, 'tabIndex'>,
    WithMargin,
    WithPadding,
    WithRadius {
  /**
   * The value to copy.
   * If it is set, it will be copied instead of the children.
   */
  copyValue?: ReactNode;
  /**
   * Disable the animation of the copy icon.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * The gap between the elements.
   * @default xs
   */
  gap?: Spacing;
  /**
   * Hide the copy button.
   * @default false
   */
  hideCopyButton?: boolean;
  /**
   * Hide the symbol.
   * @default false
   */
  hideSymbol?: boolean;
  /**
   * Hide the tooltip in the copy button.
   * @default false
   */
  hideTooltip?: boolean;
  /**
   * Prevent the text to wrap.
   * @default false
   */
  preventWrap?: boolean;
  /**
   * Use the regular font instead of the monospace.
   * @default false
   */
  removeFormatting?: boolean;
  /**
   * The symbol to show before the snippet.
   * @default $
   */
  symbol?: ReactNode;
}

export type SnippetProps = Simplify<SnippetKnownProps>;

export const defaultProps = {
  align: 'center',
  display: 'inline-flex',
  disableAnimation: false,
  gap: 'xs',
  hideCopyButton: false,
  hideSymbol: false,
  hideTooltip: false,
  preventWrap: false,
  radius: 'xs',
  removeFormatting: false,
  size: 'md',
  symbol: '$',
} satisfies Omit<SnippetProps, 'children'>;

export function useSnippet(props: SnippetProps) {
  return useComponentProps(props, defaultProps);
}
