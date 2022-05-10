import { useState } from 'react';
import { sleep } from '@gilbarbara/helpers';
import { ComponentMeta, forceReRender } from '@storybook/react';
import { Button } from 'src';
import { Search, SearchProps } from 'src/Search';

import { SearchCreateProps, SearchOption } from 'src/types';

import { disableControl, hideProps } from '../__helpers__';

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
    ...hideProps(),
    options: disableControl(),
    showCreateButton: { control: 'boolean', description: 'Storybook only' },
  },
} as ComponentMeta<typeof Search>;

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
  const [busy, setBusy] = useState(false);

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
      + New Item
    </Button>
  );
}

async function getOptions(value: string) {
  await sleep(2);

  return options.filter(d => d.value.includes(value));
}

export const Basic = (props: SearchProps & { showCreateButton: boolean }) => {
  const { showCreateButton } = props;

  return (
    <Search
      {...props}
      createFn={showCreateButton ? CreateButton : undefined}
      onBlur={undefined}
      options={getOptions}
    />
  );
};
