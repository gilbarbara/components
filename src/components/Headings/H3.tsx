import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyledOptions } from '~/modules/system';

import { WithTheme } from '~/types';

import { HeadingProps, headingStyle, useHeading } from './useHeading';

export const StyledH3 = styled(
  'h3',
  getStyledOptions(),
)<HeadingProps & WithTheme>(props => {
  return headingStyle('h3', props);
});

export const H3 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useHeading(props);

  return <StyledH3 ref={ref} {...getDataAttributes('H3')} {...componentProps} />;
});

H3.displayName = 'H3';
