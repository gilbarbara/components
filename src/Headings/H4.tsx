import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { defaultProps, getStyles, HeadingProps } from './utils';

import { getStyledOptions } from '../modules/system';

export const StyledH4 = styled(
  'h4',
  getStyledOptions(),
)<HeadingProps>(props => {
  return getStyles('h4', props);
});

export const H4 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => (
  <StyledH4 ref={ref} data-component-name="H4" {...defaultProps} {...props} />
));
