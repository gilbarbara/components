import { isValidElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useTheme } from '~/hooks/useTheme';

import { getTheme } from '~/modules/helpers';
import { colorStyles, getStyledOptions, textStyles } from '~/modules/system';

import { MenuTitleProps } from './types';

const StyledMenuTitle = styled(
  'li',
  getStyledOptions(),
)<Omit<MenuTitleProps, 'children'>>(props => {
  const { dataAttributeName, grayScale, spacing, typography } = getTheme(props);

  return css`
    ${colorStyles(props)};

    [data-${dataAttributeName}='MenuTitleContent'] {
      padding: ${spacing.xs} ${spacing.sm};
    }

    [data-${dataAttributeName}='MenuTitleText'] {
      color: ${grayScale['500']};
      font-size: ${typography.xs.fontSize};
      text-transform: uppercase;
      ${textStyles(props)};
    }
  `;
});

export function MenuTitle({ children, ...rest }: MenuTitleProps) {
  const { getDataAttributes } = useTheme();

  const content = isValidElement(children) ? (
    children
  ) : (
    <span {...getDataAttributes('MenuTitleText')}>{children}</span>
  );

  return (
    <StyledMenuTitle {...getDataAttributes('MenuTitle')} role="presentation" {...rest}>
      <div {...getDataAttributes('MenuTitleContent')}>{content}</div>
    </StyledMenuTitle>
  );
}

MenuTitle.displayName = 'MenuTitle';
