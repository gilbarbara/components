import { isValidElement, ReactNode, useEffect, useId, useRef, useState } from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { usePrevious } from '@gilbarbara/hooks';
import { SetRequired, StringOrNumber } from '@gilbarbara/types';
import is from 'is-lite';

import { getColorTokens } from '~/modules/colors';
import { getStyles, outlineStyles } from '~/modules/system';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { Flex, FlexInline } from '~/components/Flex';
import { Icon } from '~/components/Icon';

import { WithTheme } from '~/types';

import { CollapseProps, ContentProps, useCollapse } from './useCollapse';

const StyledCollapse = styled('div')<Omit<CollapseProps, 'children'> & WithTheme>(
  {
    display: 'flex',
    flexDirection: 'column',
  },
  props => getStyles(props),
);

const Header = styled.button<
  SetRequired<Pick<CollapseProps, 'bg' | 'color' | 'disabled' | 'gap'>, 'disabled' | 'gap'> &
    WithTheme
>(props => {
  const { bg = 'primary', color, disabled, gap, theme } = props;
  const { opacity, spacing } = theme;
  const { mainColor } = getColorTokens(bg, color, theme);

  return css`
    align-items: center;
    all: unset;
    cursor: pointer;
    display: flex;
    gap: ${spacing[gap]};
    justify-content: space-between;
    width: 100%;
    ${outlineStyles(mainColor, theme)};

    ${disabled &&
    css`
      cursor: not-allowed;
      opacity: ${opacity.medium};
    `}
  `;
});

const getContentAnimation = (
  initialHeight: StringOrNumber,
  endHeight: StringOrNumber,
  marginTop?: string,
) => keyframes`
  0% {
    height: ${px(initialHeight)};
    opacity: ${initialHeight ? 1 : 0};
    margin-top: 0;
    visibility: hidden;
  }
  100% {
    height: ${px(endHeight)};
    opacity: 1;
    margin-top: ${marginTop};
    visibility: visible;
  }
`;

const Content = styled('div')<ContentProps & WithTheme>(props => {
  const {
    animationEnterDuration,
    animationExitDuration,
    hasTitle,
    initialHeight,
    isOpen,
    maxHeight,
    scrollHeight,
    shouldAnimate,
    theme,
  } = props;
  const { spacing } = theme;

  let animation;
  let height = initialHeight;
  let marginTop = hasTitle ? spacing.xs : undefined;

  if (shouldAnimate) {
    animation = css`
      animation: ${getContentAnimation(initialHeight, maxHeight ?? scrollHeight, marginTop)}
        ${isOpen ? animationEnterDuration : animationExitDuration}s ease-in-out forwards
        ${isOpen ? '' : ' reverse'};
    `;
  } else {
    height = isOpen ? maxHeight || scrollHeight || 'auto' : initialHeight;
    marginTop = isOpen ? marginTop : undefined;
  }

  return css`
    ${animation};
    height: ${px(height)};
    margin-top: ${marginTop};
    overflow: hidden;
    visibility: ${isOpen ? 'visible' : 'hidden'};
  `;
});

const HeaderToggle = styled('span')<{ isOpen: boolean }>(props => {
  const { isOpen } = props;

  return css`
    align-self: center;
    display: inline-flex;
    transform: rotate(${isOpen ? -90 : 0}deg);
    transform-origin: center;
    transition: transform 0.3s;
  `;
});

export function Collapse(props: CollapseProps) {
  const {
    componentProps: {
      'aria-label': ariaLabel,
      bottomToggle,
      componentName,
      defaultOpen,
      disabled,
      gap,
      headerAlign,
      headerToggle = <Icon name="chevron-left" title={null} />,
      hideHeaderToggle,
      id,
      onToggle,
      open,
      role,
      showBottomToggle,
      startContent,
      title,
      ...rest
    },
    getDataAttributes,
  } = useCollapse(props);
  const contentId = useId();

  const isControlled = is.boolean(open);
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

    onToggle?.(isControlled ? open : !isOpen, id);
  };

  const hasTitle = Boolean(title);
  const toggleProps = {
    'aria-controls': contentId,
    'aria-expanded': isOpen,
    'aria-label': ariaLabel,
    'data-open': isOpen,
    'data-disabled': disabled,
    disabled,
    onClick: handleClickToggle,
  };

  const content: Record<string, ReactNode> = {};

  if (!hideHeaderToggle) {
    content.headerToggle = (
      <HeaderToggle isOpen={isOpen}>
        {is.function(headerToggle) ? headerToggle({ isOpen, isDisabled: disabled }) : headerToggle}
      </HeaderToggle>
    );
  }

  if (startContent) {
    content.startContent = isValidElement(startContent) ? (
      startContent
    ) : (
      <span {...getDataAttributes('AccordionItemStartContent')}>{startContent}</span>
    );
  }

  if (hasTitle) {
    content.header = (
      <Header
        {...getDataAttributes(`${componentName}Header`)}
        {...toggleProps}
        role={role}
        {...rest}
        gap={gap}
      >
        <FlexInline flex gap={gap}>
          {content.startContent}
          {isValidElement(title) ? (
            title
          ) : (
            <FlexInline
              align={headerAlign}
              {...getDataAttributes(`${componentName}Title`)}
              direction="column"
              flex
              size="lg"
              theme={rest.theme}
            >
              {title}
            </FlexInline>
          )}
        </FlexInline>
        {content.headerToggle}
      </Header>
    );
  }

  if (showBottomToggle) {
    content.footer = (
      <Flex mt="xs" {...getDataAttributes(`${componentName}Footer`)}>
        {bottomToggle ? (
          bottomToggle({ isOpen, toggleProps })
        ) : (
          <ButtonUnstyled color="gray.500" size="xs" {...toggleProps}>
            {isOpen ? 'hide' : 'show more'}
          </ButtonUnstyled>
        )}
      </Flex>
    );
  }

  return (
    <StyledCollapse {...getDataAttributes(componentName)} {...rest}>
      {content.header}
      <Content
        ref={contentRef}
        {...getDataAttributes(`${componentName}Content`)}
        hasTitle={hasTitle}
        id={contentId}
        isOpen={isOpen}
        onAnimationEnd={handleAnimationEnd}
        scrollHeight={contentRef.current?.scrollHeight ?? 0}
        shouldAnimate={shouldAnimate}
        {...rest}
      />
      {content.footer}
    </StyledCollapse>
  );
}

Collapse.displayName = 'Collapse';

export { type CollapseProps, defaultProps } from './useCollapse';
