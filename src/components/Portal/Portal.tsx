import {
  MouseEvent,
  ReactNode,
  TransitionEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useMount, usePrevious, useUnmount, useUpdateEffect } from '@gilbarbara/hooks';
import { SetRequired } from '@gilbarbara/types';
import { opacify } from 'colorizr';

import { getColorTokens } from '~/modules/colors';
import { formatKebabCaseToCamelCase } from '~/modules/helpers';
import { positioningStyles } from '~/modules/system';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { Icon } from '~/components/Icon';

import { WithTheme } from '~/types';

import { createPortalElement, getPortalElement, PortalProps, usePortal } from './usePortal';

const StyledPortal = styled.div<Omit<PortalProps, 'children'> & { isActive: boolean }>(
  {
    alignItems: 'center',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    opacity: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    visibility: 'hidden',
  },
  props => {
    const { isActive } = props;

    return css`
      opacity: ${isActive ? 1 : 0};
      visibility: ${isActive ? 'visible' : 'hidden'};
      ${positioningStyles(props)};
    `;
  },
);

const Overlay = styled.div<
  SetRequired<
    Omit<PortalProps, 'children'>,
    'disableAnimation' | 'overlayBlur' | 'overlayBlurAmount' | 'overlayOpacity'
  > & { isActive: boolean } & WithTheme
>(props => {
  const {
    animationEnterDuration,
    animationExitDuration,
    bg,
    disableAnimation,
    isActive,
    overlayBlur,
    overlayBlurAmount,
    overlayOpacity,
    theme,
  } = props;
  const { black, darkMode, grayScale } = theme;

  const opacityDuration = isActive ? animationEnterDuration : animationExitDuration;
  let selectedBg = darkMode ? grayScale['150'] : black;

  if (bg) {
    const { mainColor } = getColorTokens(bg, undefined, theme);

    selectedBg = mainColor;
  }

  if (selectedBg !== 'transparent') {
    selectedBg = opacify(selectedBg, overlayOpacity);
  }

  return css`
    background-color: ${selectedBg};
    ${overlayBlur && `backdrop-filter: blur(${overlayBlurAmount});`};
    opacity: ${isActive ? 1 : 0};
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    ${!disableAnimation && `transition: opacity ${opacityDuration}s;`};
  `;
});

const Content = styled.div<
  Pick<PortalProps, 'animationEnterDuration' | 'animationExitDuration'> & {
    disableAnimation: boolean;
    isActive: boolean;
  }
>(props => {
  const { animationEnterDuration, animationExitDuration, disableAnimation, isActive } = props;

  const opacityDuration = isActive ? animationEnterDuration : animationExitDuration;

  return css`
    max-height: 100%;
    opacity: ${isActive ? 1 : 0};
    position: relative;
    ${!disableAnimation && `transition: opacity ${opacityDuration}s;`};
    width: auto;
    z-index: 10;
  `;
});

const CloseButton = styled(ButtonUnstyled)`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 20;
`;

