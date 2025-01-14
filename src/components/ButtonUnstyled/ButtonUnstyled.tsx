import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { appearanceStyles, getStyledOptions, getStyles, textStyles } from '~/modules/system';

import { Icon } from '~/components/Icon';

import { WithTheme } from '~/types';

import { ButtonUnstyledProps, useButtonUnstyled } from './useButtonUnstyled';

export const StyledButtonUnstyled = styled('button', getStyledOptions())<
  Omit<ButtonUnstyledProps, 'children'> & WithTheme
>(
  {
    backgroundColor: 'transparent',
    border: 0,
    color: 'inherit',
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: 'inherit',
    lineHeight: 1,
    padding: 0,
  },
  props => {
    return css`
      ${appearanceStyles};
      ${getStyles(props, { useFontSize: true })};

      :disabled {
        cursor: not-allowed;
        opacity: ${props.theme.opacityDisabled};
      }
    `;
  },
);

export const ButtonUnstyled = forwardRef<HTMLButtonElement, ButtonUnstyledProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useButtonUnstyled(props);
  const { busy, children } = componentProps;
  const { fontSize = '16px' } = textStyles(componentProps);

  return (
    <StyledButtonUnstyled ref={ref} {...getDataAttributes('ButtonUnstyled')} {...componentProps}>
      {children}
      {busy && <Icon ml="xxs" name="spinner" size={parseInt(`${fontSize}`, 10) + 2} spin />}
    </StyledButtonUnstyled>
  );
});

ButtonUnstyled.displayName = 'ButtonUnstyled';

export { type ButtonUnstyledProps, defaultProps } from './useButtonUnstyled';
