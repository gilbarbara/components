import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px, round } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import { baseStyles, getStyledOptions, marginStyles } from '~/modules/system';

import { StyledProps, WithChildren, WithHTMLAttributes, WithMargin } from '~/types';

export interface AspectRatioKnownProps
  extends StyledProps,
    WithChildren,
    WithHTMLAttributes,
    WithMargin {
  maxWidth?: number;
  ratio: number;
}

export type AspectRatioProps = Simplify<AspectRatioKnownProps>;

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
  const { getDataAttributes } = useTheme();

  return (
    <StyledAspectRatio ref={ref} {...getDataAttributes('AspectRatio')} {...rest}>
      {children}
    </StyledAspectRatio>
  );
});

AspectRatio.displayName = 'AspectRatio';