export function Portal(props: PortalProps) {
  const { componentProps, getDataAttributes } = usePortal(props);
  const {
    animationEnterDuration,
    animationExitDuration,
    children,
    disableAnimation,
    disableCloseOnClickOverlay,
    disableCloseOnEsc,
    hideOverlay,
    isOpen,
    onClose,
    onOpen,
    showCloseButton,
    theme,
    ...rest
  } = componentProps;
  const { dataAttributeName } = theme;

  const [isActive, setActive] = useState(isOpen);
  const [isReady, setReady] = useState(false);
  const [isRendering, setRendering] = useState(false);
  const portal = useRef<Element | null>(null);

  const shouldRender = isOpen || isActive || isRendering;
  const previousIsOpen = usePrevious(isOpen);
  const previousDisableCloseOnEsc = usePrevious(disableCloseOnEsc);

  const handleKeyDown = useRef((event: KeyboardEvent) => {
    if (event.code === 'Escape') {
      event.stopPropagation();
      closePortal();
    }
  });

  const removeListener = useCallback(
    (listener: (event: KeyboardEvent) => void) => {
      if (!disableCloseOnEsc) {
        document.removeEventListener('keydown', listener);
      }
    },
    [disableCloseOnEsc],
  );

  const openPortal = useCallback(() => {
    setActive(true);
    setRendering(true);
    onOpen?.();

    if (!disableCloseOnEsc) {
      document.addEventListener('keydown', handleKeyDown.current);
    }
  }, [disableCloseOnEsc, onOpen]);

  const closePortal = useCallback(() => {
    removeListener(handleKeyDown.current);

    setActive(false);

    if (disableAnimation) {
      setRendering(false);
      onClose?.();
    }
  }, [disableAnimation, onClose, removeListener]);

  useMount(() => {
    let element = getPortalElement();

    if (!getPortalElement()) {
      element = createPortalElement();
      document.body.appendChild(element);
    }

    portal.current = element;
    setReady(true);

    if (isOpen && !disableCloseOnEsc) {
      document.addEventListener('keydown', handleKeyDown.current);
    }
  });

  useUnmount(() => {
    removeListener(handleKeyDown.current);
  });

  useUpdateEffect(() => {
    const hasChanged = previousIsOpen !== isOpen;

    if (hasChanged && isOpen) {
      openPortal();
    } else if (hasChanged && !isOpen && isActive) {
      closePortal();
    }

    if (previousDisableCloseOnEsc !== disableCloseOnEsc) {
      if (disableCloseOnEsc) {
        document.addEventListener('keydown', handleKeyDown.current);
      } else {
        document.removeEventListener('keydown', handleKeyDown.current);
      }
    }
  }, [
    closePortal,
    disableCloseOnEsc,
    isActive,
    isOpen,
    openPortal,
    previousDisableCloseOnEsc,
    previousIsOpen,
  ]);

  const handleClickClose = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const { dataset } = event.currentTarget;

      if (
        dataset[formatKebabCaseToCamelCase(dataAttributeName)] === 'PortalOverlay' &&
        disableCloseOnClickOverlay
      ) {
        return;
      }

      closePortal();
    },
    [closePortal, dataAttributeName, disableCloseOnClickOverlay],
  );

  const handleTransitionEnd: TransitionEventHandler<HTMLDivElement> = useCallback(
    event => {
      const { dataset } = event.currentTarget;

      if (dataset[formatKebabCaseToCamelCase(dataAttributeName)] !== 'PortalContent') {
        return;
      }

      const { opacity } = window.getComputedStyle(event.currentTarget);

      if (opacity === '0') {
        setActive(false);
        setRendering(false);
        onClose?.();
      }
    },
    [dataAttributeName, onClose],
  );

  if (!isReady || !portal.current) {
    return null;
  }

  const content: Record<string, ReactNode> = {};

  if (shouldRender) {
    content.main = (
      <Content
        {...getDataAttributes('PortalContent')}
        animationEnterDuration={animationEnterDuration}
        animationExitDuration={animationExitDuration}
        disableAnimation={disableAnimation}
        isActive={isActive}
        onTransitionEnd={handleTransitionEnd}
      >
        {children}
      </Content>
    );

    if (!hideOverlay) {
      content.overlay = (
        <Overlay
          {...getDataAttributes('PortalOverlay')}
          animationEnterDuration={animationEnterDuration}
          animationExitDuration={animationExitDuration}
          disableAnimation={disableAnimation}
          isActive={isActive}
          onClick={handleClickClose}
          theme={theme}
          {...rest}
        />
      );
    }

    if (showCloseButton) {
      content.closeButton = (
        <CloseButton
          {...getDataAttributes('PortalCloseButton')}
          onClick={handleClickClose}
          p="xs"
          radius="round"
          title="Close"
        >
          <Icon name="close-o" size={24} title="Close" />
        </CloseButton>
      );
    }
  }

  return createPortal(
    <StyledPortal {...getDataAttributes('Portal')} isActive={shouldRender} {...rest}>
      {content.overlay}
      {content.closeButton}
      {content.main}
    </StyledPortal>,
    portal.current,
  );
}

Portal.displayName = 'Portal';

export { defaultProps, type PortalProps } from './usePortal';
