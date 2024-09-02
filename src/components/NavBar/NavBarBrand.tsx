import { useComponentProps } from '~/hooks/useComponentProps';

import { Flex } from '~/components/Flex';

import { NavBarBrandProps } from './useNavBar';

export function NavBarBrand(props: NavBarBrandProps) {
  const { componentProps, getDataAttributes } = useComponentProps(props);

  return <Flex {...getDataAttributes('NavBarBrand')} {...componentProps} />;
}

NavBarBrand.displayName = 'NavBarBrand';
