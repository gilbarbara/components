import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyles, HeadingProps } from './utils';

import { getStyledOptions } from '../modules/system';

export const StyledH1 = styled(
  'h1',
  getStyledOptions(),
)<HeadingProps>(props => {
  return getStyles('h1', props);
});

export const H1 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => (
  <StyledH1 ref={ref} data-component-name="H1" {...props} />
));

H1.defaultProps = {
  light: false,
};
