import { CSSProperties, isValidElement, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme } from '~/modules/helpers';
import { getStyledOptions } from '~/modules/system';

interface MenuTitleProps {
  children: ReactNode;
  style?: CSSProperties;
}

const StyledMenuTitle = styled(
  'li',
  getStyledOptions(),
)(props => {
  const { grayScale, spacing, typography } = getTheme(props);

  return css`
    [data-component-name='MenuTitleContent'] {
      padding: ${spacing.xs} ${spacing.sm};
    }

    [data-component-name='MenuTitleText'] {
      color: ${grayScale['500']};
      font-size: ${typography.xs.fontSize};
      text-transform: uppercase;
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
