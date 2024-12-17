import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyledOptions, getStyles } from '~/modules/system';

import { WithTheme } from '~/types';

import { GridProps, useGrid } from './useGrid';

export const StyledGrid = styled('div', getStyledOptions())<GridProps & WithTheme>(
  {
    display: 'grid',
  },
  props => getStyles(props, { skipBorder: true, useFontSize: true }),
);

export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useGrid(props);

  return <StyledGrid ref={ref} {...getDataAttributes('Grid')} {...componentProps} />;
});

Grid.displayName = 'Grid';

export { type GridProps } from './useGrid';
