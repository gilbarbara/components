import { CSSProperties, ReactNode, useCallback } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StringOrNumber } from '@gilbarbara/types';

import { Button } from './Button';
import { H3 } from './Headings';
import { getTheme, px } from './modules/helpers';
import {
  borderStyles,
  getStyledOptions,
  isDarkMode,
  paddingStyles,
  radiusStyles,
  shadowStyles,
} from './modules/system';
import { Paragraph } from './Paragraph';
import { Portal, PortalProps } from './Portal';
import { Spacer } from './Spacer';
import {
  Alignment,
  ColorVariants,
  StyledProps,
  WithBorder,
  WithPadding,
  WithRadius,
  WithShadow,
} from './types';

export interface DialogProps
  extends StyledProps,
    WithBorder,
    WithPadding,
    WithRadius,
    WithShadow,
    Omit<PortalProps, 'children' | 'isActive' | 'showCloseButton'> {
  buttonCancelText?: string;
  buttonConfirmText?: string;
  /** @default ltr */
  buttonOrder?: 'ltr' | 'rtl';
  content: ReactNode;
  isActive: boolean;
  onClickCancel: () => void;
  onClickConfirmation: () => void;
  style?: CSSProperties;
  /** @default left */
  textAlign?: Alignment;
  title: ReactNode;
  /** @default primary */
  variant?: ColorVariants;
  /** @default 380 */
  width?: StringOrNumber;
}

const StyledDialog = styled(
  'div',
  getStyledOptions(),
)<Omit<DialogProps, 'content' | 'isActive' | 'onClickCancel' | 'onClickConfirmation' | 'title'>>(
  props => {
    const { textAlign = 'left', width = 380 } = props;
    const { black, darkColor, white } = getTheme(props);
    const darkMode = isDarkMode(props);

    return css`
      background-color: ${darkMode ? darkColor : white};
      color: ${darkMode ? white : black};
      max-width: 100%;
      text-align: ${textAlign};
      width: ${px(width)};
      ${borderStyles(props)};
      ${paddingStyles(props)};
      ${radiusStyles(props)};
      ${shadowStyles(props)};
    `;
  },
);

export function Dialog(props: DialogProps) {
  const {
    buttonCancelText,
    buttonConfirmText,
    buttonOrder,
    closeOnClickOverlay,
    closeOnEsc = true,
    content,
    hideOverlay,
    isActive,
    onClickCancel,
    onClickConfirmation,
    onClose,
    onOpen,
    style,
    title,
    variant,
    zIndex,
    ...rest
  } = props;

  const handlePortalClose = useCallback(() => {
    onClickCancel();

    if (onClose) {
      onClose();
    }
  }, [onClickCancel, onClose]);

  const actionButton = (
    <Button data-test-id="confirm" onClick={onClickConfirmation} variant={variant}>
      {buttonConfirmText}
    </Button>
  );
  const cancelButton = (
    <Button data-test-id="cancel" invert onClick={onClickCancel} variant={variant}>
      {buttonCancelText}
    </Button>
  );

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
      <StyledDialog data-component-name="Dialog" style={style} {...rest}>
        {title && <H3 mb="sm">{title}</H3>}

        <Paragraph mb="xl">{content}</Paragraph>

        {buttonOrder === 'ltr' ? (
          <Spacer distribution="space-between">
            {cancelButton}
            {actionButton}
          </Spacer>
        ) : (
          <Spacer distribution="space-between">
            {actionButton}
            {cancelButton}
          </Spacer>
        )}
      </StyledDialog>
    </Portal>
  );
}

Dialog.defaultProps = {
  buttonCancelText: 'Cancel',
  buttonConfirmText: 'Confirm',
  buttonOrder: 'ltr',
  closeOnClickOverlay: false,
  closeOnEsc: false,
  hideOverlay: false,
  padding: 'xl',
  radius: 'lg',
  shadow: 'high',
  textAlign: 'left',
  variant: 'primary',
  width: 380,
};
