import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { defaultProps, getStyles, HeadingProps } from './utils';

import { getStyledOptions } from '../../modules/system';

export const StyledH5 = styled(
  'h5',
  getStyledOptions(),
)<HeadingProps>(props => {
  return getStyles('h5', props);
});

export const H5 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => (
  <StyledH5 ref={ref} data-component-name="H5" {...defaultProps} {...props} />
));

H5.displayName = 'H5';
