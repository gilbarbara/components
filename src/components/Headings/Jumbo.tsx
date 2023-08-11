import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyledOptions } from '~/modules/system';

import { getStyles, HeadingLargeProps, jumboDefaultProps } from './utils';

export const StyledJumbo = styled(
  'h1',
  getStyledOptions(),
)<HeadingLargeProps>(props => {
  const { large } = props;

  return getStyles(large ? 'jumboLarge' : 'jumbo', props);
});

export const Jumbo = forwardRef<HTMLHeadingElement, HeadingLargeProps>((props, ref) => (
  <StyledJumbo ref={ref} data-component-name="Jumbo" {...jumboDefaultProps} {...props} />
));

Jumbo.displayName = 'Jumbo';
