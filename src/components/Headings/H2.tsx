import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyledOptions } from '~/modules/system';

import { WithTheme } from '~/types';

import { HeadingProps, headingStyle, useHeading } from './useHeading';

export const StyledH2 = styled(
  'h2',
  getStyledOptions(),
)<HeadingProps & WithTheme>(props => {
  return headingStyle('h2', props);
});

export const H2 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useHeading(props);

  return <StyledH2 ref={ref} {...getDataAttributes('H2')} {...componentProps} />;
});

H2.displayName = 'H2';
