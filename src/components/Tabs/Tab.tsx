/* eslint-disable react/no-unused-prop-types */
import { ReactNode } from 'react';

import { StyledProps, WithChildren, WithColors } from '~/types';

export interface TabProps extends StyledProps, WithChildren, WithColors {
  disabled?: boolean;
  id: string;
  title: ReactNode;
}

export function Tab(props: TabProps) {
  const { children } = props;

  return <div data-component-name="Tab">{children}</div>;
}

Tab.displayName = 'Tab';
