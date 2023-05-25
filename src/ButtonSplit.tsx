import { MouseEventHandler, ReactNode, useCallback, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SetRequired } from 'type-fest';

import { ButtonUnstyled } from './ButtonUnstyled';
import { Icon } from './Icon';
import { Menu, MenuProps } from './Menu';
import { getTheme } from './modules/helpers';
import { backgroundStyles, getStyledOptions } from './modules/system';
import {
  PositionY,
  WithBlock,
  WithBusy,
  WithButtonSize,
  WithChildren,
  WithColor,
  WithInvert,
} from './types';

export interface ButtonSplitProps
  extends Pick<MenuProps, 'disabled' | 'onToggle'>,
    WithBlock,
    WithButtonSize,
    WithBusy,
    WithChildren,
    WithColor,
    WithInvert {
  dataAttributes?: Record<`data-${string}`, string | number>;
  label: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  /** @default bottom-right */
  position?: PositionY;
}

export const defaultProps = {
  block: false,
  busy: false,
  disabled: false,
  invert: false,
  position: 'bottom-right',
  shade: 'mid',
  size: 'md',
  variant: 'primary',
} satisfies Omit<ButtonSplitProps, 'children' | 'label' | 'onClick'>;

export const StyledButtonSplit = styled(
  'div',
  getStyledOptions(),
)<SetRequired<Omit<ButtonSplitProps, 'label' | 'onClick'>, keyof typeof defaultProps>>(props => {
  const { block, disabled, invert, size } = props;
  const { button, grayLight, grayMid, spacing } = getTheme(props);

  const { borderRadius, fontSize, fontWeight, height, lineHeight, padding } = button[size];
  const buttonPadding = `${padding[0]} ${padding[1]}`;
  const styles = backgroundStyles(props);

  if (disabled) {
    styles.backgroundColor = grayLight;
    styles.borderColor = grayLight;
    styles.color = grayMid;
  }

  return css`
    display: inline-flex;
    min-height: ${height};
    min-width: ${height};
    width: ${block ? '100%' : 'auto'};

    > [data-component-name='ButtonUnstyled'] {
      ${styles};
      border-bottom-left-radius: ${borderRadius};
      border-right: 0;
      border-top-left-radius: ${borderRadius};
      display: flex;
      flex: 1;
      font-size: ${fontSize};
      font-weight: ${fontWeight};
      justify-content: center;
      line-height: ${lineHeight};
      opacity: 1;
      padding: ${buttonPadding};
    }

    > [data-component-name='Menu'] {
      ${styles};
      align-items: center;
      border-left: ${invert ? styles.border : `1px solid ${styles.color}`};
      border-top-right-radius: ${borderRadius};
      border-bottom-right-radius: ${borderRadius};
      display: flex;
    }

    [data-component-name='MenuButton'] {
      height: 100%;
      opacity: 1;
      padding: 0 ${spacing[size === 'xs' ? 'xxs' : 'xs']};
      width: 100%;
    }
  `;
});

export function ButtonSplit(props: ButtonSplitProps) {
  const { busy, children, dataAttributes, label, onClick, onToggle, position, ...rest } = {
    ...defaultProps,
    ...props,
  };
  const { disabled, shade, size, variant } = rest;
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

  return (
    <StyledButtonSplit busy={busy} data-component-name="ButtonSplit" position={position} {...rest}>
      <ButtonUnstyled busy={busy} disabled={disabled} onClick={onClick} {...dataAttributes}>
        {label}
      </ButtonUnstyled>
      <Menu
        component={
          <Icon name={active ? 'chevron-up' : 'chevron-down'} size={size === 'xs' ? 18 : 24} />
        }
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

export { MenuDivider as ButtonSplitDivider, MenuItem as ButtonSplitItem } from './Menu';

ButtonSplit.displayName = 'ButtonSplit';
