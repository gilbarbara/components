/* eslint-disable react/no-unused-prop-types */

import { ReactNode } from 'react';

import { StyledProps, WithColor } from '../types';

export interface TabProps extends StyledProps, WithColor {
  children: ReactNode;
  disabled?: boolean;
  id: string;
  title: ReactNode;
}

export function Tab(props: TabProps) {
  const { children } = props;

  return <div data-component-name="Tab">{children}</div>;
}
