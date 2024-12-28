import { useTheme } from '~/hooks/useTheme';

import { TabProps } from './useTabs';

export function Tab(props: TabProps) {
  const { children } = props;
  const { getDataAttributes } = useTheme();

  return <div {...getDataAttributes('Tab')}>{children}</div>;
}

Tab.displayName = 'Tab';
