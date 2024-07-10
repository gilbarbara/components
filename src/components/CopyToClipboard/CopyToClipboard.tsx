import {
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from 'react';
import innerText from 'react-innertext';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';
import { useIsMounted } from '@gilbarbara/hooks';
import { Simplify } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import { animateIcon } from '~/modules/animations';
import {
  baseStyles,
  colorStyles,
  getStyledOptions,
  marginStyles,
  paddingStyles,
} from '~/modules/system';

import { Icon } from '~/components/Icon';
import { Tooltip } from '~/components/Tooltip';
import { TooltipProps } from '~/components/Tooltip/Tooltip';

import { WithColors, WithMargin, WithPadding } from '~/types';

export interface CopyToClipboardKnownProps
  extends Pick<WithColors, 'color'>,
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
   * Callback fired when the text is copied.
   */
  onCopy?: (value: string) => void;
  /**
   * Callback fired when the copy fail
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
  checkIcon: <Icon name="check" />,
  copyIcon: <Icon name="copy" />,
  disableAnimation: false,
  hideTooltip: false,
  size: 16,
  timeout: 2000,
  tooltipText: 'Click to copy',
} satisfies Omit<CopyToClipboardProps, 'value'>;

const StyledCopyToClipboard = styled(
  'span',
  getStyledOptions(),
)<Omit<CopyToClipboardProps, 'value'>>(props => {
  return css`
    ${baseStyles(props)};
    cursor: pointer;
    display: inline-flex;
    line-height: 1;
    position: relative;
    ${colorStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
  `;
});

export function CopyToClipboard(props: CopyToClipboardProps) {
  const {
    checkIcon,
    copyIcon,
    disableAnimation,
    hideTooltip,
    onCopy,
    onError,
    size,
    timeout,
    tooltipCopiedText,
    tooltipProps,
    tooltipText,
    value,
    ...rest
  } = mergeProps(defaultProps, props);
  const isMounted = useIsMounted();
  const [tooltipContent, setTooltipContent] = useState(tooltipText);
  const [copied, setCopied] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);
  const { getDataAttributes, theme } = useTheme();

  const valueText = useMemo(() => {
    let stringValue = '';

    if (Array.isArray(value)) {
      value.forEach(child => {
        const childString = innerText(child);

        if (childString) {
          stringValue += `${childString}\n`;
        }
      });
    } else {
      stringValue = innerText(value);
    }

    return stringValue.trim();
  }, [value]);

  const handleClick = async () => {
    if (!disableAnimation && iconRef.current) {
      animateIcon(iconRef.current, rest.color ?? 'primary', theme);
    }

    try {
      await navigator.clipboard.writeText(valueText);

      onCopy?.(valueText);

      if (tooltipCopiedText) {
        setTooltipContent(tooltipCopiedText);
      }

      setTimeout(
        () => {
          if (isMounted()) {
            setCopied(true);
          }
        },
        disableAnimation ? 0 : 300,
      );

      setTimeout(() => {
        if (isMounted()) {
          setTooltipContent(tooltipText);
          setCopied(false);
        }
      }, timeout);
    } catch (error: any) {
      setTooltipContent(error.message);
      onError?.(error.message);
    }
  };

  const copyIconElement =
    copyIcon && !isValidElement(copyIcon) ? <span>{copyIcon}</span> : copyIcon;
  const checkIconElement =
    checkIcon && !isValidElement(checkIcon) ? <span>{checkIcon}</span> : checkIcon;

  let main = cloneElement((copied ? checkIconElement : copyIconElement) as ReactElement, {
    ref: iconRef,
    size,
    title: null,
  });

  if (!hideTooltip && (tooltipCopiedText || !copied)) {
    main = (
      <Tooltip content={tooltipContent} placement="top-middle" size="xs" {...tooltipProps}>
        {main}
      </Tooltip>
    );
  }

  return (
    <StyledCopyToClipboard
      {...getDataAttributes('CopyToClipboard')}
      onClick={handleClick}
      {...rest}
    >
      {main}
    </StyledCopyToClipboard>
  );
}

CopyToClipboard.displayName = 'CopyToClipboard';
