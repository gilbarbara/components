import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyledOptions } from '~/modules/system';

import { defaultProps, getStyles, HeadingProps } from './utils';

export const StyledH1 = styled(
  'h1',
  getStyledOptions(),
)<HeadingProps>(props => {
  return getStyles('h1', props);
});

export const H1 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => (
  <StyledH1 ref={ref} data-component-name="H1" {...defaultProps} {...props} />
));

H1.displayName = 'H1';
