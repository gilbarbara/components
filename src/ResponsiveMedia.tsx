import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ceil } from '@gilbarbara/helpers';

import { px } from './modules/helpers';
import { baseStyles, marginStyles, styledOptions } from './modules/system';
import { ComponentProps, StyledProps, WithMargin } from './types';

export interface BoxKnownProps extends StyledProps, WithMargin {
  children?: React.ReactNode;
  height: number;
  maxWidth?: number;
  width: number;
}

export type ResponsiveMediaProps = ComponentProps<HTMLDivElement, BoxKnownProps>;

export const StyledResponsiveMedia = styled(
  'div',
  styledOptions,
)<ResponsiveMediaProps>(props => {
  const { height, maxWidth, width } = props;

  return css`
    ${baseStyles(props)};
    ${marginStyles(props)};
    max-width: ${maxWidth ? px(maxWidth) : px(width)};
    overflow: hidden;
    width: 100%;

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

export const ResponsiveMedia = React.forwardRef<HTMLDivElement, ResponsiveMediaProps>(
  (props, ref) => {
    const { children, ...rest } = props;

    return (
      <StyledResponsiveMedia ref={ref} data-component-name="ResponsiveMedia" {...rest}>
        <div>{children}</div>
      </StyledResponsiveMedia>
    );
  },
);

ResponsiveMedia.displayName = 'ResponsiveMedia';
