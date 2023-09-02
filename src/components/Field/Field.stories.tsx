import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { Box, Form, Grid, H3 } from '~';

import { areas, contractTypes, frameworks, specializations } from '~/stories/__fixtures__';
import {
  colorProps,
  disableControl,
  hideNoControlsWarning,
  hideProps,
} from '~/stories/__helpers__';

import { defaultProps, Field } from './Field';

type Story = StoryObj<typeof Field>;

export default {
  title: 'Forms/Field',
  component: Field,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
  },
} satisfies Meta<typeof Field>;

export const Basic: Story = {
  args: {
    assistiveText: 'Make sure to fill out your full name',
    label: 'Name',
    name: 'name',
    placeholder: 'Your name here...',
    type: 'text',
  },
  argTypes: {
    type: disableControl(),
  },
  render: props => <Form>{() => <Field {...props} />}</Form>,
};

export const Types: Story = {
  argTypes: {
    ...hideProps('datePickerProps', 'dropdownProps', 'items', 'name', 'type'),
  },
  parameters: {
    controls: hideNoControlsWarning(),
  },
  render: () => (
    <Form>
      {() => (
        <Grid columnGap={32} templateColumns="repeat(auto-fit, minmax(480px, 1fr))" width="1024">
          <Box width="100%">
            <H3>Checkbox</H3>
            <Field
              items={contractTypes}
              label="Contract Type"
              name="contractType"
              onChange={action('checkbox onChange')}
              required
              type="checkbox"
            />
          </Box>
          <Box>
            <H3>Color</H3>
            <Field
              label="Profile color"
              name="color"
              onChange={action('color onChange')}
              type="color"
            />
          </Box>
          <Box>
            <H3>Dropdown</H3>
            <Field
              dropdownProps={{
                multi: true,
                searchable: false,
              }}
              items={frameworks}
              label="Frameworks"
              name="frameworks"
              onChange={action('dropdown onChange')}
              type="dropdown"
            />
          </Box>
          <Box>
            <H3>DatePicker</H3>
            <Field
              datePickerProps={{
                formatLocale: 'en-US',
                mode: 'single',
              }}
              label="Date"
              name="date"
              onChange={action('datePicker onChange')}
              placeholder="Start date"
              required
              type="datePicker"
            />
          </Box>
          <Box>
            <H3>E-mail</H3>
            <Field
              label="E-Mail"
              name="email"
              onChange={action('email onChange')}
              placeholder="Your e-mail"
              required
              type="text"
              validations={['email']}
            />
          </Box>
          <Box>
            <H3>File</H3>
            <Field label="Picture" name="picture" onChange={action('file onChange')} type="file" />
          </Box>
          <Box>
            <H3>Password</H3>
            <Field
              label="Password"
              name="password"
              onChange={action('password onChange')}
              placeholder="Your password"
              required
              type="password"
              validationOptions={{
                minLength: 12,
                minLengthMessage: 'Your password must be at least 12 characters long',
              }}
              validations={['password']}
            />
          </Box>
          <Box>
            <H3>Radio</H3>
            <Field
              items={specializations}
              label="Specialization"
              name="specialization"
              onChange={action('radio onChange')}
              required
              type="radio"
            />
          </Box>
          <Box>
            <H3>Select</H3>
            <Field
              label="Area"
              name="area"
              onChange={action('select onChange')}
              required
              type="select"
            >
              <option value="">Select an option</option>
              {areas.map(d => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </Field>
          </Box>
          <Box>
            <H3>Text</H3>
            <Field
              formatter="money"
              label="Salary (Min)"
              minLength={5}
              name="salaryMin"
              onChange={action('text onChange')}
              placeholder="$0"
              required
              type="text"
              value=""
            />
          </Box>
          <Box>
            <H3>Textarea</H3>
            <Field
              assistiveText="Tell us a little about your experience"
              label="Resume"
              name="resume"
              onChange={action('textarea onChange')}
              placeholder="..."
              type="textarea"
            />
          </Box>
          <Box>
            <H3>Toggle</H3>
            <Field
              label="Are you available to start immediately?"
              name="availability"
              onChange={action('toggle onChange')}
              type="toggle"
            />
          </Box>
        </Grid>
      )}
    </Form>
  ),
};
