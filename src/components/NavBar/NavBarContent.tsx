import { useResponsive } from '@gilbarbara/hooks';

import { useComponentProps } from '~/hooks/useComponentProps';
import { formatBreakpoints } from '~/modules/helpers';

import { Flex } from '~/components/Flex';

import { NavBarContentProps } from './useNavBar';

export function NavBarContent(props: NavBarContentProps) {
  const {
    componentProps: { hideBreakpoint, showBreakpoint, ...rest },
    getDataAttributes,
  } = useComponentProps(props, {
    gap: 'sm',
    justify: 'start',
  });

  const breakpoints = formatBreakpoints(rest.theme);
  const { max, min } = useResponsive(breakpoints);

  let display = 'flex';

  if ((hideBreakpoint && min(hideBreakpoint)) || (showBreakpoint && max(showBreakpoint))) {
    display = 'none';
  }

  return <Flex {...getDataAttributes('NavBarContent')} display={display} {...rest} />;
}

NavBarContent.displayName = 'NavBarContent';
