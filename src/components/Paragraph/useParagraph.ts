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
    WithTextOptions {}

export const defaultProps = {
  ...textDefaultOptions,
} satisfies Omit<ParagraphProps, 'children'>;

export function useParagraph(props: ParagraphProps) {
  return useComponentProps(props, defaultProps);
}
