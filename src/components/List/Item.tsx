import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { boxStyles, getStyledOptions } from '~/modules/system';

import { Box, BoxProps } from '~/components/Box';

import { Theme } from '~/types';

import { defaultProps, ListProps } from './utils';

function getSpacing(size: Required<ListProps['size']>, spacing: Theme['spacing']) {
  switch (size) {
    case 'sm': {
      return [spacing.xs, spacing.sm];
    }
    case 'lg': {
      return [spacing.md, spacing.lg];
    }
    default: {
      return [spacing.sm, spacing.md];
    }
  }
}

export const StyledListItem = styled(
  Box,
  getStyledOptions(),
)<Pick<ListProps, 'border' | 'borderColor' | 'direction' | 'divider' | 'size'>>(props => {
  const { border, borderColor = defaultProps.borderColor, direction, divider, size } = props;
  const { black, spacing, white, ...theme } = getTheme(props);
  const [spacerMain, spacerCross] = getSpacing(size, spacing);
  const { mainColor } = getColorTokens(borderColor, null, theme);

  return css`
    ${direction === 'vertical' &&
    css`
      border-bottom: ${divider ? `1px solid ${mainColor}` : undefined};
      padding: ${spacerMain} ${border ? spacerCross : 0};

      &:last-of-type {
        border-bottom: none;
      }
    `};

    ${direction === 'horizontal' &&
    css`
      border-right: ${divider ? `1px solid ${mainColor}` : undefined};
      padding: ${border ? spacerMain : 0} ${spacerCross};

      &:last-of-type {
        border-right: none;
      }
    `};

    ${boxStyles(omit(props, 'border'))};
  `;
});

export function ListItem(props: Omit<BoxProps, 'direction'>) {
  return <StyledListItem as="li" data-component-name="ListItem" {...props} />;
}
