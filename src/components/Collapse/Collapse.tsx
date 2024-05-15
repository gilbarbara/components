import { isValidElement, ReactNode, useEffect, useRef, useState } from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, px } from '@gilbarbara/helpers';
import { usePrevious } from '@gilbarbara/hooks';
import { SetRequired, Simplify, StringOrNumber } from '@gilbarbara/types';
import is from 'is-lite';

import { getTheme } from '~/modules/helpers';
import { baseStyles, marginStyles } from '~/modules/system';

import { Icon } from '~/components/Icon';
import { Paragraph } from '~/components/Paragraph';

import { WithMargin } from '~/types';

export interface CollapseKnownProps extends WithMargin {
  /**
   * The duration of the animation when the content is sliding down in seconds.
   * @default 0.3
   */
  animationEnterDuration?: number;
  /**
   * The duration of the animation when the content is sliding up in seconds.
   * @default 0.3
   */
  animationExitDuration?: number;
  children: ReactNode;
  defaultOpen?: boolean;
  hideToggle?: boolean;
  /**
   * The height you want the content in its collapsed state.
   * @default 0
   */
  initialHeight?: StringOrNumber;
  /**
   * The height you want the content in its expanded state.
   */
  maxHeight?: StringOrNumber;
  onToggle?: (isOpen: boolean) => void;
  open?: boolean;
  title?: ReactNode;
}

export type CollapseProps = Simplify<CollapseKnownProps>;

export const defaultProps = {
  animationEnterDuration: 0.3,
  animationExitDuration: 0.3,
  defaultOpen: false,
  hideToggle: false,
  initialHeight: 0,
} satisfies Omit<CollapseProps, 'children'>;

const getContentAnimation = (initialHeight: StringOrNumber, endHeight: StringOrNumber) => keyframes`
  0% {
    height: ${px(initialHeight)};
    opacity: ${initialHeight ? 1 : 0};
  }
  100% {
    height: ${px(endHeight)};
    opacity: 1;
  }
`;

export const StyledCollapse = styled('div')<Omit<CollapseProps, 'children'>>(props => {
  return css`
    ${baseStyles(props)};
    display: flex;
    flex-direction: column;
    ${marginStyles(props)};
  `;
});

const Header = styled('header')`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

interface ContentProps
  extends Pick<
    SetRequired<
      CollapseProps,
      'animationEnterDuration' | 'animationExitDuration' | 'initialHeight'
    >,
    'animationEnterDuration' | 'animationExitDuration' | 'initialHeight' | 'maxHeight'
  > {
  hasTitle: boolean;
  isOpen: boolean;
  scrollHeight: number;
  shouldAnimate: boolean;
}

const Content = styled('div')<ContentProps>(props => {
  const {
    animationEnterDuration,
    animationExitDuration,
    hasTitle,
    initialHeight,
    isOpen,
    maxHeight,
    scrollHeight,
    shouldAnimate,
  } = props;
  const { spacing } = getTheme(props);

  let animation;
  let height = initialHeight;

  if (shouldAnimate) {
    animation = isOpen
      ? css`
          animation: ${getContentAnimation(initialHeight, maxHeight ?? scrollHeight)}
            ${animationEnterDuration}s ease-in-out forwards;
        `
      : css`
          animation: ${getContentAnimation(initialHeight, maxHeight ?? scrollHeight)}
            ${animationExitDuration}s ease-in-out reverse;
        `;
  } else {
    height = isOpen ? maxHeight ?? scrollHeight : initialHeight;
  }

  return css`
    ${animation};
    height: ${px(height)};
    overflow: hidden;
    ${hasTitle && `margin-top: ${px(spacing.xs)}`};
  `;
});

export function Collapse(props: CollapseProps) {
  const { children, defaultOpen, hideToggle, onToggle, open, title, ...rest } = mergeProps(
    defaultProps,
    props,
  );

  const isControlled = typeof open === 'boolean';
  const [isOpen, setIsOpen] = useState(isControlled ? open : defaultOpen);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const previousIsOpen = usePrevious(isOpen);

  useEffect(() => {
    if (isControlled) {
      setIsOpen(open);
      setShouldAnimate(is.boolean(previousIsOpen) && previousIsOpen !== open);
    }
  }, [isControlled, open, previousIsOpen]);

  const handleAnimationEnd = () => {
    setShouldAnimate(false);
  };

  const handleClickToggle = () => {
    if (!isControlled) {
      setIsOpen(!isOpen);
      setShouldAnimate(true);
    }

    onToggle?.(!isOpen);
  };

  return (
    <StyledCollapse
      data-component-name="Collapse"
      data-state={isOpen ? 'open' : 'closed'}
      {...rest}
    >
      {Boolean(title) && (
        <Header data-component-name="CollapseHeader" onClick={handleClickToggle}>
          {isValidElement(title) ? title : <Paragraph>{title}</Paragraph>}
          {!hideToggle && isOpen ? <Icon name="chevron-up" /> : <Icon name="chevron-down" />}
        </Header>
      )}
      <Content
        ref={contentRef}
        data-component-name="CollapseContent"
        hasTitle={Boolean(title)}
        isOpen={isOpen}
        onAnimationEnd={handleAnimationEnd}
        scrollHeight={contentRef.current?.scrollHeight ?? 0}
        shouldAnimate={shouldAnimate}
        {...rest}
      >
        {children}
      </Content>
    </StyledCollapse>
  );
}

Collapse.displayName = 'Collapse';
