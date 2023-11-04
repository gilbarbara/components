import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px, round } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

import { baseStyles, getStyledOptions, marginStyles } from '~/modules/system';

import { OmitElementProps, StyledProps, WithChildren, WithMargin } from '~/types';

export interface AspectRatioKnownProps extends StyledProps, WithChildren, WithMargin {
  maxWidth?: number;
  ratio: number;
}

export type AspectRatioProps = Simplify<OmitElementProps<HTMLDivElement, AspectRatioKnownProps>>;

export const StyledAspectRatio = styled(
  'div',
  getStyledOptions(),
)<AspectRatioProps>(props => {
  const { maxWidth, ratio } = props;

  return css`
    ${baseStyles(props)};
    max-width: ${maxWidth ? px(maxWidth) : 'none'};
    overflow: hidden;
    position: relative;
    width: 100%;
    ${marginStyles(props)};

    &:before {
      content: '';
      display: flex;
      padding-bottom: ${`${round((1 / ratio) * 100)}%`};
      width: 100%;
    }

    > img,
    > video {
      object-fit: cover;
    }

    > * {
      align-self: center;
      display: flex;
      height: 100%;
      inset: 0;
      justify-content: center;
      position: absolute;
      width: 100%;
    }
  `;
});

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <StyledAspectRatio ref={ref} data-component-name="AspectRatio" {...rest}>
      {children}
    </StyledAspectRatio>
  );
});

AspectRatio.displayName = 'AspectRatio';
