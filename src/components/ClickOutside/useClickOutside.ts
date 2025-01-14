import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { WithChildren, WithDisplay, WithFlexBox, WithLayout } from '~/types';

export type ClickOutsideProps = Simplify<ClickOutsideKnownProps>;

export interface ClickOutsideKnownProps extends WithChildren, WithDisplay, WithLayout, WithFlexBox {
  active: boolean;
  onClick: () => void;
}

export function useClickOutside(props: ClickOutsideProps) {
  return useComponentProps(props);
}
