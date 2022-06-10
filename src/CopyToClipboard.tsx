import { forwardRef, MouseEvent, useEffect, useRef, useState } from 'react';
import * as ReactCopyToClipboard from 'react-copy-to-clipboard';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { Icon } from './Icon';
import { animateIcon, fadeInOut } from './modules/animations';
import { getTheme } from './modules/helpers';
import { baseStyles, getStyledOptions, marginStyles } from './modules/system';
import { Tooltip } from './Tooltip';
import { Icons, WithMargin } from './types';

export interface CopyToClipboardProps extends WithMargin {
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
    ${marginStyles(props)};
  `;
});

const StyledIcon = styled(Icon)`
  transition: transform 0.6s;

  &.will-animate {
    animation: ${fadeInOut} 0.6s ease-out 1 forwards;
  }

  &.is-animating {
    transform: scale(4);
  }
`;

export const CopyToClipboard = forwardRef<HTMLSpanElement, CopyToClipboardProps>((props, ref) => {
  const {
    disableAnimation = false,
    icon = 'copy',
    onCopy,
    size = 16,
    text,
    tooltipCopiedText = 'Copied!',
    tooltipText = 'Copy',
    ...rest
  } = props;
  const [content, setContent] = useState(tooltipText);
  const isActive = useRef(false);
  const theme = getTheme({ theme: useTheme() });

  useEffect(() => {
    isActive.current = true;

    return () => {
      isActive.current = false;
    };
  }, []);

  const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (!disableAnimation) {
      animateIcon(event.currentTarget, 'primary', theme);
    }

    setContent(tooltipCopiedText);

    setTimeout(() => {
      if (isActive.current) {
        setContent(tooltipText);
      }
    }, 2000);
  };

  return (
    <StyledCopyToClipboard
      ref={ref}
      data-component-name="CopyToClipboard"
      onClick={handleClick}
      {...rest}
    >
      <Tooltip content={content} position="right" size="small">
        <ReactCopyToClipboard onCopy={onCopy} text={text}>
          <StyledIcon name={icon} size={size} title={null} />
        </ReactCopyToClipboard>
      </Tooltip>
    </StyledCopyToClipboard>
  );
});

CopyToClipboard.defaultProps = {
  disableAnimation: false,
  icon: 'copy',
  size: 16,
  tooltipCopiedText: 'Copied!',
  tooltipText: 'Copy',
};
