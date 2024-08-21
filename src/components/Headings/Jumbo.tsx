import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyledOptions } from '~/modules/system';

import { WithTheme } from '~/types';

import { HeadingLargeProps, headingStyle, useHeading } from './useHeading';

export const StyledJumbo = styled(
  'h1',
  getStyledOptions(),
)<HeadingLargeProps & WithTheme>(props =>
  headingStyle(props.large ? 'jumboLarge' : 'jumbo', props),
);

export const Jumbo = forwardRef<HTMLHeadingElement, HeadingLargeProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useHeading(props, 'jumbo');

  return <StyledJumbo ref={ref} {...getDataAttributes('Jumbo')} {...componentProps} {...props} />;
});

Jumbo.displayName = 'Jumbo';
