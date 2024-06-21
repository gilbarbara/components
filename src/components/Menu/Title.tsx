import { isValidElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme } from '~/modules/helpers';
import { colorStyles, getStyledOptions, textStyles } from '~/modules/system';

import { MenuTitleProps } from './types';

const StyledMenuTitle = styled(
  'li',
  getStyledOptions(),
)<Omit<MenuTitleProps, 'children'>>(props => {
  const { grayScale, spacing, typography } = getTheme(props);

  return css`
    ${colorStyles(props)};

    [data-component-name='MenuTitleContent'] {
      padding: ${spacing.xs} ${spacing.sm};
    }

    [data-component-name='MenuTitleText'] {
      color: ${grayScale['500']};
      font-size: ${typography.xs.fontSize};
      text-transform: uppercase;
      ${textStyles(props)};
    }
  `;
});

export function MenuTitle({ children, ...rest }: MenuTitleProps) {
  const content = isValidElement(children) ? (
    children
  ) : (
    <span data-component-name="MenuTitleText">{children}</span>
  );

  return (
    <StyledMenuTitle data-component-name="MenuTitle" role="presentation" {...rest}>
      <div data-component-name="MenuTitleContent">{content}</div>
    </StyledMenuTitle>
  );
}

MenuTitle.displayName = 'MenuTitle';
