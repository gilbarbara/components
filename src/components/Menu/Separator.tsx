import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme } from '~/modules/helpers';
import { getStyledOptions } from '~/modules/system';

const StyledMenuSeparator = styled(
  'div',
  getStyledOptions(),
)(props => {
  const { grayScale, spacing } = getTheme(props);

  return css`
    background-color: ${grayScale['200']};
    height: 1px;
    margin-bottom: ${spacing.xxs};
    margin-top: ${spacing.xxs};
  `;
});

export function MenuSeparator() {
  return <StyledMenuSeparator data-component-name="MenuSeparator" role="separator" />;
}

MenuSeparator.displayName = 'MenuSeparator';
