import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { boxStyles, getStyledOptions } from '~/modules/system';

import { Box } from '~/components/Box';

import { Direction, Theme } from '~/types';
import type { BoxProps } from '~/types/props';

import { getBorderColor, ListProps } from './utils';

export interface ListItemProps
  extends Omit<BoxProps, 'direction'>,
    Pick<ListProps, 'borderColor' | 'direction' | 'hideBorder' | 'hideDivider' | 'size'> {}

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
)<ListItemProps & { listDirection?: Direction }>(props => {
  const { hideBorder, hideDivider, listDirection: direction, size } = props;
  const { black, spacing, white, ...theme } = getTheme(props);
  const [spacerMain, spacerCross] = getSpacing(size, spacing);
  const { mainColor } = getColorTokens(getBorderColor(props), null, theme);

  return css`
    ${direction === 'vertical' &&
    css`
      border-bottom: ${hideDivider ? undefined : `1px solid ${mainColor}`};
      padding: ${spacerMain} ${hideBorder ? 0 : spacerCross};

      &:last-of-type {
        border-bottom: none;
      }
    `};

    ${direction === 'horizontal' &&
    css`
      border-right: ${hideDivider ? undefined : `1px solid ${mainColor}`};
      padding: ${hideBorder ? 0 : spacerMain} ${spacerCross};

      &:last-of-type {
        border-right: none;
      }
    `};

    ${boxStyles(omit(props, 'border'))};
  `;
});

export function ListItem(props: ListItemProps) {
  const { direction, ...rest } = props;

  return (
    <StyledListItem as="li" data-component-name="ListItem" {...rest} listDirection={direction} />
  );
}
