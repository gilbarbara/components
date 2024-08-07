import { MouseEvent, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';
import { useMount, usePrevious, useUnmount, useUpdateEffect } from '@gilbarbara/hooks';
import { Simplify } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { Icon } from '~/components/Icon';

import { StyledProps, WithChildren } from '~/types';

export interface PortalKnownProps extends StyledProps, WithChildren {
  /**
   * Close the portal when the overlay is clicked.
   * @default false
   */
  disableCloseOnClickOverlay?: boolean;
  /**
   * Close the portal when the escape key is pressed.
   * @default false
   */
  disableCloseOnEsc?: boolean;
  /**
   * Hide the overlay.
   * @default false
   */
  hideOverlay?: boolean;
  /**
   * Whether the portal is visible.
   * @default false
   */
  isOpen?: boolean;
  /**
   * Callback when the portal is closed.
   */
  onClose?: () => void;
  /**
   * Callback when the portal is opened.
   */
  onOpen?: () => void;
  /**
   * Show a close button in the top right corner.
   * @default false
   */
  showCloseButton?: boolean;
  /**
   * The z-index of the portal.
   * @default 1000
   */
  zIndex?: number;
}

export type PortalProps = Simplify<PortalKnownProps>;

export const defaultProps = {
  disableCloseOnClickOverlay: false,
  disableCloseOnEsc: false,
  hideOverlay: false,
  isOpen: false,
  showCloseButton: false,
  zIndex: 1000,
} satisfies Omit<PortalProps, 'children'>;

function getPortalElement() {
  return document.querySelector('.__portal');
}

function createPortalElement() {
  const newElement = document.createElement('div');

  newElement.classList.add('__portal');

  return newElement;
}

const portalHide = keyframes`
  0% {
    opacity: 1;
    visibility: visible;
  }

  100% {
    opacity: 0;
    visibility: hidden;
  }
`;

const portalShow = keyframes`
  0% {
    opacity: 0;
    visibility: hidden;
  }

  100% {
    opacity: 1;
    visibility: visible;
  }
`;

const CloseButton = styled(ButtonUnstyled)`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 20;
`;

const Content = styled.div`
  max-height: 100%;
  position: relative;
  width: auto;
  z-index: 10;
`;

const Overlay = styled.div<Pick<PortalProps, 'isOpen'> & { darkMode: boolean }>(props => {
  const { darkMode, isOpen } = props;

  return css`
    background-color: ${darkMode ? 'rgba(222, 222, 222, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
    bottom: 0;
    left: 0;
    opacity: ${isOpen ? 1 : 0};
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.5s;
  `;
});

const StyledPortal = styled.div<Pick<PortalProps, 'isOpen' | 'zIndex'>>(props => {
  const { isOpen, zIndex } = props;

  return css`
    align-items: center;
    animation-duration: 0.5s;
    animation-name: ${portalHide};
    animation-play-state: ${isOpen ? 'running' : 'paused'};
    animation-name: ${isOpen ? portalShow : portalHide};
    animation-direction: ${isOpen ? 'normal' : 'reverse'};
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: ${zIndex};
  `;
});

export function Portal(props: PortalProps) {
  const {
    children,
    disableCloseOnClickOverlay,
    disableCloseOnEsc,
    hideOverlay,
    isOpen,
    onClose,
    onOpen,
    showCloseButton,
    zIndex,
  } = mergeProps(defaultProps, props);
  const [isReady, setReady] = useState(false);
  const portal = useRef<Element | null>(null);
  const {
    getDataAttributes,
    theme: { darkMode, dataAttributeName },
  } = useTheme();

  const closePortal = useRef(() => {
    destroyPortal.current();

    onClose?.();
  });

  const destroyPortal = useRef(() => {
    if (!disableCloseOnEsc) {
      document.removeEventListener('keydown', handleKeyDown);
    }
  });

  const previousIsActive = usePrevious(isOpen);
  const previousDisableCloseOnEsc = usePrevious(disableCloseOnEsc);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Escape') {
      event.stopPropagation();
      closePortal.current();
    }
  }, []);

  useMount(() => {
    let element = getPortalElement();

    if (!getPortalElement()) {
      element = createPortalElement();
      document.body.appendChild(element);
    }

    portal.current = element;
    setReady(true);

    if (isOpen && !disableCloseOnEsc) {
      document.addEventListener('keydown', handleKeyDown);
    }
  });

  useUnmount(() => {
    destroyPortal.current();
  });

  const openPortal = useCallback(() => {
    onOpen?.();

    if (!disableCloseOnEsc) {
      document.addEventListener('keydown', handleKeyDown);
    }
  }, [disableCloseOnEsc, handleKeyDown, onOpen]);

  useUpdateEffect(() => {
    const hasChanged = previousIsActive !== isOpen;

    if (hasChanged && isOpen) {
      openPortal();
    } else if (hasChanged && !isOpen) {
      destroyPortal.current();
    }

    if (previousDisableCloseOnEsc !== disableCloseOnEsc) {
      if (disableCloseOnEsc) {
        document.addEventListener('keydown', handleKeyDown);
      } else {
        document.removeEventListener('keydown', handleKeyDown);
      }
    }
  }, [
    disableCloseOnEsc,
    destroyPortal,
    handleKeyDown,
    isOpen,
    openPortal,
    previousIsActive,
    previousDisableCloseOnEsc,
  ]);

  const handleClickClose = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const { dataset } = event.currentTarget;

      if (dataset[dataAttributeName] === 'PortalOverlay' && disableCloseOnClickOverlay) {
        return;
      }

      closePortal.current();
    },
    [dataAttributeName, disableCloseOnClickOverlay],
  );

  const content = [];

  if (isOpen) {
    content.push(children);
  }

  if (!isReady || !portal.current) {
    return null;
  }

  return createPortal(
    <StyledPortal {...getDataAttributes('Portal')} isOpen={isOpen} zIndex={zIndex}>
      {!hideOverlay && (
        <Overlay
          darkMode={darkMode}
          {...getDataAttributes('PortalOverlay')}
          isOpen={isOpen}
          onClick={handleClickClose}
        />
      )}
      {showCloseButton && (
        <CloseButton onClick={handleClickClose} p="xs" radius="round" title="Close">
          <Icon name="close-o" size={24} title="Close" />
        </CloseButton>
      )}
      <Content {...getDataAttributes('PortalContent')}>{content}</Content>
    </StyledPortal>,
    portal.current,
  );
}

Portal.displayName = 'Portal';
