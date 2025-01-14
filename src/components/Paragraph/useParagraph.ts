import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';
import { textDefaultOptions } from '~/modules/options';

import {
  OmitElementProps,
  StyledProps,
  WithAlign,
  WithChildren,
  WithColors,
  WithMargin,
  WithTextOptions,
} from '~/types';

export type ParagraphProps = Simplify<OmitElementProps<HTMLParagraphElement, ParagraphKnownProps>>;

export interface ParagraphKnownProps
  extends StyledProps,
    WithAlign,
    WithChildren,
    Pick<WithColors, 'color'>,
    WithMargin,
    WithTextOptions {
  /**
   * Skip the top margin for adjacent paragraphs.
   * @default false
   */
  skipMarginTop?: boolean;
}

export const defaultProps = {
  skipMarginTop: false,
  ...textDefaultOptions,
};

export function useParagraph(props: ParagraphProps) {
  return useComponentProps(props, defaultProps);
}
