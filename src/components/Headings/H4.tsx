import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyledOptions } from '~/modules/system';

import { WithTheme } from '~/types';

import { HeadingProps, headingStyle, useHeading } from './useHeading';

export const StyledH4 = styled(
  'h4',
  getStyledOptions(),
)<HeadingProps & WithTheme>(props => {
  return headingStyle('h4', props);
});

export const H4 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useHeading(props);

  return <StyledH4 ref={ref} {...getDataAttributes('H4')} {...componentProps} />;
});

H4.displayName = 'H4';
