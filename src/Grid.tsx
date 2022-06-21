import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StringOrNumber } from '@gilbarbara/types';
import { StandardLonghandProperties, StandardShorthandProperties } from 'csstype';

import { px } from './modules/helpers';
import {
  backgroundStyles,
  baseStyles,
  borderStyles,
  displayStyles,
  flexItemStyles,
  getStyledOptions,
  layoutStyles,
  marginStyles,
  paddingStyles,
  positioningStyles,
  radiusStyles,
  shadowStyles,
} from './modules/system';
import {
  ComponentProps,
  StyledProps,
  WithBorder,
  WithChildren,
  WithColor,
  WithFlexItem,
  WithLayout,
  WithMargin,
  WithPadding,
  WithPositioning,
  WithRadius,
  WithShadow,
} from './types';

export interface GridKnownProps
  extends StyledProps,
    WithBorder,
    WithChildren,
    WithColor,
    WithFlexItem,
    WithLayout,
    WithMargin,
    WithPadding,
    WithPositioning,
    WithRadius,
    WithShadow {
  alignContent?: StandardLonghandProperties['alignContent'];
  alignItems?: StandardLonghandProperties['alignItems'];
  autoColumns?: StandardLonghandProperties['gridAutoColumns'];
  autoFlow?: StandardLonghandProperties['gridAutoFlow'];
  autoRows?: StandardLonghandProperties['gridAutoRows'];
  columnGap?: StringOrNumber;
  display?: 'grid' | 'inline-grid';
  gap?: StringOrNumber;
  grid?: StandardShorthandProperties['grid'];
  justifyContent?: StandardLonghandProperties['justifyContent'];
  justifyItems?: StandardLonghandProperties['justifyItems'];
  placeContent?: StandardLonghandProperties['placeContent'];
  placeItems?: StandardShorthandProperties['placeItems'];
  rowGap?: StringOrNumber;
  template?: StandardShorthandProperties['gridTemplate'];
  templateAreas?: StandardLonghandProperties['gridTemplateAreas'];
  templateColumns?: StandardLonghandProperties['gridTemplateColumns'];
  templateRows?: StandardLonghandProperties['gridTemplateRows'];
}

export type GridProps = ComponentProps<HTMLDivElement, GridKnownProps>;

export const StyledGrid = styled(
  'div',
  getStyledOptions(),
)<GridProps>(props => {
  const {
    alignContent,
    alignItems,
    autoColumns,
    autoFlow,
    autoRows,
    columnGap,
    gap,
    grid,
    justifyContent,
    justifyItems,
    placeContent,
    placeItems,
    rowGap,
    template,
    templateAreas,
    templateColumns,
    templateRows,
  } = props;

  return css`
    align-content: ${alignContent};
    align-items: ${alignItems};
    column-gap: ${columnGap && px(columnGap)};
    gap: ${gap && px(gap)};
    grid-auto-columns: ${autoColumns};
    grid-auto-flow: ${autoFlow};
    grid-auto-rows: ${autoRows};
    grid-template-areas: ${templateAreas};
    grid-template-columns: ${templateColumns};
    grid-template-rows: ${templateRows};
    grid-template: ${template};
    grid: ${grid};
    justify-content: ${justifyContent};
    justify-items: ${justifyItems};
    place-content: ${placeContent};
    place-items: ${placeItems};
    row-gap: ${rowGap && px(rowGap)};

    ${baseStyles(props)};
    ${backgroundStyles(props, false)};
    ${borderStyles(props)};
    ${displayStyles(props)};
    ${flexItemStyles(props)};
    ${layoutStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${positioningStyles(props)};
    ${radiusStyles(props)};
    ${shadowStyles(props)};
  `;
});

export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => (
  <StyledGrid ref={ref} data-component-name="Grid" {...props} />
));

Grid.defaultProps = {
  display: 'grid',
};
