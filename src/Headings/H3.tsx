import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyles, HeadingProps } from './utils';

import { getStyledOptions } from '../modules/system';

export const StyledH3 = styled(
  'h3',
  getStyledOptions(),
)<HeadingProps>(props => {
  return getStyles('h3', props);
});

export const H3 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => (
  <StyledH3 ref={ref} data-component-name="H3" {...props} />
));

H3.defaultProps = {
  light: false,
};
