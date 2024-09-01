import { isValidElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';

import { getStyledOptions, getStyles } from '~/modules/system';

import { Box } from '~/components/Box';
import { Button } from '~/components/Button';
import { H3 } from '~/components/Headings';
import { Paragraph } from '~/components/Paragraph';
import { Portal } from '~/components/Portal/Portal';
import { Spacer } from '~/components/Spacer';

import { WithTheme } from '~/types';

import { DialogProps, useDialog } from './useDialog';

const StyledDialog = styled(
  'div',
  getStyledOptions(),
)<
  Omit<DialogProps, 'content' | 'isActive' | 'onClickCancel' | 'onClickConfirmation' | 'title'> &
    WithTheme
>(props => {
  const { textAlign, theme, width } = props;
  const { black, darkColor, darkMode, white } = theme;

  return css`
    background-color: ${darkMode ? darkColor : white};
    color: ${darkMode ? white : black};
    max-width: 100%;
    text-align: ${textAlign};
    width: ${px(width)};
    ${getStyles(props)};
  `;
});

export function Dialog(props: DialogProps) {
  const { componentProps, getDataAttributes } = useDialog(props);

  const {
    accent,
    buttonCancelText,
    buttonConfirmText,
    buttonOrder,
    content,
    disableCloseOnClickOverlay,
    disableCloseOnEsc,
    hideOverlay,
    isOpen,
    onClickCancel,
    onClickConfirmation,
    onClose,
    onOpen,
    style,
    title,
    zIndex,
    ...rest
  } = componentProps;

  const actionButton = (
    <Button bg={accent} onClick={onClickConfirmation}>
      {buttonConfirmText}
    </Button>
  );
  const cancelButton = (
    <Button bg={accent} onClick={onClickCancel} variant="bordered">
      {buttonCancelText}
    </Button>
  );

  return (
    <Portal
      disableCloseOnClickOverlay={disableCloseOnClickOverlay}
      disableCloseOnEsc={disableCloseOnEsc}
      hideOverlay={hideOverlay}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      zIndex={zIndex}
    >
      <StyledDialog {...getDataAttributes('Dialog')} style={style} {...rest}>
        <Box mb="sm" {...getDataAttributes('DialogTitle')}>
          {title && isValidElement(title) ? title : <H3 mb={0}>{title}</H3>}
        </Box>

        <Paragraph mb="xl">{content}</Paragraph>

        <Spacer distribution="space-between" reverse={buttonOrder === 'rtl'}>
          {cancelButton}
          {actionButton}
        </Spacer>
      </StyledDialog>
    </Portal>
  );
}

Dialog.displayName = 'Dialog';

export { defaultProps, type DialogProps } from './useDialog';
