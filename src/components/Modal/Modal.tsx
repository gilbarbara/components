import { CSSProperties, ReactNode, useCallback } from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { Simplify, StringOrNumber } from '@gilbarbara/types';
import { StandardLonghandProperties } from 'csstype';

import { getTheme } from '~/modules/helpers';
import {
  borderStyles,
  getStyledOptions,
  isDarkMode,
  paddingStyles,
  radiusStyles,
  shadowStyles,
} from '~/modules/system';

import { Box } from '~/components/Box';
import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { H3 } from '~/components/Headings';
import { Icon } from '~/components/Icon';
import { Portal } from '~/components/Portal';

import { StyledProps, WithBorder, WithPadding, WithRadius, WithShadow } from '~/types';
import type { PortalProps } from '~/types/props';

export interface ModalKnownProps
  extends StyledProps,
    WithBorder,
    WithPadding,
    WithRadius,
    WithShadow,
    Omit<PortalProps, 'isActive' | 'showCloseButton'> {
  hideCloseButton?: boolean;
  isActive: boolean;
  maxHeight?: StandardLonghandProperties['maxHeight'] | number;
  maxWidth?: StandardLonghandProperties['maxWidth'] | number;
  style?: CSSProperties;
  title?: ReactNode;
  width?: StringOrNumber;
}

export type ModalProps = Simplify<ModalKnownProps>;

export const defaultProps = {
  closeOnClickOverlay: true,
  closeOnEsc: true,
  hideCloseButton: false,
  hideOverlay: false,
  isActive: false,
  maxHeight: '80vh',
  maxWidth: '100vw',
  padding: 'lg',
  radius: 'lg',
  shadow: 'high',
  zIndex: 1000,
} satisfies Omit<ModalProps, 'children'>;

const StyledModal = styled(
  'div',
  getStyledOptions(),
)<Omit<ModalProps, 'content' | 'isActive' | 'onClose' | 'onOpen' | 'title'>>(props => {
  const { maxWidth, width } = props;
  const { black, darkColor, white } = getTheme(props);
  const darkMode = isDarkMode(props);

  return css`
    background-color: ${darkMode ? darkColor : white};
    color: ${darkMode ? white : black};
    max-width: ${px(maxWidth)};
    width: ${width ? px(width) : 'auto'};
    ${borderStyles(props)};
    ${paddingStyles(props)};
    ${radiusStyles(props)};
    ${shadowStyles(props)};
  `;
});

const StyledModalContent = styled(
  'div',
  getStyledOptions(),
)<Required<Pick<ModalProps, 'maxHeight' | 'padding'>>>(props => {
  const { maxHeight, padding } = props;
  const { spacing } = getTheme(props);

  return css`
    margin: 0 -${padding ? spacing[padding] : padding};
    padding: 0 ${padding ? spacing[padding] : padding};
    max-height: ${px(maxHeight)};
    overflow-y: auto;
  `;
});

export function Modal(props: ModalProps) {
  const {
    children,
    closeOnClickOverlay,
    closeOnEsc,
    hideCloseButton,
    hideOverlay,
    isActive,
    maxHeight,
    onClose,
    onOpen,
    style,
    title,
    zIndex,
    ...rest
  } = { ...defaultProps, ...props };
  const { padding } = rest;
  const { black, darkMode, white } = getTheme({ theme: useTheme() });

  const handlePortalClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  let header;

  if (!hideCloseButton || title) {
    header = (
      <Box align="center" display="flex" justify={title ? 'space-between' : 'flex-end'} mb="md">
        {title && <H3 style={{ marginBottom: 0 }}>{title}</H3>}
        {!hideCloseButton && (
          <ButtonUnstyled onClick={onClose}>
            <Icon color={darkMode ? white : black} name="close" size={26} />
          </ButtonUnstyled>
        )}
      </Box>
    );
  }

  return (
    <Portal
      closeOnClickOverlay={closeOnClickOverlay}
      closeOnEsc={closeOnEsc}
      hideOverlay={hideOverlay}
      isActive={isActive}
      onClose={handlePortalClose}
      onOpen={onOpen}
      zIndex={zIndex}
    >
      <StyledModal data-component-name="Modal" {...rest} style={style}>
        {header}
        <StyledModalContent maxHeight={maxHeight} padding={padding}>
          {children}
        </StyledModalContent>
      </StyledModal>
    </Portal>
  );
}

Modal.displayName = 'Modal';
