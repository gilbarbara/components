import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StringOrNumber } from '@gilbarbara/types';
import { StandardLonghandProperties, StandardShorthandProperties } from 'csstype';

import { Box, BoxProps } from './Box';
import { px } from './modules/helpers';
import { WithChildren } from './types';

export interface GridProps extends Omit<BoxProps, 'children'>, WithChildren {
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

export const StyledGrid = styled(Box)<GridProps>(props => {
  const {
    alignContent,
    alignItems,
    autoColumns,
    autoFlow,
    autoRows,
    columnGap,
    display = 'grid',
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
    display: ${display};
    gap: ${gap && px(gap)};
    grid-auto-columns: ${autoColumns};
    grid-auto-flow: ${autoFlow};
    grid-auto-rows: ${autoRows};
    grid: ${grid};
    justify-content: ${justifyContent};
    justify-items: ${justifyItems};
    place-content: ${placeContent};
    place-items: ${placeItems};
    row-gap: ${rowGap && px(rowGap)};
    grid-template: ${template};
    grid-template-areas: ${templateAreas};
    grid-template-columns: ${templateColumns};
    grid-template-rows: ${templateRows};
  `;
});

export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => (
  <StyledGrid ref={ref} data-component-name="Grid" {...props} />
));
