import { ChangeEvent, ReactNode, useMemo, useRef } from 'react';
import { capitalize, objectKeys, sortByLocaleCompare } from '@gilbarbara/helpers';
import { useSetState } from '@gilbarbara/hooks';

import { Box, Dropdown, H2, H3, Icon, Input, Jumbo, Paragraph, Spacer, Text } from '~';

import { icons } from '~/modules/options';
import { avatar, variants } from '~/modules/theme';

import Navigation from '~/stories/Overview/components/Navigation';
import type { DropdownOption, Icons, Variant } from '~/types';

interface ItemProps {
  color: Variant;
  name: Icons;
  size: number;
}

interface State {
  category: string;
  color: Variant;
  search: string;
  size: number;
}

function Item({ color, name, size }: ItemProps) {
  return (
    <div
      data-component-name="IconWrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: size * 2,
        minWidth: 160,
        padding: 8,
      }}
    >
      <div style={{ marginBottom: 8, minHeight: size }}>
        <Icon color={color} name={name} size={size} />
      </div>
      <span style={{ fontSize: 12 }}>{name}</span>
    </div>
  );
}

export default function Icons() {
  const [{ category, color, search, size }, setState] = useSetState<State>({
    category: '',
    color: 'black',
    size: 64,
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

    setState({ color: selected.value as Variant });
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
      [...objectKeys(variants), 'black', 'white'].map(d => ({
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
                    <Item key={icon.name} color={color} name={icon.name} size={size} />
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
            <Item key={icon.name} color={color} name={icon.name} size={size} />
          ))}
      </Box>
    );

  return (
    <Box>
      <Jumbo>Icons</Jumbo>

      <Paragraph mb="xl" size="lg">
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

      <Spacer gap="md" mb="lg">
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
          values={variantsOptions.filter(d => d.value === color)}
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
      <Navigation next="Theme" previous="Colors" />
    </Box>
  );
}
