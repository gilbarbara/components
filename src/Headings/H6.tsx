import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyles, HeadingProps } from './utils';

import { getStyledOptions } from '../modules/system';

export const StyledH6 = styled(
  'h6',
  getStyledOptions(),
)<HeadingProps>(props => {
  return getStyles('h6', props);
});

export const H6 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => (
  <StyledH6 ref={ref} data-component-name="H6" {...props} />
));

H6.defaultProps = {
  light: false,
};
