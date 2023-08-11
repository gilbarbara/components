import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyledOptions } from '~/modules/system';

import { defaultProps, getStyles, HeadingProps } from './utils';

export const StyledH2 = styled(
  'h2',
  getStyledOptions(),
)<HeadingProps>(props => {
  return getStyles('h2', props);
});

export const H2 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => (
  <StyledH2 ref={ref} data-component-name="H2" {...defaultProps} {...props} />
));

H2.displayName = 'H2';
