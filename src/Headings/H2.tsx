import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyles, HeadingProps } from './utils';

import { getStyledOptions } from '../modules/system';

export const StyledH2 = styled(
  'h2',
  getStyledOptions(),
)<HeadingProps>(props => {
  return getStyles('h2', props);
});

export const H2 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => (
  <StyledH2 ref={ref} data-component-name="H2" {...props} />
));

H2.defaultProps = {
  light: false,
};
