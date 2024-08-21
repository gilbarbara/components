import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyledOptions } from '~/modules/system';

import { WithTheme } from '~/types';

import { HeadingProps, headingStyle, useHeading } from './useHeading';

export const StyledH6 = styled(
  'h6',
  getStyledOptions(),
)<HeadingProps & WithTheme>(props => headingStyle('h6', props));

export const H6 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useHeading(props);

  return <StyledH6 ref={ref} {...getDataAttributes('H6')} {...componentProps} />;
});

H6.displayName = 'H6';
