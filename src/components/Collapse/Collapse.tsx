import {
  AriaAttributes,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, px } from '@gilbarbara/helpers';
import { usePrevious } from '@gilbarbara/hooks';
import { SetRequired, Simplify, StringOrNumber } from '@gilbarbara/types';
import is from 'is-lite';

import { useTheme } from '~/hooks/useTheme';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import {
  baseStyles,
  colorStyles,
  marginStyles,
  outlineStyles,
  paddingStyles,
  radiusStyles,
  shadowStyles,
} from '~/modules/system';

import { Box } from '~/components/Box';
import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { Icon } from '~/components/Icon';
import { Text } from '~/components/Text';

import {
  Spacing,
  StyledProps,
  WithColors,
  WithDisabled,
  WithHTMLAttributes,
  WithMargin,
  WithPadding,
  WithRadius,
  WithShadow,
} from '~/types';

export interface CollapseKnownProps
  extends StyledProps,
    AriaAttributes,
    WithColors,
    WithDisabled,
    Omit<WithHTMLAttributes, 'id' | 'title'>,
    WithMargin,
    WithPadding,
    WithRadius,
    WithShadow {
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
  /**
   * The component to display at the bottom if `showBottomToggle` is true.
   */
  bottomToggle?: (props: { isOpen: boolean; toggleProps: Record<string, any> }) => ReactElement;
  children: ReactNode;
  /**
   * The name of the component.
   * @default "Collapse"
   */
  componentName?: string;
  defaultOpen?: boolean;
  /**
   * The distance between the header and the toggle
   *
   * @default xs
   */
  gap?: Spacing;
  /**
   * The component to display at the header.
   */
  headerToggle?: ReactNode | ((props: { isDisabled: boolean; isOpen: boolean }) => ReactElement);
  hideHeaderToggle?: boolean;
  /**
   * The id of the component.
   */
  id?: string;
  /**
   * The height you want the content in its collapsed state.
   * @default 0
   */
  initialHeight?: StringOrNumber;
  /**
   * The height you want the content in its expanded state.
   */
  maxHeight?: StringOrNumber;
  onToggle?: (isOpen: boolean, id?: string) => void;
  open?: boolean;
  /**
   * Show a toggle at the bottom of the content to open/close it.
   * @default false
   */
  showBottomToggle?: boolean;
  title?: ReactNode;
}

export type CollapseProps = Simplify<CollapseKnownProps>;

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

export const defaultProps = {
  animationEnterDuration: 0.3,
  animationExitDuration: 0.3,
  'aria-label': 'Toggle the content',
  componentName: 'Collapse',
  defaultOpen: false,
  disabled: false,
  gap: 'xs',
  headerToggle: <Icon name="chevron-left" title={null} />,
  hideHeaderToggle: false,
  initialHeight: 0,
  showBottomToggle: false,
} satisfies Omit<CollapseProps, 'children'>;

const StyledCollapse = styled('div')<Omit<CollapseProps, 'children'>>(props => {
  return css`
    ${baseStyles(props)};
    display: flex;
    flex-direction: column;
    ${colorStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${radiusStyles(props)};
    ${shadowStyles(props)};
  `;
});

const Header = styled.button<
  SetRequired<Pick<CollapseProps, 'bg' | 'color' | 'disabled' | 'gap'>, 'disabled' | 'gap'>
>(props => {
  const { bg = 'primary', color, disabled, gap } = props;
  const { opacity, spacing, ...theme } = getTheme(props);
  const { mainColor } = getColorTokens(bg, color, theme);

  return css`
    align-items: center;
    all: unset;
    cursor: pointer;
    display: flex;
    gap: ${spacing[gap]};
    justify-content: space-between;
    ${outlineStyles(mainColor, props)};

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
  }
  100% {
    height: ${px(endHeight)};
    opacity: 1;
    margin-top: ${marginTop};
  }
`;

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
  `;
});

const HeaderToggle = styled('span')<{ isOpen: boolean }>(props => {
  const { isOpen } = props;

  return css`
    align-self: center;
    display: inline-flex;
    transform: rotate(${isOpen ? -90 : 0}deg);
    transition: transform 0.3s;
    transform-origin: center;
  `;
});

export function Collapse(props: CollapseProps) {
  const {
    'aria-label': ariaLabel,
    bottomToggle,
    componentName,
    defaultOpen,
    disabled,
    gap,
    headerToggle,
    hideHeaderToggle,
    id,
    onToggle,
    open,
    showBottomToggle,
    title,
    ...rest
  } = mergeProps(defaultProps, props);
  const contentId = useId();

  const isControlled = is.boolean(open);
  const [isOpen, setIsOpen] = useState(isControlled ? open : defaultOpen);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const previousIsOpen = usePrevious(isOpen);
  const { getDataAttributes } = useTheme();

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

  if (hasTitle) {
    content.header = (
      <Header {...getDataAttributes(`${componentName}Header`)} {...toggleProps} {...rest} gap={gap}>
        {isValidElement(title) ? (
          title
        ) : (
          <Text {...getDataAttributes(`${componentName}Title`)} flex size="lg">
            {title}
          </Text>
        )}
        {content.headerToggle}
      </Header>
    );
  }

  if (showBottomToggle) {
    content.footer = (
      <Box flexBox mt="xs" {...getDataAttributes(`${componentName}Footer`)}>
        {bottomToggle ? (
          bottomToggle({ isOpen, toggleProps })
        ) : (
          <ButtonUnstyled color="gray.500" size="xs" {...toggleProps}>
            {isOpen ? 'hide' : 'load more'}
          </ButtonUnstyled>
        )}
      </Box>
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
