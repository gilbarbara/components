import { omit } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';
import { textDefaultOptions } from '~/modules/options';

import {
  OmitElementProps,
  Spacing,
  StyledProps,
  WithChildren,
  WithColorsDefaultColor,
  WithDisplay,
  WithEndContent,
  WithFlexItem,
  WithMargin,
  WithPadding,
  WithStartContent,
  WithTextOptions,
} from '~/types';

export type AnchorProps = Simplify<OmitElementProps<HTMLAnchorElement, AnchorKnownProps>>;

export interface AnchorKnownProps
  extends StyledProps,
    WithChildren,
    Pick<WithColorsDefaultColor, 'color'>,
    WithDisplay,
    WithEndContent,
    WithFlexItem,
    WithMargin,
    WithPadding,
    WithStartContent,
    WithTextOptions {
  /**
   * Open the link in a new tab and add `rel="noopener noreferrer"`.
   * @default false
   */
  external?: boolean;
  /**
   * Space between the start and end content.
   * @default xxs
   */
  gap?: Spacing;
  /**
   * Remove the underline from the link.
   * @default false
   */
  hideDecoration?: boolean;
  href: string;
}

export const defaultProps = {
  ...omit(textDefaultOptions, 'size'),
  color: 'primary',
  external: false,
  gap: 'xxs',
  hideDecoration: false,
} satisfies Omit<AnchorProps, 'children' | 'href'>;

export function useAnchor(props: AnchorProps) {
  return useComponentProps(props, defaultProps);
}
