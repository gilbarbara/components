import { CSSProperties, ReactNode, useCallback } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { StringOrNumber } from '@gilbarbara/types';

import { getTheme } from '~/modules/helpers';
import {
  borderStyles,
  getStyledOptions,
  isDarkMode,
  paddingStyles,
  radiusStyles,
  shadowStyles,
} from '~/modules/system';

import { Button } from '~/components/Button';
import { H3 } from '~/components/Headings';
import { Paragraph } from '~/components/Paragraph';
import { Portal, PortalProps } from '~/components/Portal';
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

export interface DialogProps
  extends StyledProps,
    WithAccent,
    WithBorder,
    WithPadding,
    WithRadius,
    WithShadow,
    Omit<PortalProps, 'children' | 'isActive' | 'showCloseButton'> {
  /** @default 'Cancel' */
  buttonCancelText?: string;
  /** @default 'Confirm' */
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
  /** @default 380 */
  width?: StringOrNumber;
}

export const defaultProps = {
  accent: 'primary',
  buttonCancelText: 'Cancel',
  buttonConfirmText: 'Confirm',
  buttonOrder: 'ltr',
  closeOnClickOverlay: false,
  closeOnEsc: true,
  hideOverlay: false,
  padding: 'xl',
  radius: 'lg',
  shadow: 'high',
  textAlign: 'left',
  width: 380,
} satisfies Omit<
  DialogProps,
  'content' | 'isActive' | 'onClickCancel' | 'onClickConfirmation' | 'title'
>;

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
    closeOnClickOverlay,
    closeOnEsc,
    content,
    hideOverlay,
    isActive,
    onClickCancel,
    onClickConfirmation,
    onClose,
    onOpen,
    style,
    title,
    zIndex,
    ...rest
  } = { ...defaultProps, ...props };

  const handlePortalClose = useCallback(() => {
    onClickCancel();

    if (onClose) {
      onClose();
    }
  }, [onClickCancel, onClose]);

  const actionButton = (
    <Button bg={accent} data-test-id="confirm" onClick={onClickConfirmation}>
      {buttonConfirmText}
    </Button>
  );
  const cancelButton = (
    <Button bg={accent} data-test-id="cancel" invert onClick={onClickCancel}>
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

Dialog.displayName = 'Dialog';
