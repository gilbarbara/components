import { isValidElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colorStyles, getStyledOptions, textStyles } from '~/modules/system';

import { WithTheme } from '~/types';

import { MenuTitleProps, useMenu } from './useMenu';

const StyledMenuTitle = styled(
  'li',
  getStyledOptions(),
)<Omit<MenuTitleProps, 'children'> & WithTheme>(props => {
  const {
    theme: { dataAttributeName, grayScale, spacing, typography },
  } = props;

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

export function MenuTitle(props: MenuTitleProps) {
  const {
    componentProps: { children, ...rest },
    getDataAttributes,
  } = useMenu<MenuTitleProps>(props);

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
