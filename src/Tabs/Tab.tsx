/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';

import { StyledProps, WithColor } from '../types';

export interface TabProps extends StyledProps, WithColor {
  children: React.ReactNode;
  disabled?: boolean;
  id: string;
  title: React.ReactNode;
}

export function Tab(props: TabProps) {
  const { children } = props;

  return <div data-component-name="Tab">{children}</div>;
}
