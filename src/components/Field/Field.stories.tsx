import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';

import { Box, Form, Grid, H3 } from '~';

import { areas, contractTypes, frameworks, specializations } from '~/stories/__fixtures__';
import {
  addChromaticModes,
  colorProps,
  disableControl,
  hideProps,
  hideStoryFromDocsPage,
} from '~/stories/__helpers__';

import { defaultProps, Field, FieldProps } from './Field';

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

interface FieldBlockProps<TOnChange = any>
  extends Pick<FieldProps, 'accent' | 'borderless' | 'debug' | 'disabled' | 'hideAssistiveText'> {
  onChange?: TOnChange;
}

function FieldCheckbox(props: FieldBlockProps) {
  const { onChange, ...rest } = props;

  return (
    <Box>
      <H3>Checkbox</H3>
      <Field
        {...rest}
        items={contractTypes}
        label="Contract Type"
        name="contractType"
        onChange={onChange ?? action('checkbox onChange')}
        required
        type="checkbox"
      />
    </Box>
  );
}

function FieldColor(props: FieldBlockProps) {
  const { onChange, ...rest } = props;

  return (
    <Box>
      <H3>Color</H3>
      <Field
        {...rest}
        label="Profile color"
        name="color"
        onChange={onChange ?? action('color onChange')}
        type="color"
      />
    </Box>
  );
}

function FieldDatePicker(props: FieldBlockProps) {
  const { onChange, ...rest } = props;

  return (
    <Box>
      <H3>DatePicker</H3>
      <Field
        {...rest}
        datePickerProps={{
          formatLocale: 'en-US',
          mode: 'single',
        }}
        label="Date"
        name="date"
        onChange={onChange ?? action('datePicker onChange')}
        placeholder="Start date"
        required
        type="datePicker"
      />
    </Box>
  );
}

function FieldDropdown(props: FieldBlockProps) {
  const { onChange, ...rest } = props;

  return (
    <Box minWidth={260}>
      <H3>Dropdown</H3>
      <Field
        dropdownProps={{
          multi: true,
          searchable: false,
        }}
        {...rest}
        items={frameworks}
        label="Frameworks"
        name="frameworks"
        onChange={onChange ?? action('dropdown onChange')}
        type="dropdown"
      />
    </Box>
  );
}

function FieldEmail(props: FieldBlockProps) {
  const { onChange, ...rest } = props;

  return (
    <Box>
      <H3>E-mail</H3>
      <Field
        {...rest}
        label="E-Mail"
        name="email"
        onChange={onChange ?? action('email onChange')}
        placeholder="Your e-mail"
        required
        type="text"
        validations={['email']}
      />
    </Box>
  );
}

function FieldFile(props: FieldBlockProps) {
  const { onChange, ...rest } = props;

  return (
    <Box>
      <H3>File</H3>
      <Field
        {...rest}
        label="Picture"
        name="picture"
        onChange={onChange ?? action('file onChange')}
        type="file"
      />
    </Box>
  );
}

function FieldPassword(props: FieldBlockProps) {
  const { onChange, ...rest } = props;

  return (
    <Box>
      <H3>Password</H3>
      <Field
        {...rest}
        name="password"
        onChange={onChange ?? action('password onChange')}
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
  );
}

function FieldRadio(props: FieldBlockProps) {
  const { onChange, ...rest } = props;

  return (
    <Box>
      <H3>Radio</H3>
      <Field
        {...rest}
        items={specializations}
        label="Specialization"
        name="specialization"
        onChange={onChange ?? action('radio onChange')}
        required
        type="radio"
      />
    </Box>
  );
}

function FieldSelect(props: FieldBlockProps) {
  const { onChange, ...rest } = props;

  return (
    <Box>
      <H3>Select</H3>
      <Field
        {...rest}
        label="Area"
        name="area"
        onChange={onChange ?? action('select onChange')}
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
  );
}

function FieldText(props: FieldBlockProps) {
  const { onChange, ...rest } = props;

  return (
    <Box>
      <H3>Text</H3>
      <Field
        {...rest}
        formatter="money"
        label="Salary (Min)"
        minLength={5}
        name="salaryMin"
        onChange={onChange ?? action('text onChange')}
        placeholder="$0"
        required
        type="text"
      />
    </Box>
  );
}

function FieldTextarea(props: FieldBlockProps) {
  const { onChange, ...rest } = props;

  return (
    <Box>
      <H3>Textarea</H3>
      <Field
        {...rest}
        assistiveText="Tell us a little about your experience"
        label="Resume"
        name="resume"
        onChange={onChange ?? action('textarea onChange')}
        placeholder="..."
        type="textarea"
      />
    </Box>
  );
}

function FieldToggle(props: FieldBlockProps) {
  const { onChange, ...rest } = props;

  return (
    <Box>
      <H3>Toggle</H3>
      <Field
        {...rest}
        label="Are you available to start immediately?"
        name="availability"
        onChange={onChange ?? action('toggle onChange')}
        type="toggle"
      />
    </Box>
  );
}

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
  parameters: {
    ...addChromaticModes('desktop_light', 'desktop_dark'),
  },
  render: props => <Form>{() => <Field {...props} />}</Form>,
};

