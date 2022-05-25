import { MouseEventHandler, ReactNode, useCallback, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnyObject } from '@gilbarbara/types';

import { ButtonBase } from './ButtonBase';
import { Icon } from './Icon';
import { Menu, MenuProps } from './Menu';
import { getTheme } from './modules/helpers';
import { backgroundStyles, getStyledOptions } from './modules/system';
import {
  PositionY,
  WithBlock,
  WithBusy,
  WithChildren,
  WithColor,
  WithComponentSize,
  WithInvert,
} from './types';

export interface ButtonSplitProps
  extends Pick<MenuProps, 'disabled' | 'onToggle'>,
    WithBlock,
    WithBusy,
    WithChildren,
    WithColor,
    WithComponentSize,
    WithInvert {
  label: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  /** @default bottom-right */
  position?: PositionY;
}

export const StyledButtonSplit = styled(
  'div',
  getStyledOptions(),
)<Omit<ButtonSplitProps, 'label' | 'onClick'>>(props => {
  const { block, disabled, invert, size = 'md' } = props;
  const { button, grayLight, grayMid, spacing } = getTheme(props);

  const { borderRadius, fontSize, fontWeight, height, lineHeight, padding } = button;
  const buttonPadding = `${padding[size][0]} ${padding[size][1]}`;
  const styles = backgroundStyles(props);

  if (disabled) {
    styles.backgroundColor = grayLight;
    styles.borderColor = grayLight;
    styles.color = grayMid;
  }

  return css`
    display: inline-flex;
    min-height: ${height[size]};
    min-width: ${height[size]};
    width: ${block ? '100%' : 'auto'};

    > [data-component-name='ButtonBase'] {
      ${styles};
      border-bottom-left-radius: ${borderRadius[size]};
      border-right: 0;
      border-top-left-radius: ${borderRadius[size]};
      display: flex;
      flex: 1;
      font-size: ${fontSize[size]};
      font-weight: ${fontWeight};
      justify-content: center;
      line-height: ${lineHeight[size]};
      opacity: 1;
      padding: ${buttonPadding};
    }

    > [data-component-name='Menu'] {
      ${styles};
      align-items: center;
      border-left: ${invert ? styles.border : `1px solid ${styles.color}`};
      border-top-right-radius: ${borderRadius[size]};
      border-bottom-right-radius: ${borderRadius[size]};
      display: flex;
    }

    [data-component-name='MenuButton'] {
      height: 100%;
      opacity: 1;
      padding: 0 ${spacing.xs};
      width: 100%;
    }
  `;
});

export function ButtonSplit(props: ButtonSplitProps): JSX.Element {
  const { busy, children, label, onClick, onToggle, position, ...rest } = props;
  const { disabled, shade, variant } = rest;
  const [active, setActive] = useState(false);

  const handleToggle = useCallback(
    (status: boolean) => {
      setActive(status);

      if (onToggle) {
        onToggle(status);
      }
    },
    [onToggle],
  );

  const buttonProps: AnyObject = {};
  const wrapperProps: AnyObject = {};

  Object.entries(rest).forEach(([key, value]) => {
    if (key.startsWith('data-')) {
      buttonProps[key] = value;
    } else {
      wrapperProps[key] = value;
    }
  });

  return (
    <StyledButtonSplit data-component-name="ButtonSplit" {...wrapperProps}>
      <ButtonBase busy={busy} disabled={disabled} onClick={onClick} {...buttonProps}>
        {label}
      </ButtonBase>
      <Menu
        component={<Icon name={active ? 'chevron-up' : 'chevron-down'} size={24} />}
        disabled={disabled || busy}
        onToggle={handleToggle}
        position={position}
        shade={shade}
        variant={variant}
      >
        {children}
      </Menu>
    </StyledButtonSplit>
  );
}

ButtonSplit.defaultProps = {
  block: false,
  busy: false,
  disabled: false,
  invert: false,
  position: 'bottom-right',
  shade: 'mid',
  size: 'md',
  variant: 'primary',
};

export { MenuDivider as ButtonSplitDivider, MenuItem as ButtonSplitItem } from './Menu';
