import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme } from '../modules/helpers';
import { getStyledOptions } from '../modules/system';

const StyledMenuDivider = styled(
  'div',
  getStyledOptions(),
)(props => {
  const { grayLight, spacing } = getTheme(props);

  return css`
    background-color: ${grayLight};
    height: 1px;
    margin-bottom: ${spacing.xxs};
    margin-top: ${spacing.xxs};
  `;
});

export function MenuDivider() {
  return <StyledMenuDivider data-component-name="MenuDivider" />;
}
