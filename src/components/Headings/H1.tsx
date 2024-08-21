import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyledOptions } from '~/modules/system';

import { WithTheme } from '~/types';

import { HeadingProps, headingStyle, useHeading } from './useHeading';

export const StyledH1 = styled(
  'h1',
  getStyledOptions(),
)<HeadingProps & WithTheme>(props => headingStyle('h1', props));

export const H1 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useHeading(props);

  return <StyledH1 ref={ref} {...getDataAttributes('H1')} {...componentProps} />;
});

H1.displayName = 'H1';
