import { MouseEvent, useEffect, useRef, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Simplify } from '@gilbarbara/types';

import { animateIcon, fadeInOut } from '~/modules/animations';
import { getTheme } from '~/modules/helpers';
import { baseStyles, colorStyles, getStyledOptions, marginStyles } from '~/modules/system';

import { Icon } from '~/components/Icon';
import { Tooltip } from '~/components/Tooltip';

import { Icons, WithColors, WithMargin } from '~/types';

export interface CopyToClipboardKnownProps extends Pick<WithColors, 'color'>, WithMargin {
  disableAnimation?: boolean;
  /** @default copy */
  icon?: Icons;
  onCopy?: (text: string) => void;
  /** @default 16 */
  size?: number;
  text: string;
  /** @default Copied */
  tooltipCopiedText?: string;
  /** @default Copy */
  tooltipText?: string;
}

export type CopyToClipboardProps = Simplify<CopyToClipboardKnownProps>;

export const defaultProps = {
  disableAnimation: false,
  icon: 'copy',
  size: 16,
  tooltipCopiedText: 'Copied!',
  tooltipText: 'Copy',
} satisfies Omit<CopyToClipboardProps, 'text'>;

const StyledCopyToClipboard = styled(
  'span',
  getStyledOptions(),
)<Omit<CopyToClipboardProps, 'text'>>(props => {
  return css`
    ${baseStyles(props)};
    cursor: pointer;
    display: inline-flex;
    line-height: 1;
    position: relative;
    ${colorStyles(props)};
    ${marginStyles(props)};
  `;
});

const StyledIcon = styled(Icon)`
  pointer-events: none;
  transition: transform 0.6s;

  &.will-animate {
    animation: ${fadeInOut} 0.6s ease-out 1 forwards;
  }

  &.is-animating {
    transform: scale(4);
  }
`;

export function CopyToClipboard(props: CopyToClipboardProps) {
  const { disableAnimation, icon, onCopy, size, text, tooltipCopiedText, tooltipText, ...rest } = {
    ...defaultProps,
    ...props,
  };
  const [content, setContent] = useState(tooltipText);
  const isActive = useRef(false);
  const theme = getTheme({ theme: useTheme() });

  useEffect(() => {
    isActive.current = true;

    return () => {
      isActive.current = false;
    };
  }, []);

  const handleClick = async (event: MouseEvent<HTMLSpanElement>) => {
    if (!disableAnimation) {
      animateIcon(event.currentTarget, rest.color ?? 'primary', theme);
    }

    try {
      await navigator.clipboard.writeText(text);

      setContent(tooltipCopiedText);

      onCopy?.(text);

      setTimeout(() => {
        if (isActive.current) {
          setContent(tooltipText);
        }
      }, 2000);
    } catch (error: any) {
      setContent(error.message);
      onCopy?.(error.message);
    }
  };

  return (
    <StyledCopyToClipboard data-component-name="CopyToClipboard" onClick={handleClick} {...rest}>
      <Tooltip content={content} placement="right-middle" size="xs">
        <StyledIcon name={icon} size={size} title={null} />
      </Tooltip>
    </StyledCopyToClipboard>
  );
}

CopyToClipboard.displayName = 'CopyToClipboard';
