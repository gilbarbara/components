import { CSSProperties, ReactNode } from 'react';
import { Simplify, StringOrNumber } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  defaultProps as portalDefaultProps,
  PortalProps,
  splitPortalProps,
} from '~/components/Portal/usePortal';

import {
  Alignment,
  StyledProps,
  WithAccent,
  WithBorder,
  WithPadding,
  WithRadius,
  WithShadow,
} from '~/types';

export type DialogProps = Simplify<DialogKnownProps>;

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
   * Handler called when the cancel button is clicked.
   */
  onClickCancel: () => void;
  /**
   * Handler called when the confirm button is clicked.
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
} satisfies Omit<
  DialogProps,
  'content' | 'onClickCancel' | 'onClickConfirmation' | 'onDismiss' | 'title'
>;

export function useDialog(props: DialogProps) {
  const { componentProps, getDataAttributes } = useComponentProps(props, defaultProps);

  const [dialogProps, portalProps] = splitPortalProps(componentProps);

  return { dialogProps, portalProps, getDataAttributes };
}
