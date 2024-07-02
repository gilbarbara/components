import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme } from '~/modules/helpers';
import { getStyledOptions, marginStyles } from '~/modules/system';

import { MenuSeparatorProps } from './types';

const StyledMenuSeparator = styled(
  'div',
  getStyledOptions(),
)(props => {
  const { grayScale } = getTheme(props);

  return css`
    background-color: ${grayScale['200']};
    height: 1px;
    ${marginStyles(props)};
  `;
});

export function MenuSeparator(props: MenuSeparatorProps) {
  return <StyledMenuSeparator data-component-name="MenuSeparator" role="separator" {...props} />;
}

MenuSeparator.displayName = 'MenuSeparator';
