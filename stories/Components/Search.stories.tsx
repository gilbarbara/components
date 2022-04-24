import * as React from 'react';
import { sleep } from '@gilbarbara/helpers';
import { ComponentMeta, forceReRender } from '@storybook/react';

import { Button, Search } from '../../src';
import { SearchCreateProps, SearchOption } from '../../src/types';
import { hideProps } from '../__helpers__';

const options: SearchOption[] = [
  { value: 'hey' },
  { value: 'how' },
  { value: 'are' },
  { value: 'you' },
  { value: 'in' },
  { value: 'this' },
  { value: 'lovely' },
  { value: 'day?' },
];

function CreateButton(props: SearchCreateProps) {
  const { close, value } = props;
  const [busy, setBusy] = React.useState(false);

  const handleClick = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      options.push({ value });
      forceReRender();

      close();
    }, 600);
  };

  return (
    <Button busy={busy} onClick={handleClick} transparent>
      + Novo Item
    </Button>
  );
}

async function getOptions(value: string) {
  await sleep(2);

  return options.filter(d => d.value.includes(value));
}

export default {
  title: 'Components/Search',
  component: Search,
  args: {
    debounce: 400,
    icon: 'search',
    placeholder: 'Search for...',
    showCreateAlways: false,
    showCreateButton: true,
    width: 300,
  },
  argTypes: {
    ...hideProps('busy', 'createFn', 'messages', 'onBlur', 'onFocus', 'onType', 'options', 'style'),
    showCreateButton: { control: 'boolean' },
  },
} as ComponentMeta<typeof Search>;

export const Basic = (props: any) => {
  const { showCreateButton } = props;

  return (
    <Search
      {...props}
      createFn={showCreateButton && CreateButton}
      onBlur={undefined}
      options={getOptions}
    />
  );
};
