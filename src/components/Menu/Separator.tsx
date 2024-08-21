import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getStyledOptions, marginStyles } from '~/modules/system';

import { WithTheme } from '~/types';

import { MenuSeparatorProps, useMenu } from './useMenu';

const StyledMenuSeparator = styled(
  'div',
  getStyledOptions(),
)<MenuSeparatorProps & WithTheme>(props => {
  const {
    theme: { grayScale },
  } = props;

  return css`
    background-color: ${grayScale['200']};
    height: 1px;
    ${marginStyles(props)};
  `;
});

export function MenuSeparator(props: MenuSeparatorProps) {
  const { componentProps, getDataAttributes } = useMenu<MenuSeparatorProps>(props);

  return (
    <StyledMenuSeparator
      {...getDataAttributes('MenuSeparator')}
      role="separator"
      {...componentProps}
    />
  );
}

MenuSeparator.displayName = 'MenuSeparator';
