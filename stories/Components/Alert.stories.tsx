import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Alert, Box } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    ...hideProps(),
    children: { control: 'text', defaultValue: 'Registration completed!' },
    invert: { defaultValue: false },
    type: { control: 'select', defaultValue: 'success' },
  },
} as ComponentMeta<typeof Alert>;

export const Basic = (props: any) => {
  return <Alert {...props} />;
};

export function Types(props: any) {
  return (
    <div>
      {[
        {
          text: 'Registration completed!',
          type: 'success',
        },
        {
          text: 'Please fill in all the fields before proceeding.',
          type: 'warning',
        },
        {
          text: 'Oops, your information could not be saved.',
          type: 'error',
        },
        {
          text: 'Please wait, loading...',
          type: 'info',
        },
        {
          text: 'Nothing too important, just letting you know.',
          type: 'neutral',
        },
      ].map(d => (
        <Box key={d.type} mb="md">
          <Alert {...props} type={d.type}>
            {d.text}
          </Alert>
        </Box>
      ))}
    </div>
  );
}

Types.argTypes = {
  type: {
    table: { disable: true },
  },
};