export const Types: Story = {
  argTypes: {
    ...hideProps(
      'assistiveText',
      'autoComplete',
      'clearError',
      'datePickerProps',
      'dropdownProps',
      'formatter',
      'id',
      'inline',
      'items',
      'label',
      'maxLength',
      'minLength',
      'name',
      'onBlur',
      'onChange',
      'onFocus',
      'placeholder',
      'readOnly',
      'required',
      'setValueAs',
      'skipValidation',
      'type',
      'validationOptions',
      'validations',
      'value',
    ),
  },
  parameters: {
    ...addChromaticModes('desktop_light', 'desktop_dark'),
  },
  render: props => (
    <Form>
      {() => (
        <Box maxWidth={800} width="100%">
          <Grid columnGap={32} templateColumns="repeat(auto-fit, minmax(290px, 1fr))">
            <FieldCheckbox {...props} />
            <FieldColor {...props} />
            <FieldDatePicker {...props} />
            <FieldDropdown {...props} />
            <FieldEmail {...props} />
            <FieldFile {...props} />
            <FieldPassword {...props} />
            <FieldRadio {...props} />
            <FieldSelect {...props} />
            <FieldText {...props} />
            <FieldTextarea {...props} />
            <FieldToggle {...props} />
          </Grid>
        </Box>
      )}
    </Form>
  ),
};

const mockOnBlur = fn();
const mockOnChange = fn();
const mockOnFocus = fn();

export const TestCheckbox: Story = {
  ...hideStoryFromDocsPage(),
  // tags: ['hidden'],
  args: {
    name: 'checkbox',
    type: 'checkbox',
    onChange: mockOnChange,
  },
  render: props => <Form>{() => <FieldCheckbox {...props} />}</Form>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    mockOnChange.mockClear();
    await canvas.findByTestId('Field');

    const checkboxElements = canvas.getAllByTestId('CheckboxElement');
    const checkboxes = canvas.getAllByRole('checkbox');

    await userEvent.click(checkboxElements[0]);
    await expect(checkboxes[0]).toBeChecked();
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenNthCalledWith(1, ['full-time']);
    });

    await userEvent.click(checkboxElements[0]);
    await expect(checkboxes[0]).not.toBeChecked();
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenNthCalledWith(2, []);
    });
  },
};

export const TestDatePicker: Story = {
  ...hideStoryFromDocsPage(),
  // tags: ['hidden'],
  args: {
    name: 'datePicker',
    type: 'datePicker',
    onChange: mockOnChange,
  },
  render: props => <Form>{() => <FieldDatePicker {...props} />}</Form>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    mockOnChange.mockClear();
    await canvas.findByTestId('Field');

    await userEvent.click(canvas.getByTestId('DatePickerSelectorButton'));
    await expect(canvas.getByTestId('DatePickerSelectorContent')).toHaveAttribute(
      'data-state',
      'open',
    );

    const days = canvas.getAllByRole('gridcell');

    // select a date
    await userEvent.click(days[10]);
    await expect(canvas.getByTestId('DatePickerSelectorContent')).toHaveAttribute(
      'data-state',
      'closed',
    );
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenNthCalledWith(1, expect.stringMatching(/^\d{4}-\d{2}-\d{2}/));
    });

    await userEvent.click(canvas.getByTestId('DatePickerSelectorButton'));
    await expect(canvas.getByTestId('DatePickerSelectorContent')).toHaveAttribute(
      'data-state',
      'open',
    );

    // unselect a date
    await userEvent.click(days[10]);
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenNthCalledWith(2, '');
    });

    await userEvent.click(document.body);
    await expect(canvas.getByTestId('DatePickerSelectorContent')).toHaveAttribute(
      'data-state',
      'closed',
    );
  },
};

export const TestDropdownMulti: Story = {
  ...hideStoryFromDocsPage(),
  // tags: ['hidden'],
  args: {
    name: 'dropdown',
    type: 'dropdown',
    onChange: mockOnChange,
  },
  render: props => <Form>{() => <FieldDropdown {...props} />}</Form>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    mockOnChange.mockClear();
    await canvas.findByTestId('Field');

    await userEvent.click(canvas.getByLabelText('Toggle'));
    await expect(await canvas.findByTestId('DropdownItems')).toBeInTheDocument();

    await userEvent.click(canvas.getAllByRole('listitem')[1]);

    await userEvent.click(canvas.getByLabelText('Toggle'));
    await expect(canvas.queryByTestId('DropdownItems')).not.toBeInTheDocument();
    await expect(canvas.getByTestId('ContentItem')).toHaveTextContent('Angular');

    await userEvent.click(canvas.getByLabelText('Toggle'));
    await userEvent.click(canvas.getAllByRole('listitem')[1]);
    await userEvent.click(canvas.getAllByRole('listitem')[2]);

    await userEvent.click(canvas.getByLabelText('Toggle'));
    await expect(canvas.queryByTestId('DropdownItems')).not.toBeInTheDocument();
    await expect(canvas.getByTestId('ContentItem')).not.toHaveTextContent('Angular');
    await expect(canvas.getByTestId('ContentItem')).toHaveTextContent('Flutter');
  },
};

