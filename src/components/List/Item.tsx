import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';

import { getColorTokens } from '~/modules/colors';
import { getStyledOptions, getStyles } from '~/modules/system';

import { Box } from '~/components/Box';

import { Theme, WithTheme } from '~/types';

import { getBorderColor, ListItemProps, ListProps, useListItem } from './useList';

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
)<ListItemProps & WithTheme>(props => {
  const { hideBorder, hideDivider, orientation, size, theme } = props;
  const { spacing } = theme;
  const [spacerMain, spacerCross] = getSpacing(size, spacing);
  const { mainColor } = getColorTokens(getBorderColor(props), null, theme);

  return css`
    ${orientation === 'vertical' &&
    css`
      border-bottom: ${hideDivider ? undefined : `1px solid ${mainColor}`};
      padding: ${spacerMain} ${hideBorder ? 0 : spacerCross};

      &:last-of-type {
        border-bottom: none;
      }
    `};

    ${orientation === 'horizontal' &&
    css`
      border-right: ${hideDivider ? undefined : `1px solid ${mainColor}`};
      padding: ${hideBorder ? 0 : spacerMain} ${spacerCross};

      &:last-of-type {
        border-right: none;
      }
    `};

    ${getStyles(omit(props, 'border'), { skipBorder: true })};
  `;
});

export function ListItem(props: ListItemProps) {
  const {
    componentProps: { orientation, ...rest },
    getDataAttributes,
  } = useListItem(props);

  return (
    <StyledListItem
      as="li"
      {...getDataAttributes('ListItem')}
      {...rest}
      orientation={orientation}
    />
  );
}
