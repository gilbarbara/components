import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';

import { useTheme } from '~/hooks/useTheme';

import { getStyledOptions } from '~/modules/system';

import { defaultProps, getStyles, HeadingProps } from './utils';

export const StyledH4 = styled(
  'h4',
  getStyledOptions(),
)<HeadingProps>(props => {
  return getStyles('h4', props);
});

export const H4 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const mergedProps = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();

  return <StyledH4 ref={ref} {...getDataAttributes('H4')} {...mergedProps} />;
});

H4.displayName = 'H4';
