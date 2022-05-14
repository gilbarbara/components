import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMount, usePrevious, useUnmount, useUpdateEffect } from 'react-use';
import { css, keyframes, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import is from 'is-lite';

import { Icon } from './Icon';
import { baseStyles, buttonStyles } from './modules/system';
import { black } from './modules/theme';
import { StyledProps, WithChildren } from './types';

export interface PortalProps extends StyledProps, WithChildren {
  /** @default true */
  closeOnClickOverlay?: boolean;
  /** @default true */
  closeOnEsc?: boolean;
  /** @default false */
  hideOverlay?: boolean;
  /** @default false */
  isActive?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  /** @default false */
  showCloseButton?: boolean;
  /** @default 1000 */
  zIndex?: number;
}

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

const CloseButton = styled.button`
  ${baseStyles};
  ${buttonStyles};
  align-items: center;
  color: ${black};
  display: inline-flex;
  height: 30px;
  justify-content: center;
  line-height: 1;
  pointer-events: all;
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  z-index: 20;
`;

const Content = styled.div`
  max-height: 100%;
  position: relative;
  width: auto;
  z-index: 10;
`;

const Overlay = styled.div<Pick<PortalProps, 'isActive'> & { darkMode: boolean }>(props => {
  const { darkMode, isActive } = props;

  return css`
    background-color: ${darkMode ? 'rgba(222, 222, 222, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
    bottom: 0;
    left: 0;
    opacity: ${isActive ? 1 : 0};
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.5s;
  `;
});

const StyledPortal = styled.div<Pick<PortalProps, 'isActive' | 'zIndex'>>(props => {
  const { isActive, zIndex } = props;

  return css`
    align-items: center;
    animation-duration: 0.5s;
    animation-name: ${portalHide};
    animation-play-state: ${isActive ? 'running' : 'paused'};
    animation-name: ${isActive ? portalShow : portalHide};
    animation-direction: ${isActive ? 'normal' : 'reverse'};
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
    closeOnClickOverlay,
    closeOnEsc,
    hideOverlay,
    isActive,
    onClose,
    onOpen,
    showCloseButton,
    zIndex = 1000,
  } = props;
  const [isReady, setReady] = useState(false);
  const portal = useRef<Element | null>(null);
  const { darkMode = false } = useTheme();

  const closePortal = useRef(() => {
    destroyPortal.current();

    if (is.function(onClose)) {
      onClose();
    }
  });
  const destroyPortal = useRef(() => {
    if (closeOnEsc) {
      document.removeEventListener('keydown', handleKeyDown);
    }
  });

  const previousIsActive = usePrevious(isActive);
  const previousCloseOnEsc = usePrevious(closeOnEsc);

  const handleKeyDown = useCallback(event => {
    if (event.keyCode === 27) {
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

    if (isActive && closeOnEsc) {
      document.addEventListener('keydown', handleKeyDown);
    }
  });

  useUnmount(() => {
    destroyPortal.current();
  });

  const openPortal = useCallback(() => {
    if (is.function(onOpen)) {
      onOpen();
    }

    if (closeOnEsc) {
      document.addEventListener('keydown', handleKeyDown);
    }
  }, [closeOnEsc, handleKeyDown, onOpen]);

  useUpdateEffect(() => {
    const hasChanged = previousIsActive !== isActive;

    if (hasChanged && isActive) {
      openPortal();
    } else if (hasChanged && !isActive) {
      destroyPortal.current();
    }

    if (previousCloseOnEsc !== closeOnEsc) {
      if (closeOnEsc) {
        document.addEventListener('keydown', handleKeyDown);
      } else {
        document.removeEventListener('keydown', handleKeyDown);
      }
    }
  }, [
    closeOnEsc,
    destroyPortal,
    handleKeyDown,
    isActive,
    openPortal,
    previousIsActive,
    previousCloseOnEsc,
  ]);

  const handleClickClose = useCallback(() => {
    if (!closeOnClickOverlay) {
      return;
    }

    closePortal.current();
  }, [closeOnClickOverlay, closePortal]);

  const content = [];

  if (isActive) {
    content.push(children);
  }

  if (!isReady || !portal.current) {
    return null;
  }

  return createPortal(
    <StyledPortal data-component-name="Portal" isActive={isActive} zIndex={zIndex}>
      {!hideOverlay && (
        <Overlay
          darkMode={darkMode}
          data-component-name="PortalOverlay"
          isActive={isActive}
          onClick={handleClickClose}
        />
      )}
      {showCloseButton && (
        <CloseButton onClick={handleClickClose} title="Close" type="button">
          <Icon name="close-o" size={20} title="Close" />
        </CloseButton>
      )}
      <Content data-component-name="PortalContent">{content}</Content>
    </StyledPortal>,
    portal.current,
  );
}

Portal.defaultProps = {
  closeOnClickOverlay: true,
  closeOnEsc: true,
  hideOverlay: false,
  isActive: false,
  showCloseButton: false,
  zIndex: 1000,
};
