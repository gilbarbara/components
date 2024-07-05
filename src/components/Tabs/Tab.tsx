import { ReactNode } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import { StyledProps, WithChildren, WithColors, WithDisabled } from '~/types';

export interface TabKnownProps extends StyledProps, WithChildren, WithColors, WithDisabled {
  id: string;
  title: ReactNode;
}

export type TabProps = Simplify<TabKnownProps>;

export function Tab(props: TabProps) {
  const { children } = props;
  const { getDataAttributes } = useTheme();

  return <div {...getDataAttributes('Tab')}>{children}</div>;
}

Tab.displayName = 'Tab';
