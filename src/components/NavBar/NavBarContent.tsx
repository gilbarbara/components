import { useResponsive } from '@gilbarbara/hooks';

import { useComponentProps } from '~/hooks/useComponentProps';

import { formatBreakpoints } from '~/modules/helpers';

import { Flex } from '~/components/Flex';

import { NavBarContentProps } from './useNavBar';

export function NavBarContent(props: NavBarContentProps) {
  const {
    componentProps: { showBreakpoint, ...rest },
    getDataAttributes,
  } = useComponentProps(props, {
    gap: 'sm',
    justify: 'start',
  });

  const breakpoints = formatBreakpoints(rest.theme);
  const { max } = useResponsive(breakpoints);

  return (
    <Flex
      {...getDataAttributes('NavBarContent')}
      display={showBreakpoint && max(showBreakpoint) ? 'none' : 'flex'}
      {...rest}
    />
  );
}

NavBarContent.displayName = 'NavBarContent';
