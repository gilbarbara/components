import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { getStyledOptions } from '~/modules/system';

import { WithTheme } from '~/types';

import { HeadingProps, headingStyle, useHeading } from './useHeading';

export const StyledH5 = styled(
  'h5',
  getStyledOptions(),
)<HeadingProps & WithTheme>(props => {
  return headingStyle('h5', props);
});

export const H5 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useHeading(props);

  return <StyledH5 ref={ref} {...getDataAttributes('H5')} {...componentProps} />;
});

H5.displayName = 'H5';
