import { MouseEventHandler, ReactNode, useCallback, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SetRequired, StringOrNumber } from '@gilbarbara/types';

import { getTheme } from '~/modules/helpers';
import { colorStyles, getStyledOptions } from '~/modules/system';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { Icon } from '~/components/Icon';
import { Menu, MenuProps } from '~/components/Menu/Menu';

import {
  PositionY,
  WithBlock,
  WithBusy,
  WithButtonSize,
  WithChildren,
  WithColorsDefaultBg,
  WithInvert,
} from '~/types';

export interface ButtonSplitProps
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

  const { borderRadius, fontSize, fontWeight, height, lineHeight, padding } = button[size];
  const buttonPadding = `${padding[0]} ${padding[1]}`;
  const styles = colorStyles(props);

  if (disabled) {
    styles.backgroundColor = grayScale['100'];
    styles.borderColor = grayScale['100'];
    styles.color = grayScale['500'];
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
  const { bg, disabled, size } = rest;
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
      <ButtonUnstyled busy={busy} disabled={disabled} onClick={onClick} {...dataAttributes}>
        {label}
      </ButtonUnstyled>
      <Menu
        accent={bg}
        component={<Icon name={active ? 'chevron-up' : 'chevron-down'} size={iconSize} />}
        disabled={disabled || busy}
        onToggle={handleToggle}
        position={position}
      >
        {children}
      </Menu>
    </StyledButtonSplit>
  );
}

export { MenuDivider as ButtonSplitDivider, MenuItem as ButtonSplitItem } from '~/components/Menu';

ButtonSplit.displayName = 'ButtonSplit';
