import { ReactNode } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { TooltipProps } from '~/components/Tooltip/Tooltip';

import { WithChildrenOptional, WithColors, WithMargin, WithPadding } from '~/types';

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
   * Handler called when when the text is copied.
   */
  onCopy?: (value: string) => void;
  /**
   * Handler called when when the copy fail
   */
  onError?: (error: string) => void;
  /** @default 16 */
  size?: number;
  /**
   * The time in milliseconds to wait before resetting the icon.
   * @default 2000
   */
  timeout?: number;
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

export type CopyToClipboardProps = Simplify<CopyToClipboardKnownProps>;

export const defaultProps = {
  disableAnimation: false,
  hideTooltip: false,
  size: 16,
  timeout: 2000,
  tooltipText: 'Click to copy',
} satisfies Omit<CopyToClipboardProps, 'value'>;

export function useCopyToClipboard(props: CopyToClipboardProps) {
  return useComponentProps(props, defaultProps);
}
