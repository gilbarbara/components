import { forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import is from 'is-lite';

import { getColorVariant, getTheme } from './modules/helpers';
import {
  baseStyles,
  flexItemStyles,
  getStyledOptions,
  layoutStyles,
  marginStyles,
  radiusStyles,
  shadowStyles,
} from './modules/system';
import {
  ComponentProps,
  Direction,
  ListItem,
  Shades,
  StyledProps,
  Theme,
  Variants,
  WithBorderless,
  WithColor,
  WithFlexItem,
  WithLayout,
  WithMargin,
  WithRadius,
  WithShadow,
} from './types';

export interface ListKnownProps
  extends StyledProps,
    WithBorderless,
    WithColor,
    WithFlexItem,
    WithLayout,
    WithMargin,
    WithRadius,
    WithShadow {
  /** @default vertical */
  direction?: Direction;
  items: (ListItem | ReactNode)[];
  /** @default md */
  size?: 'sm' | 'md' | 'lg';
  /** @default true */
  split?: boolean;
}

export type ListProps = ComponentProps<HTMLUListElement, ListKnownProps>;

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

export const StyledList = styled(
  'ul',
  getStyledOptions(),
)<ListProps>(props => {
  const { borderless, direction, shade = 'lighter', variant = 'gray' } = props;
  const { variants } = getTheme(props);
  const { bg: borderColor } = getColorVariant(variant, shade, variants);

  return css`
    ${baseStyles(props)};
    border: ${borderless ? undefined : `1px solid ${borderColor}`};
    display: flex;
    flex-direction: ${direction === 'horizontal' ? 'row' : 'column'};
    list-style-position: inside;
    list-style-type: none;
    margin: 0;
    overflow: hidden;
    padding: 0;
    ${flexItemStyles(props)};
    ${layoutStyles(props)};
    ${marginStyles(props)};
    ${radiusStyles(props)};
    ${shadowStyles(props)};
  `;
});

export const StyledListItem = styled(
  'li',
  getStyledOptions(),
)<
  Required<Pick<ListProps, 'borderless' | 'direction' | 'shade' | 'size' | 'split' | 'variant'>> & {
    itemShade?: Shades;
    itemVariant?: Variants;
  }
>(props => {
  const { black, spacing, variants, white } = getTheme(props);
  const {
    borderless,
    direction,
    itemShade,
    itemVariant,
    shade = 'lighter',
    size,
    split,
    variant = 'gray',
  } = props;
  const [spacerMain, spacerCross] = getSpacing(size, spacing);
  let bgColor = white;
  let itemColor = black;
  let { bg: borderColor } = getColorVariant(variant, shade, variants);

  if (itemVariant) {
    const { bg, color } = getColorVariant(itemVariant, itemShade, variants);

    bgColor = bg;
    borderColor = bg;
    itemColor = color;
  }

  return css`
    background-color: ${bgColor};
    color: ${itemColor};

    ${direction === 'vertical' &&
    css`
      border-bottom: ${split ? `1px solid ${borderColor}` : undefined};
      padding: ${spacerMain} ${borderless ? 0 : spacerCross};

      &:last-of-type {
        border-bottom: none;
      }
    `};

    ${direction === 'horizontal' &&
    css`
      border-right: ${split ? `1px solid ${borderColor}` : undefined};
      padding: ${borderless ? 0 : spacerMain} ${spacerCross};

      &:last-of-type {
        border-right: none;
      }
    `};
  `;
});

function isListItem(item: unknown): item is ListItem {
  return is.plainObject(item) && 'content' in item;
}

export const List = forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  const {
    borderless = false,
    direction = 'vertical',
    items,
    shade = 'lighter',
    size = 'md',
    split = true,
    variant = 'gray',
  } = props;

  if (!items.length) {
    return null;
  }

  return (
    <StyledList ref={ref} data-component-name="List" {...props}>
      {items.map((item, index) => {
        const key = `ListItem-${index}`;
        let content;
        let itemShade: Shades | undefined;
        let itemVariant: Variants | undefined;

        if (isListItem(item)) {
          content = (item as ListItem).content;
          itemShade = item.shade;
          itemVariant = item.variant;
        } else {
          content = item;
        }

        return (
          <StyledListItem
            key={key}
            borderless={borderless}
            direction={direction}
            itemShade={itemShade}
            itemVariant={itemVariant}
            shade={shade}
            size={size}
            split={split}
            variant={variant}
          >
            {content}
          </StyledListItem>
        );
      })}
    </StyledList>
  );
});

List.defaultProps = {
  borderless: false,
  direction: 'vertical',
  radius: 'xs',
  shade: 'lighter',
  shadow: false,
  size: 'md',
  split: true,
  variant: 'gray',
};
