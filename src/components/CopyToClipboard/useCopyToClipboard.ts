import { ReactNode } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';
import { AnimateIconOptions } from '~/modules/animations';

import { TooltipProps } from '~/components/Tooltip/Tooltip';

import { WithChildrenOptional, WithColors, WithMargin, WithPadding } from '~/types';

export type CopyToClipboardProps = Simplify<CopyToClipboardKnownProps>;

export interface CopyToClipboardKnownProps
  extends Pick<WithColors, 'color'>,
    WithChildrenOptional,
    WithMargin,
    WithPadding {
  /**
   * The check icon.
   * @default <Icon name="check" />
   */
  checkIcon?: ReactNode;
  /**
   * The copy icon.
   * @default <Icon name="copy" />
   */
  copyIcon?: ReactNode;
  /**
   * Disable the animation of the icon.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Hide the tooltip in the copy button.
   * @default false
   */
  hideTooltip?: boolean;
  /**
   * The duration of the animation in milliseconds.
   * @default 400
   */
  iconAnimation?: AnimateIconOptions;
  /**
   * Handler called when when the text is copied.
   */
  onCopy?: (value: string) => void;
  /**
   * Handler called when when the copy fail
   */
  onError?: (error: string) => void;
  /**
   * The time in milliseconds to wait before resetting the icon back to the copy icon.
   * @default 2000
   */
  resetDelay?: number;
  /** @default 16 */
  size?: number;
  /**
   * The text to show in the tooltip after copying.
   */
  tooltipCopiedText?: string;
  /**
   * The props of the tooltip.
   */
  tooltipProps?: Partial<TooltipProps>;
  /**
   * The text to show in the tooltip.
   * @default 'Click to copy'
   */
  tooltipText?: string;
  /**
   * The text to copy.
   */
  value: ReactNode;
}

export const defaultProps = {
  disableAnimation: false,
  hideTooltip: false,
  resetDelay: 2000,
  size: 16,
  tooltipText: 'Click to copy',
} satisfies Omit<CopyToClipboardProps, 'value'>;

export function useCopyToClipboard(props: CopyToClipboardProps) {
  return useComponentProps(props, defaultProps);
}
