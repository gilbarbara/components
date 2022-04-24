import * as React from 'react';
import * as ReactCopyToClipboard from 'react-copy-to-clipboard';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { Icon } from './Icon';
import { animateIcon, fadeInOut } from './modules/animations';
import { getTheme } from './modules/helpers';
import { baseStyles, marginStyles, styledOptions } from './modules/system';
import { Tooltip } from './Tooltip';
import { Icons, WithMargin } from './types';

export interface CopyToClipboardProps extends WithMargin {
  disableAnimation?: boolean;
  /** @default Copy */
  hoverText?: string;
  /** @default copy */
  icon?: Icons;
  onCopy?: (text: string) => void;
  /** @default 16 */
  size?: number;
  text: string;
}

const StyledCopyToClipboard = styled(
  'span',
  styledOptions,
)<Omit<CopyToClipboardProps, 'text'>>(props => {
  return css`
    ${baseStyles(props)};
    ${marginStyles(props)};
    cursor: pointer;
    display: inline-flex;
    line-height: 1;
    position: relative;
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

export const CopyToClipboard = React.forwardRef<HTMLSpanElement, CopyToClipboardProps>(
  (props, ref) => {
    const {
      disableAnimation = false,
      hoverText = 'Copy',
      icon = 'copy',
      onCopy,
      size = 16,
      text,
      ...rest
    } = props;
    const theme = getTheme({ theme: useTheme() });

    const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
      if (!disableAnimation) {
        animateIcon(event.currentTarget, 'primary', theme);
      }
    };

    return (
      <StyledCopyToClipboard ref={ref} onClick={handleClick} {...rest}>
        <Tooltip content={hoverText}>
          <ReactCopyToClipboard onCopy={onCopy} text={text}>
            <StyledIcon name={icon} size={size} title={null} />
          </ReactCopyToClipboard>
        </Tooltip>
      </StyledCopyToClipboard>
    );
  },
);

CopyToClipboard.defaultProps = {
  hoverText: 'Copy',
  icon: 'copy',
  size: 16,
};
CopyToClipboard.displayName = 'CopyToClipboard';
