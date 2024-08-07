import { CSSProperties, ReactNode, useCallback } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, px } from '@gilbarbara/helpers';
import { Simplify, StringOrNumber } from '@gilbarbara/types';
import { StandardLonghandProperties } from 'csstype';

import { useTheme } from '~/hooks/useTheme';

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
import {
  defaultProps as portalDefaultProps,
  Portal,
  type PortalProps,
} from '~/components/Portal/Portal';

import { StyledProps, WithBorder, WithPadding, WithRadius, WithShadow } from '~/types';

export interface ModalKnownProps
  extends StyledProps,
    WithBorder,
    WithPadding,
    WithRadius,
    WithShadow,
    Omit<PortalProps, 'showCloseButton'> {
  /**
   * Hide the close button.
   * @default false
   */
  hideCloseButton?: boolean;
  /**
   * The maximum height of the modal.
   * @default '80vh'
   */
  maxHeight?: StandardLonghandProperties['maxHeight'] | number;
  /**
   * The maximum width of the modal.
   * @default '100vw'
   */
  maxWidth?: StandardLonghandProperties['maxWidth'] | number;
  style?: CSSProperties;
  title?: ReactNode;
  /**
   * The width of the modal.
   */
  width?: StringOrNumber;
}

export type ModalProps = Simplify<ModalKnownProps>;

export const defaultProps = {
  ...portalDefaultProps,
  hideCloseButton: false,
  maxHeight: '80vh',
  maxWidth: '100vw',
  padding: 'lg',
  radius: 'lg',
  shadow: 'high',
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
    disableCloseOnClickOverlay,
    disableCloseOnEsc,
    hideCloseButton,
    hideOverlay,
    isOpen,
    maxHeight,
    onClose,
    onOpen,
    style,
    title,
    zIndex,
    ...rest
  } = mergeProps(defaultProps, props);
  const {
    getDataAttributes,
    theme: { black, darkMode, white },
  } = useTheme();

  const { padding } = rest;

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
      disableCloseOnClickOverlay={disableCloseOnClickOverlay}
      disableCloseOnEsc={disableCloseOnEsc}
      hideOverlay={hideOverlay}
      isOpen={isOpen}
      onClose={handlePortalClose}
      onOpen={onOpen}
      zIndex={zIndex}
    >
      <StyledModal {...getDataAttributes('Modal')} {...rest} style={style}>
        {header}
        <StyledModalContent maxHeight={maxHeight} padding={padding}>
          {children}
        </StyledModalContent>
      </StyledModal>
    </Portal>
  );
}

Modal.displayName = 'Modal';
