import { MouseEventHandler, ReactNode, useCallback, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SetRequired, Simplify, StringOrNumber } from '@gilbarbara/types';

import { getTheme } from '~/modules/helpers';
import {
  colorStyles,
  getDisableStyles,
  getOutlineStyles,
  getStyledOptions,
  isDarkMode,
} from '~/modules/system';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { Icon } from '~/components/Icon';
import { Menu } from '~/components/Menu';
import { MenuProps } from '~/components/Menu/types';

import {
  PositionY,
  WithBlock,
  WithBusy,
  WithButtonSize,
  WithChildren,
  WithColorsDefaultBg,
  WithInvert,
} from '~/types';

export interface ButtonSplitKnownProps
  extends Pick<MenuProps, 'disabled' | 'onToggle'>,
    WithBlock,
    WithButtonSize,
    WithBusy,
    WithChildren,
    WithColorsDefaultBg,
    WithInvert {
  dataAttributes?: Record<`data-${string}`, StringOrNumber>;
  label: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  /** @default bottom-right */
  position?: PositionY;
}

export type ButtonSplitProps = Simplify<ButtonSplitKnownProps>;

export const defaultProps = {
  bg: 'primary',
  block: false,
  busy: false,
  disabled: false,
  invert: false,
  position: 'bottom-right',
  size: 'md',
} satisfies Omit<ButtonSplitProps, 'children' | 'label' | 'onClick'>;

export const StyledButtonSplit = styled(
  'div',
  getStyledOptions(),
)<SetRequired<Omit<ButtonSplitProps, 'label' | 'onClick'>, keyof typeof defaultProps>>(props => {
  const { block, disabled, invert, size } = props;
  const { button, grayScale, spacing } = getTheme(props);
  const darkMode = isDarkMode(props);

  const { borderRadius, fontSize, fontWeight, height, lineHeight, padding } = button[size];
  const buttonPadding = `${padding[0]} ${padding[1]}`;
  const styles = colorStyles(props);

  if (disabled) {
    styles.border = `1px solid ${darkMode ? grayScale['800'] : grayScale['100']}`;
    styles.borderColor = grayScale['100'];
    styles.color = grayScale['500'];
  }

  const disabledStyles = disabled
    ? css`
        ${getDisableStyles(props, { isButton: true })};
        border-color: ${darkMode ? grayScale['850'] : grayScale['100']};
      `
    : undefined;

  return css`
    display: inline-flex;
    min-height: ${height};
    min-width: ${height};
    width: ${block ? '100%' : 'auto'};

    [data-component-name='ButtonSplitMainButton'] {
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

      ${disabledStyles};

      &:focus {
        ${getOutlineStyles(styles.backgroundColor as string)};
      }
    }

    [data-component-name='MenuButton'] {
      ${styles};
      ${disabledStyles};
      align-items: center;
      border-left: ${invert ? styles.border : `1px solid ${styles.color}`};
      border-radius: 0 ${borderRadius} ${borderRadius} 0;
      display: flex;
      height: 100%;
      opacity: 1;
      padding: 0 ${spacing[size === 'xs' ? 'xxs' : 'xs']};
      width: 100%;

      &:focus {
        ${getOutlineStyles(styles.backgroundColor as string)};
      }
    }
  `;
});

export function ButtonSplit(props: ButtonSplitProps) {
  const { busy, children, dataAttributes, label, onClick, onToggle, position, ...rest } = {
    ...defaultProps,
    ...props,
  };
  const { bg, disabled, size } = rest;
  const [active, setActive] = useState(false);

  const handleToggle = useCallback(
    (status: boolean) => {
      setActive(status);

      onToggle?.(status);
    },
    [onToggle],
  );

  let iconSize = 14;

  switch (size) {
    case 'sm': {
      iconSize = 16;
      break;
    }
    case 'md': {
      iconSize = 18;
      break;
    }
    case 'lg': {
      iconSize = 22;
      break;
    }
    default: {
      // noop
    }
  }

  return (
    <StyledButtonSplit busy={busy} data-component-name="ButtonSplit" position={position} {...rest}>
      <ButtonUnstyled
        busy={busy}
        data-component-name="ButtonSplitMainButton"
        disabled={disabled}
        onClick={onClick}
        {...dataAttributes}
      >
        {label}
      </ButtonUnstyled>
      <Menu
        accent={bg}
        button={<Icon name={active ? 'chevron-up' : 'chevron-down'} size={iconSize} />}
        disabled={disabled || busy}
        onToggle={handleToggle}
        position={position}
      >
        {children}
      </Menu>
    </StyledButtonSplit>
  );
}

export {
  MenuSeparator as ButtonSplitSeparator,
  MenuItem as ButtonSplitItem,
} from '~/components/Menu';

ButtonSplit.displayName = 'ButtonSplit';
