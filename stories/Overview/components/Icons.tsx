import { useMemo, useState } from 'react';
import { capitalize, sortByLocaleCompare } from '@gilbarbara/helpers';

import { icons } from 'src/modules/options';

import { Box, BoxCenter, Button, H2, Icon, Jumbo, Paragraph, Text } from '../../../src';

function Item({ name }: any) {
  return (
    <BoxCenter
      data-component-name="IconWrapper"
      justify="start"
      minHeight={128}
      minWidth={160}
      padding="xs"
    >
      <Box mb="xs" minHeight={64}>
        <Icon name={name} size={64} />
      </Box>
      <Text size="small">{name}</Text>
    </BoxCenter>
  );
}

function Icons(): JSX.Element | null {
  const [showCategories, setShowCategories] = useState(true);

  const handleClick = () => setShowCategories(!showCategories);

  const allCategories = useMemo(
    () =>
      icons
        .reduce<string[]>((acc, { categories }) => {
          categories.forEach(name => {
            if (!acc.includes(name)) {
              acc.push(name);
            }
          });

          return acc;
        }, [])
        .sort(sortByLocaleCompare()),
    [],
  );

  const content = showCategories ? (
    <Box>
      {allCategories.map(category => {
        const items = icons.filter(icon => icon.categories.includes(category));

        return (
          <Box key={category} mb="xl">
            <H2>
              {capitalize(category)} ({items.length})
            </H2>

            <Box direction="row" display="flex" wrap="wrap">
              {items.map(icon => (
                <Item name={icon.name} />
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  ) : (
    <Box direction="row" display="flex" wrap="wrap">
      {icons.map(icon => (
        <Item key={icon.name} name={icon.name} />
      ))}
    </Box>
  );

  return (
    <Box>
      <Jumbo>Icons</Jumbo>

      <Paragraph mb="xl" size="large">
        Based on the{' '}
        <a href="https://css.gg/" rel="noreferrer" target="_blank">
          CSS icons
        </a>{' '}
        package
      </Paragraph>

      <Box mb="lg">
        <Button invert onClick={handleClick}>
          {showCategories ? 'Hide' : 'Show'} categories
        </Button>
      </Box>
      {content}
    </Box>
  );
}

export default Icons;
