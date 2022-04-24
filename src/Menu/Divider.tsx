import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme } from '../modules/helpers';

const StyledMenuDivider = styled.div(props => {
  const { grayLight, spacing } = getTheme(props);

  return css`
    background-color: ${grayLight};
    height: 0.1rem;
    margin-bottom: ${spacing.xxs};
    margin-top: ${spacing.xxs};
  `;
});

export function MenuDivider() {
  return <StyledMenuDivider data-component-name="MenuDivider" />;
}
