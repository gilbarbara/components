import { ComponentMeta } from '@storybook/react';
import { Alert, AlertProps } from 'src/Alert';

import { hideProps, hideTable, marginProps } from '../__helpers__';

export default {
  title: 'Components/Alert',
  component: Alert,
  args: {
    children: 'Registration completed!',
    invert: false,
    type: 'success',
  },
  argTypes: {
    ...hideProps(),
    ...marginProps(),
    type: { control: 'select' },
  },
} as ComponentMeta<typeof Alert>;

export const Basic = (props: AlertProps) => {
  return <Alert {...props} />;
};

export function Types(props: AlertProps) {
  return (
    <>
      {[
        { text: 'Registration completed!', type: 'success' as const },
        { text: 'Please fill in all the fields before proceeding.', type: 'warning' as const },
        { text: 'Oops, your information could not be saved.', type: 'error' as const },
        { text: 'Please wait, loading...', type: 'info' as const },
        { text: 'Nothing too important, just letting you know.', type: 'neutral' as const },
      ].map(d => (
        <Alert key={d.type} mb="md" {...props} type={d.type}>
          {d.text}
        </Alert>
      ))}
    </>
  );
}

Types.argTypes = {
  type: hideTable(),
};
