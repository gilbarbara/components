import { CSSProperties, ReactNode, useCallback } from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { pick } from '@gilbarbara/helpers';
import { StringOrNumber } from '@gilbarbara/types';
import { StandardLonghandProperties } from 'csstype';

import { Box } from './Box';
import { ButtonBase } from './ButtonBase';
import { H3 } from './Headings';
import { Icon } from './Icon';
import { getTheme, px } from './modules/helpers';
import { getStyledOptions, isDarkMode } from './modules/system';
import { Portal, PortalProps } from './Portal';

export interface ModalProps
  extends Pick<
    PortalProps,
    | 'children'
    | 'closeOnClickOverlay'
    | 'closeOnEsc'
    | 'hideOverlay'
    | 'onClose'
    | 'onOpen'
    | 'zIndex'
  > {
  hideCloseButton?: boolean;
  isActive: boolean;
  maxHeight?: StandardLonghandProperties['maxHeight'] | number;
  maxWidth?: StandardLonghandProperties['maxWidth'] | number;
  style?: CSSProperties;
  title?: ReactNode;
  width?: StringOrNumber;
}

const StyledModal = styled(
  'div',
  getStyledOptions(),
)<Omit<ModalProps, 'content' | 'onClose' | 'onOpen' | 'title'>>(props => {
  const { maxWidth, width } = props;
  const { black, darkColor, radius, shadow, spacing, white } = getTheme(props);
  const darkMode = isDarkMode(props);

  return css`
    background-color: ${darkMode ? darkColor : white};
    border-radius: ${radius.lg};
    box-shadow: ${shadow.high};
    color: ${darkMode ? white : black};
    max-width: ${maxWidth ? px(maxWidth) : 'none'};
    padding: ${spacing.md};
    width: ${width ? px(width) : 'auto'};
  `;
});

const StyledModalContent = styled(
  'div',
  getStyledOptions(),
)<Required<Pick<ModalProps, 'maxHeight'>>>(props => {
  const { maxHeight } = props;
  const { spacing } = getTheme(props);

  return css`
    max-height: ${px(maxHeight)};
    overflow-y: auto;
    padding: ${spacing.md};
  `;
});

export function Modal(props: ModalProps) {
  const {
    children,
    closeOnEsc,
    hideCloseButton,
    isActive,
    maxHeight = '80vh',
    onClose,
    style,
    title,
    ...portalProps
  } = props;
  const { black, darkMode, white } = getTheme({ theme: useTheme() });

  const handlePortalClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  let header;

  if (!hideCloseButton || title) {
    header = (
      <Box
        align="center"
        display="flex"
        justify={title ? 'space-between' : 'flex-end'}
        mb="xs"
        pt="md"
        px="md"
      >
        {title && <H3 style={{ marginBottom: 0 }}>{title}</H3>}
        {!hideCloseButton && (
          <ButtonBase onClick={onClose}>
            <Icon color={darkMode ? white : black} name="close" size={26} />
          </ButtonBase>
        )}
      </Box>
    );
  }

  return (
    <Portal
      closeOnEsc={closeOnEsc}
      isActive={isActive}
      onClose={handlePortalClose}
      {...portalProps}
    >
      <StyledModal
        data-component-name="Modal"
        {...pick(props, 'isActive', 'maxWidth', 'width')}
        style={style}
      >
        {header}
        <StyledModalContent maxHeight={maxHeight}>{children}</StyledModalContent>
      </StyledModal>
    </Portal>
  );
}

Modal.defaultProps = {
  closeOnEsc: true,
  maxHeight: '80vh',
};
