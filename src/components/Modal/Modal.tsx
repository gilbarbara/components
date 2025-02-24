import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';

import { getStyledOptions, getStyles } from '~/modules/system';

import { Box } from '~/components/Box';
import { ButtonUnstyled } from '~/components/ButtonUnstyled';
import { H3 } from '~/components/Headings';
import { Icon } from '~/components/Icon';
import { Portal } from '~/components/Portal/Portal';

import { WithTheme } from '~/types';

import { ModalProps, useModal } from './useModal';

const StyledModal = styled(
  'div',
  getStyledOptions(),
)<
  Omit<ModalProps, 'content' | 'isOpen' | 'onClose' | 'onDismiss' | 'onOpen' | 'title'> & WithTheme
>(props => {
  const { maxWidth, theme, width } = props;
  const { darkColor, darkMode, white } = theme;

  return css`
    background-color: ${darkMode ? darkColor : white};
    color: ${darkMode ? white : darkColor};
    max-width: ${px(maxWidth)};
    width: ${width ? px(width) : 'auto'};
    ${getStyles(props)};
  `;
});

const StyledModalContent = styled(
  'div',
  getStyledOptions(),
)<Required<Pick<ModalProps, 'maxHeight' | 'padding'>> & WithTheme>(props => {
  const { maxHeight, padding, theme } = props;
  const { spacing } = theme;

  return css`
    margin: 0 -${padding ? spacing[padding] : padding};
    max-height: ${px(maxHeight)};
    overflow-y: auto;
    padding: 0 ${padding ? spacing[padding] : padding};
  `;
});

export function Modal(props: ModalProps) {
  const { getDataAttributes, modalProps, portalProps } = useModal(props);
  const { children, hideCloseButton, maxHeight, style, title, ...rest } = modalProps;
  const { black, darkMode, white } = rest.theme;

  let header;

  if (!hideCloseButton || title) {
    header = (
      <Box align="center" display="flex" justify={title ? 'space-between' : 'flex-end'} mb="md">
        {title && <H3 style={{ marginBottom: 0 }}>{title}</H3>}
        {!hideCloseButton && (
          <ButtonUnstyled onClick={portalProps.onDismiss}>
            <Icon color={darkMode ? white : black} name="close" size={26} />
          </ButtonUnstyled>
        )}
      </Box>
    );
  }

  return (
    <Portal {...portalProps} showCloseButton={false}>
      <StyledModal
        {...getDataAttributes('Modal')}
        {...rest}
        data-open={portalProps.isOpen}
        style={style}
      >
        {header}
        <StyledModalContent maxHeight={maxHeight} padding={rest.padding} theme={rest.theme}>
          {children}
        </StyledModalContent>
      </StyledModal>
    </Portal>
  );
}

Modal.displayName = 'Modal';

export { defaultProps, type ModalProps } from './useModal';