export const TestDropdownSingle: Story = {
  ...hideStoryFromDocsPage(),
  // tags: ['hidden'],
  args: {
    name: 'dropdown',
    type: 'dropdown',
    dropdownProps: {
      multi: false,
      searchable: true,
    },
    onChange: mockOnChange,
  },
  render: props => <Form>{() => <FieldDropdown {...props} />}</Form>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    mockOnChange.mockClear();
    await canvas.findByTestId('Field');

    await userEvent.click(canvas.getByLabelText('Toggle'));
    await expect(await canvas.findByTestId('DropdownItems')).toBeInTheDocument();

    await userEvent.type(canvas.getByRole('textbox'), 'ang');

    await waitFor(() => {
      expect(canvas.getAllByRole('listitem')).toHaveLength(1);
    });

    await userEvent.click(canvas.getByRole('listitem'));

    await expect(canvas.queryByTestId('DropdownItems')).not.toBeInTheDocument();
    await expect(canvas.getByTestId('ContentItem')).toHaveTextContent('Angular');
  },
};

export const TestRadio: Story = {
  ...hideStoryFromDocsPage(),
  // tags: ['hidden'],
  args: {
    name: 'radio',
    type: 'radio',
    onChange: mockOnChange,
  },
  render: props => <Form>{() => <FieldRadio {...props} />}</Form>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    mockOnChange.mockClear();
    await canvas.findByTestId('Field');

    const radioElements = canvas.getAllByTestId('RadioElement');

    await userEvent.click(radioElements[0]);
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenNthCalledWith(1, 'back-end');
    });

    await userEvent.click(radioElements[1]);
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenNthCalledWith(2, 'devops');
    });
  },
};

export const TestSelect: Story = {
  ...hideStoryFromDocsPage(),
  // tags: ['hidden'],
  args: {
    name: 'select',
    type: 'select',
    onBlur: mockOnBlur,
    onChange: mockOnChange,
    onFocus: mockOnFocus,
  },
  render: props => <Form>{() => <FieldSelect {...props} />}</Form>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    mockOnBlur.mockClear();
    mockOnChange.mockClear();
    mockOnFocus.mockClear();
    await canvas.findByTestId('Field');

    const select = canvas.getByTestId('Select');

    await userEvent.click(select);
    await waitFor(() => {
      expect(mockOnFocus).toHaveBeenCalledTimes(1);
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });

    await userEvent.selectOptions(select, ['data']);
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenNthCalledWith(1, 'data');
    });
  },
};

export const TestText: Story = {
  ...hideStoryFromDocsPage(),
  // tags: ['hidden'],
  args: {
    name: 'text',
    type: 'text',
    onBlur: mockOnBlur,
    onChange: mockOnChange,
    onFocus: mockOnFocus,
  },
  render: props => <Form>{() => <FieldText {...props} />}</Form>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    mockOnBlur.mockClear();
    mockOnChange.mockClear();
    mockOnFocus.mockClear();
    await canvas.findByTestId('Field');

    await userEvent.click(canvas.getByTestId('Input'));
    await waitFor(() => {
      expect(mockOnFocus).toHaveBeenCalledTimes(1);
    });

    await userEvent.type(canvas.getByTestId('Input'), '12345');
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(5);
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });
  },
};

export const TestTextarea: Story = {
  ...hideStoryFromDocsPage(),
  // tags: ['hidden'],
  args: {
    name: 'textarea',
    type: 'textarea',
    onBlur: mockOnBlur,
    onChange: mockOnChange,
    onFocus: mockOnFocus,
  },
  render: props => <Form>{() => <FieldTextarea {...props} />}</Form>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    mockOnBlur.mockClear();
    mockOnChange.mockClear();
    mockOnFocus.mockClear();
    await canvas.findByTestId('Field');

    await userEvent.click(canvas.getByTestId('Textarea'));
    await waitFor(() => {
      expect(mockOnFocus).toHaveBeenCalledTimes(1);
    });

    await userEvent.type(canvas.getByTestId('Textarea'), '12345');
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(5);
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });
  },
};

export const TestToggle: Story = {
  ...hideStoryFromDocsPage(),
  // tags: ['hidden'],
  args: {
    name: 'toggle',
    type: 'toggle',
    debug: true,
    onChange: mockOnChange,
  },
  render: props => <Form>{() => <FieldToggle {...props} />}</Form>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    mockOnChange.mockClear();
    await canvas.findByTestId('Field');

    await userEvent.click(canvas.getByTestId('Toggle'));
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenNthCalledWith(1, true);
    });

    await expect(canvas.getByTestId('FieldDebug')).toBeInTheDocument();
  },
};
