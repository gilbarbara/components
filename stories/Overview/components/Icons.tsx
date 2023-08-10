import { ChangeEvent, ReactNode, useMemo, useRef } from 'react';
import { useSetState } from 'react-use';
import { capitalize, sortByLocaleCompare } from '@gilbarbara/helpers';

import { icons } from 'src/modules/options';

import {
  Box,
  BoxCenter,
  Dropdown,
  H2,
  H3,
  Icon,
  Input,
  Jumbo,
  Paragraph,
  Spacer,
  Text,
} from '../../../src';
import { avatar, variants } from '../../../src/modules/theme';
import type { DropdownOption, Icons, Variants } from '../../../src/types';

interface ItemProps {
  name: Icons;
  size: number;
  variant: Variants;
}

interface State {
  category: string;
  search: string;
  size: number;
  variant: Variants;
}

function Item({ name, size, variant }: ItemProps) {
  return (
    <BoxCenter
      data-component-name="IconWrapper"
      justify="start"
      minHeight={size * 2}
      minWidth={160}
      padding="xs"
    >
      <Box mb="xs" minHeight={size}>
        <Icon name={name} size={size} variant={variant} />
      </Box>
      <Text size="small">{name}</Text>
    </BoxCenter>
  );
}

function Icons() {
  const [{ category, search, size, variant }, setState] = useSetState<State>({
    category: '',
    size: 64,
    variant: 'black',
    search: '',
  });
  const debounceRef = useRef<number>();

  const handleChangeCategories = (values: DropdownOption[]) => {
    const [selected] = values;

    setState({ category: (selected?.value as string) ?? '' });
  };

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(() => {
      setState({ category: '', search: event.target.value });
    }, 750);
  };

  const handleChangeSizes = (values: DropdownOption[]) => {
    const [selected] = values;

    setState({ size: selected.value as number });
  };

  const handleChangeVariants = (values: DropdownOption[]) => {
    const [selected] = values;

    setState({ variant: selected.value as Variants });
  };

  const sizesOptions = useMemo(
    () =>
      Object.values(avatar).map(value => ({
        label: value.size,
        value: parseInt(value.size, 10),
      })),
    [],
  );

  const variantsOptions = useMemo(
    () =>
      [...Object.keys(variants), 'black', 'white'].map(d => ({
        label: d,
        value: d,
      })),
    [],
  );

  const categories = useMemo(() => {
    const items = icons
      .reduce<DropdownOption[]>((acc, item) => {
        item.categories.forEach(name => {
          if (!acc.some(d => d.value === name)) {
            acc.push({
              label: capitalize(name),
              value: name,
            });
          }
        });

        return acc;
      }, [])
      .sort(sortByLocaleCompare('label'));

    return [
      {
        label: <Text italic>Show all</Text>,
        value: '*',
      },
      ...items,
    ];
  }, []);

  const content: Record<string, ReactNode> = {};

  if (search) {
    content.header = <H3>Search results for "{search}"</H3>;
  }

  content.icons =
    category === '*' && !search ? (
      <Box>
        {categories
          .filter(item => item.value !== '*')
          .map(item => {
            const items = icons.filter(icon => icon.categories.includes(item.value as string));

            return (
              <Box key={item.value} mb="xl">
                <H2>
                  {item.label} ({items.length})
                </H2>

                <Box direction="row" display="flex" wrap="wrap">
                  {items.map(icon => (
                    <Item key={icon.name} name={icon.name} size={size} variant={variant} />
                  ))}
                </Box>
              </Box>
            );
          })}
      </Box>
    ) : (
      <Box direction="row" display="flex" wrap="wrap">
        {icons
          .filter(icon => {
            const nameSearch = search
              ? icon.name.toLowerCase().includes(search.toLowerCase())
              : true;
            const categorySearch =
              category && category !== '*' ? icon.categories.includes(category) : true;

            return nameSearch && categorySearch;
          })
          .map(icon => (
            <Item key={icon.name} name={icon.name} size={size} variant={variant} />
          ))}
      </Box>
    );

  return (
    <Box>
      <Jumbo>Icons</Jumbo>

      <Paragraph mb="xl" size="large">
        A set of icons ({icons.length}) based on the{' '}
        <a href="https://css.gg/" rel="noreferrer" target="_blank">
          CSS icons
        </a>
        ,{' '}
        <a href="https://primer.style/design/foundations/icons" rel="noreferrer" target="_blank">
          Octicons
        </a>{' '}
        and hundreds of handcrafted icons.
      </Paragraph>

      <Spacer gap="md" gapVertical="md" mb="lg">
        <Input
          name="search"
          onChange={handleChangeSearch}
          placeholder="Search"
          type="text"
          width={160}
        />
        <Dropdown
          items={sizesOptions}
          onChange={handleChangeSizes}
          placeholder="Size"
          values={sizesOptions.filter(d => d.value === size)}
          width={160}
        />
        <Dropdown
          items={variantsOptions}
          onChange={handleChangeVariants}
          placeholder="Variant"
          values={variantsOptions.filter(d => d.value === variant)}
          width={160}
        />
        <Dropdown
          items={categories}
          onChange={handleChangeCategories}
          placeholder="Category"
          values={categories.filter(d => d.value === category)}
          width={160}
        />
      </Spacer>
      {content.header}
      {content.icons}
    </Box>
  );
}

export default Icons;
