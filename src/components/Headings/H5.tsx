import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';

import { useTheme } from '~/hooks/useTheme';

import { getStyledOptions } from '~/modules/system';

import { defaultProps, getStyles, HeadingProps } from './utils';

export const StyledH5 = styled(
  'h5',
  getStyledOptions(),
)<HeadingProps>(props => {
  return getStyles('h5', props);
});

export const H5 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const mergedProps = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();

  return <StyledH5 ref={ref} {...getDataAttributes('H5')} {...mergedProps} />;
});

H5.displayName = 'H5';
