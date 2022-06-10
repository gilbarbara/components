import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyles, HeadingLargeProps } from './utils';

import { getStyledOptions } from '../modules/system';

export const StyledJumbo = styled(
  'h1',
  getStyledOptions(),
)<HeadingLargeProps>(props => {
  const { large } = props;

  return getStyles(large ? 'jumboLarge' : 'jumbo', props);
});

export const Jumbo = forwardRef<HTMLHeadingElement, HeadingLargeProps>((props, ref) => (
  <StyledJumbo ref={ref} data-component-name="Jumbo" {...props} />
));

Jumbo.defaultProps = {
  large: false,
  light: false,
};
