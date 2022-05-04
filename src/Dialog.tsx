import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';

import { Button } from './Button';
import { Group } from './Group';
import { H3 } from './Headings';
import { getTheme, px } from './modules/helpers';
import { isDarkMode, styledOptions } from './modules/system';
import { Paragraph } from './Paragraph';
import { Portal, PortalProps } from './Portal';

export interface DialogProps
  extends Pick<
    PortalProps,
    'closeOnClickOverlay' | 'closeOnEsc' | 'hideOverlay' | 'onClose' | 'onOpen' | 'zIndex'
  > {
  buttonCancelText?: string;
  buttonConfirmText?: string;
  /** @default ltr */
  buttonOrder?: 'ltr' | 'rtl';
  content: React.ReactNode;
  isActive: boolean;
  onClickCancel: () => void;
  onClickConfirmation: () => void;
  style?: React.CSSProperties;
  /** @default left */
  textAlign?: 'left' | 'center' | 'right';
  title: React.ReactNode;
  /** @default 380 */
  width?: string | number;
}

const StyledDialog = styled(
  'div',
  styledOptions,
)<Omit<DialogProps, 'content' | 'onClickCancel' | 'onClickConfirmation' | 'title'>>(props => {
  const { textAlign = 'left', width = 380 } = props;
  const { black, darkColor, radius, shadow, spacing, white } = getTheme(props);
  const darkMode = isDarkMode(props);

  return css`
    background-color: ${darkMode ? darkColor : white};
    border-radius: ${radius.lg};
    box-shadow: ${shadow.high};
    color: ${darkMode ? white : black};
    max-width: 100%;
    padding: ${spacing.xl};
    text-align: ${textAlign};
    width: ${px(width)};
  `;
});

export function Dialog(props: DialogProps) {
  const {
    buttonCancelText,
    buttonConfirmText,
    buttonOrder,
    closeOnEsc = true,
    content,
    isActive,
    onClickCancel,
    onClickConfirmation,
    onClose,
    style,
    title,
    ...portalProps
  } = props;

  const handlePortalClose = React.useCallback(() => {
    onClickCancel();

    if (onClose) {
      onClose();
    }
  }, [onClickCancel, onClose]);

  const actionButton = (
    <Button data-test-id="confirm" onClick={onClickConfirmation}>
      {buttonConfirmText}
    </Button>
  );
  const cancelButton = (
    <Button data-test-id="cancel" invert onClick={onClickCancel}>
      {buttonCancelText}
    </Button>
  );

  return (
    <Portal
      closeOnEsc={closeOnEsc}
      isActive={isActive}
      onClose={handlePortalClose}
      {...portalProps}
    >
      <StyledDialog
        data-component-name="Dialog"
        {...omit(props, 'content', 'onClickCancel', 'onClickConfirmation', 'title')}
        style={style}
      >
        {title && <H3 mb="sm">{title}</H3>}

        <Paragraph mb="xl">{content}</Paragraph>

        <Group distribution="space-between">
          {buttonOrder === 'ltr' ? (
            <>
              {cancelButton}
              {actionButton}
            </>
          ) : (
            <>
              {actionButton}
              {cancelButton}
            </>
          )}
        </Group>
      </StyledDialog>
    </Portal>
  );
}

Dialog.defaultProps = {
  buttonCancelText: 'Cancel',
  buttonConfirmText: 'Confirm',
  buttonOrder: 'ltr',
  closeOnEsc: true,
  textAlign: 'left',
  width: 380,
};
