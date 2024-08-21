import { useCallback, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';
import { SetRequired } from '@gilbarbara/types';

import {
  colorStyles,
  getDisableStyles,
  getStyledOptions,
  getStyles,
  outlineStyles,
} from '~/modules/system';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { Icon } from '~/components/Icon';
import { Menu } from '~/components/Menu';

import { WithTheme } from '~/types';

import { ButtonSplitProps, defaultProps, useButtonSplit } from './useButtonSplit';

export const StyledButtonSplit = styled('div', getStyledOptions())<
  SetRequired<Omit<ButtonSplitProps, 'label' | 'onClick'>, keyof typeof defaultProps> & WithTheme
>(
  {
    display: 'inline-flex',
  },
  props => {
    const { block, bordered, disabled, size, theme } = props;
    const { button, darkMode, dataAttributeName, grayScale, spacing } = theme;

    const propsWithVariant = { ...props, variant: bordered ? 'bordered' : 'solid' } as const;
    const { borderRadius, height, padding } = button[size];
    const buttonPadding = `${padding[0]} ${padding[1]}`;
    const styles = colorStyles(propsWithVariant);

    if (disabled) {
      styles.border = `1px solid ${darkMode ? grayScale['800'] : grayScale['100']}`;
      styles.borderColor = grayScale['100'];
      styles.color = grayScale['500'];
    }

    const disabledStyles = disabled
      ? css`
          ${getDisableStyles(propsWithVariant, { isButton: true })};
          border-color: ${darkMode ? grayScale['850'] : grayScale['100']};
        `
      : undefined;

    const outlineStyle = outlineStyles(styles.backgroundColor as string, theme);

    return css`
      display: inline-flex;
      min-height: ${height};
      min-width: ${height};
      width: ${block ? '100%' : 'auto'};
      ${getStyles(omit(props, 'position'), { skipColor: true })};

      [data-${dataAttributeName}='ButtonSplitMainButton'] {
        ${styles};
        border-bottom-left-radius: ${borderRadius};
        border-right: 0;
        border-top-left-radius: ${borderRadius};
        display: flex;
        flex: 1;
        justify-content: center;
        opacity: 1;
        padding: ${buttonPadding};

        ${disabledStyles};
        ${outlineStyle};
      }

      [data-${dataAttributeName}='MenuButton'] {
        ${styles};
        ${disabledStyles};
        align-items: center;
        border-left: ${bordered ? styles.border : `1px solid ${styles.color}`};
        border-radius: 0 ${borderRadius} ${borderRadius} 0;
        display: flex;
        height: 100%;
        opacity: 1;
        padding: 0 ${spacing[size === 'xs' ? 'xxs' : 'xs']};
        width: 100%;
        ${outlineStyle};
      }
    `;
  },
);

export function ButtonSplit(props: ButtonSplitProps) {
  const { componentProps, getDataAttributes } = useButtonSplit(props);
  const { busy, buttonProps, children, label, onClick, onToggle, position, ...rest } =
    componentProps;
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
    <StyledButtonSplit
      busy={busy}
      {...getDataAttributes('ButtonSplit')}
      position={position}
      {...rest}
    >
      <ButtonUnstyled
        busy={busy}
        {...getDataAttributes('ButtonSplitMainButton')}
        disabled={disabled}
        onClick={onClick}
        size={size}
        {...buttonProps}
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

ButtonSplit.displayName = 'ButtonSplit';

export {
  MenuSeparator as ButtonSplitSeparator,
  MenuItem as ButtonSplitItem,
} from '~/components/Menu';

export { defaultProps, type ButtonSplitProps } from './useButtonSplit';
