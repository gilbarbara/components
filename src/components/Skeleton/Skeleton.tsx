import { forwardRef, isValidElement } from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useIsFirstRun } from '@gilbarbara/hooks';
import { SetRequired } from 'type-fest';

import { baseDefaultProps, SkeletonProps } from './utils';

import { fadeIn } from '../../modules/animations';
import {
  baseStyles,
  getStyledOptions,
  layoutStyles,
  marginStyles,
  radiusStyles,
} from '../../modules/system';

const bgAnimation = keyframes`
  0% {
    background-position: 60% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

export const defaultProps = baseDefaultProps;

export const StyledSkeleton = styled(
  'div',
  getStyledOptions(),
)<
  SetRequired<
    SkeletonProps,
    'accentColor' | 'animationDelay' | 'animationDuration' | 'baseColor' | 'fitContent'
  >
>(props => {
  const { accentColor, animationDelay, animationDuration, baseColor, fitContent } = props;

  return css`
    ${baseStyles(props)};
    animation: ${bgAnimation} ${animationDuration}s infinite ease-in-out;
    animation-delay: ${animationDelay}s;
    background: ${baseColor} linear-gradient(90deg, ${baseColor} 0, ${baseColor} 10%, ${accentColor} 25%, ${baseColor} 40%, ${baseColor} 100%);
    background-position: 60% 0;
    background-repeat: no-repeat;
    background-size: 200% 100%;
    pointer-events: none;
    user-select: none;
    width: ${fitContent ? 'fit-content' : undefined};
    ${layoutStyles(props)};
    ${marginStyles(props)};
    ${radiusStyles(props)};
    
    &:before, &:after, > * {
      visibility: hidden;
    },
  `;
});

const StyledContent = styled(
  'div',
  getStyledOptions(),
)<{ appearDuration: number; isFirstRender: boolean }>(props => {
  const { appearDuration, isFirstRender } = props;

  return css`
    animation: ${isFirstRender
      ? 'none'
      : css`
          ${fadeIn} ${appearDuration}s ease-in-out forwards
        `};
    opacity: ${isFirstRender ? 1 : 0};
  `;
});

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
  const { appearDuration, children, isLoaded, ...rest } = { ...defaultProps, ...props };
  const isFirstRender = useIsFirstRun();

  if (isLoaded) {
    return (
      <StyledContent
        ref={ref}
        appearDuration={appearDuration}
        data-component-name="Skeleton"
        isFirstRender={isFirstRender}
      >
        {children}
      </StyledContent>
    );
  }

  let content;

  if (children) {
    content = isValidElement(children) ? children : <div>{children}</div>;
  }

  return (
    <StyledSkeleton ref={ref} data-component-name="Skeleton" {...rest}>
      {content}
    </StyledSkeleton>
  );
});

Skeleton.displayName = 'Skeleton';
