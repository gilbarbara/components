import { CSSProperties, isValidElement, ReactNode, useCallback } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, px } from '@gilbarbara/helpers';
import { Simplify, StringOrNumber } from '@gilbarbara/types';

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
import { Button } from '~/components/Button';
import { H3 } from '~/components/Headings';
import { Paragraph } from '~/components/Paragraph';
import {
  defaultProps as portalDefaultProps,
  Portal,
  type PortalProps,
} from '~/components/Portal/Portal';
import { Spacer } from '~/components/Spacer';

import {
  Alignment,
  StyledProps,
  WithAccent,
  WithBorder,
  WithPadding,
  WithRadius,
  WithShadow,
} from '~/types';

export interface DialogKnownProps
  extends StyledProps,
    WithAccent,
    WithBorder,
    WithPadding,
    WithRadius,
    WithShadow,
    Omit<PortalProps, 'children' | 'showCloseButton'> {
  /**
   * The text of the cancel button.
   * @default 'Cancel'
   */
  buttonCancelText?: string;
  /**
   * The text of the confirm button.
   * @default 'Confirm'
   */
  buttonConfirmText?: string;
  /**
   * The button order.
   * @default ltr
   */
  buttonOrder?: 'ltr' | 'rtl';
  /**
   * The content of the dialog.
   */
  content: ReactNode;
  /**
   * Callback when the cancel button is clicked.
   */
  onClickCancel: () => void;
  /**
   * Callback when the confirm button is clicked.
   */
  onClickConfirmation: () => void;
  style?: CSSProperties;
  /**
   * The alignment of the text.
   * @default left
   */
  textAlign?: Alignment;
  /**
   * The title of the dialog.
   */
  title: ReactNode;
  /**
   * The width of the dialog.
   * @default 380
   */
  width?: StringOrNumber;
}

export type DialogProps = Simplify<DialogKnownProps>;

export const defaultProps = {
  ...portalDefaultProps,
  accent: 'primary',
  buttonCancelText: 'Cancel',
  buttonConfirmText: 'Confirm',
  buttonOrder: 'ltr',
  padding: 'xl',
  radius: 'lg',
  shadow: 'high',
  textAlign: 'left',
  width: 380,
} satisfies Omit<DialogProps, 'content' | 'onClickCancel' | 'onClickConfirmation' | 'title'>;

const StyledDialog = styled(
  'div',
  getStyledOptions(),
)<Omit<DialogProps, 'content' | 'isActive' | 'onClickCancel' | 'onClickConfirmation' | 'title'>>(
  props => {
    const { textAlign, width } = props;
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
  } = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();

  const handlePortalClose = useCallback(() => {
    onClickCancel();
    onClose?.();
  }, [onClickCancel, onClose]);

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
      onClose={handlePortalClose}
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
