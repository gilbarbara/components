import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ceil } from '@gilbarbara/helpers';

import { px } from './modules/helpers';
import { baseStyles, getStyledOptions, marginStyles } from './modules/system';
import { ComponentProps, StyledProps, WithChildren, WithMargin } from './types';

export interface ResponsiveMediaKnownProps extends StyledProps, WithChildren, WithMargin {
  height: number;
  maxWidth?: number;
  width: number;
}

export type ResponsiveMediaProps = ComponentProps<HTMLDivElement, ResponsiveMediaKnownProps>;

export const StyledResponsiveMedia = styled(
  'div',
  getStyledOptions(),
)<ResponsiveMediaProps>(props => {
  const { height, maxWidth, width } = props;

  return css`
    ${baseStyles(props)};
    max-width: ${maxWidth ? px(maxWidth) : px(width)};
    overflow: hidden;
    width: 100%;
    ${marginStyles(props)};

    > div {
      padding-bottom: calc(${ceil(height / width)} * 100%);
      position: relative;
      width: 100%;

      > * {
        height: 100%;
        left: 0;
        max-width: 100%;
        position: absolute;
        top: 0;
      }
    }
  `;
});

export const ResponsiveMedia = forwardRef<HTMLDivElement, ResponsiveMediaProps>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <StyledResponsiveMedia ref={ref} data-component-name="ResponsiveMedia" {...rest}>
      <div>{children}</div>
    </StyledResponsiveMedia>
  );
});
