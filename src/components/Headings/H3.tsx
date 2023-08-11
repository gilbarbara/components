import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyledOptions } from '~/modules/system';

import { defaultProps, getStyles, HeadingProps } from './utils';

export const StyledH3 = styled(
  'h3',
  getStyledOptions(),
)<HeadingProps>(props => {
  return getStyles('h3', props);
});

export const H3 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => (
  <StyledH3 ref={ref} data-component-name="H3" {...defaultProps} {...props} />
));

H3.displayName = 'H3';
