import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyledOptions, getStyles } from '~/modules/system';

import { WithTheme } from '~/types';

import { BoxProps, useBox } from './useBox';

export const StyledBox = styled(
  'div',
  getStyledOptions('fill'),
)<BoxProps & WithTheme>(props => getStyles(props, { skipBorder: true }));

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useBox(props);

  return <StyledBox ref={ref} {...getDataAttributes('Box')} {...componentProps} />;
});

Box.displayName = 'Box';

export { defaultProps, type BoxProps } from './useBox';
