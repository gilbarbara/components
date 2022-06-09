import { ComponentMeta } from '@storybook/react';
import { Alert, AlertProps } from 'src/Alert';

import { disableControl, hideProps, spacingProps } from '../__helpers__';

export default {
  title: 'Components/Alert',
  component: Alert,
  args: {
    ...Alert.defaultProps,
    children: 'Registration completed!',
  },
  argTypes: {
    ...hideProps(),
    ...spacingProps(),
    children: { control: 'text' },
    type: { control: 'select' },
  },
} as ComponentMeta<typeof Alert>;

export const Basic = (props: AlertProps) => <Alert {...props} />;

export const Types = (props: AlertProps) => (
  <>
    {(
      [
        { text: 'Registration completed!', type: 'success' },
        { text: 'Please fill in all the fields before proceeding.', type: 'warning' },
        { text: 'Oops, your information could not be saved.', type: 'error' },
        { text: 'Please wait, loading...', type: 'info' },
        { text: 'Nothing too important, just letting you know.', type: 'neutral' },
      ] as const
    ).map(d => (
      <Alert key={d.type} {...props} mb="md" type={d.type}>
        {d.text}
      </Alert>
    ))}
  </>
);

Types.argTypes = {
  children: disableControl(),
  icon: disableControl(),
  type: disableControl(),
};
