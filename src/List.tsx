import { forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import is from 'is-lite';

import { getColorVariant, getTheme } from './modules/helpers';
import {
  baseStyles,
  borderStyles,
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
  WithBorder,
  WithColor,
  WithFlexItem,
  WithLayout,
  WithMargin,
  WithRadius,
  WithShadow,
} from './types';

export interface ListKnownProps
  extends StyledProps,
    WithBorder,
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
  const { border, direction, shade, variant } = props;

  const borderProps = { ...props };

  if (border === true && (shade !== 'lighter' || variant !== 'gray')) {
    borderProps.border = [{ side: 'all', shade, variant }];
  }

  return css`
    ${baseStyles(props)};
    display: flex;
    flex-direction: ${direction === 'horizontal' ? 'row' : 'column'};
    list-style-position: inside;
    list-style-type: none;
    margin: 0;
    overflow: hidden;
    padding: 0;
    ${borderStyles(borderProps)};
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
  Required<Pick<ListProps, 'border' | 'direction' | 'shade' | 'size' | 'split' | 'variant'>> & {
    itemShade?: Shades;
    itemVariant?: Variants;
  }
>(props => {
  const { black, spacing, variants, white } = getTheme(props);
  const {
    border,
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
      padding: ${spacerMain} ${border ? spacerCross : 0};

      &:last-of-type {
        border-bottom: none;
      }
    `};

    ${direction === 'horizontal' &&
    css`
      border-right: ${split ? `1px solid ${borderColor}` : undefined};
      padding: ${border ? spacerMain : 0} ${spacerCross};

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
    border = true,
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
            border={border}
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
  border: true,
  direction: 'vertical',
  radius: 'xs',
  shade: 'lighter',
  shadow: false,
  size: 'md',
  split: true,
  variant: 'gray',
};
