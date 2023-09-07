import { SubmitHandler } from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { Box, Button, Divider, Field, Grid, H2, H3, Spacer } from '~';

import {
  areas,
  contractTypes,
  frameworks,
  languages,
  seniorities,
  specializations,
} from '~/stories/__fixtures__';
import { addChromaticModes, hideNoControlsWarning } from '~/stories/__helpers__';

import { Form, FormRenderProps } from './Form';

type Story = StoryObj<typeof Form>;

export default {
  title: 'Forms/Form',
  component: Form,
  parameters: {
    controls: hideNoControlsWarning(),
    ...addChromaticModes('desktop_light', 'desktop_dark'),
  },
} satisfies Meta<typeof Form>;

export interface FormData {
  area: string;
  availability: boolean;
  birthday?: string;
  color?: string;
  contractType: string[];
  email: string;
  experience: number;
  frameworks: string[];
  housingAssistance?: boolean;
  languages: string[];
  locationCity?: string;
  locationRequired: boolean;
  locationState?: string;
  name: string;
  password: string;
  passwordConfirmation: string;
  phone: number;
  resume?: string;
  salaryMax: number;
  salaryMin: number;
  seniority?: string;
  specialization: string;
}

const defaultValues: FormData = {
  area: 'engineering',
  availability: true,
  birthday: '1990-10-03',
  color: '#d00000',
  contractType: ['full-time'],
  email: 'test-user@example.com',
  experience: 8,
  frameworks: ['react', 'svelte'],
  housingAssistance: true,
  languages: ['nodejs', 'typescript'],
  locationCity: 'São Paulo',
  locationRequired: true,
  locationState: 'SP',
  name: 'Test user',
  password: 'MzY2NGFkYjd!',
  passwordConfirmation: 'MzY2NGFkYjd!',
  phone: 11988776655,
  resume: '',
  salaryMax: 20000,
  salaryMin: 10000,
  seniority: 'specialist',
  specialization: 'front-end',
};

function EditForm({ formMethods }: FormRenderProps<FormData>) {
  const {
    formState: { isDirty },
    handleSubmit,
    watch,
  } = formMethods;
  const area = watch('area');

  const handleFormSubmit: SubmitHandler<FormData> = formData => {
    action('handleFormSubmit')(formData);
  };

  let engineeringSkills;

  if (area === 'engineering') {
    engineeringSkills = (
      <>
        <Field
          items={specializations}
          label="Specialization"
          name="specialization"
          required
          type="radio"
        />

        <Grid gap={20} templateColumns="repeat(2, 1fr)">
          <Field
            dropdownProps={{
              multi: true,
            }}
            items={languages}
            label="Languages"
            name="languages"
            required
            type="dropdown"
          />
          <Field
            dropdownProps={{
              multi: true,
              searchable: false,
            }}
            items={frameworks}
            label="Frameworks"
            name="frameworks"
            type="dropdown"
          />
        </Grid>
      </>
    );
  }

  return (
    <Box as="form" method="POST" onSubmit={handleSubmit(handleFormSubmit)} width={640}>
      <H2>Create profile</H2>
      <Field label="Name" name="name" placeholder="Your name" required type="text" />
      <Grid gap={20} templateColumns="repeat(2, 1fr)">
        <Field
          label="E-Mail"
          name="email"
          placeholder="Your e-mail"
          required
          type="text"
          validations={['email']}
        />
        <Field
          formatter="phoneBR"
          label="Phone"
          name="phone"
          placeholder="Your phone"
          required
          type="text"
          validations={['phoneBR']}
        />
      </Grid>
      <Grid gap={20} templateColumns="repeat(2, 1fr)">
        <Field
          label="Password"
          name="password"
          placeholder="Your password"
          required
          type="password"
          validations={['password']}
        />
        <Field
          label="Password Confirmation"
          name="passwordConfirmation"
          placeholder="Type your password again"
          required
          type="password"
          validations={['equalsTo:password']}
        />
      </Grid>

      <Grid gap={20} templateColumns="repeat(2, 1fr)">
        <Field label="Picture" name="picture" type="file" />
        <Field label="Profile color" name="color" type="color" />
      </Grid>

      <Grid gap={20} templateColumns="repeat(2, 1fr)">
        <Field
          datePickerProps={{
            captionLayout: 'dropdown-buttons',
            fromYear: 1900,
            toYear: new Date().getFullYear(),
            mode: 'single',
          }}
          label="Birthday"
          name="birthday"
          type="datePicker"
        />
      </Grid>

      <Divider mb="xl" mt="md" />

      <H3 light>Skills</H3>

      <Grid gap={20} templateColumns="repeat(2, 1fr)">
        <Field label="Area" name="area" required type="select">
          <option value="">Select an option</option>
          {areas.map(d => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </Field>
        <Field
          dropdownProps={{ searchable: false }}
          items={seniorities}
          label="Seniority"
          name="seniority"
          required
          type="dropdown"
        />
      </Grid>

      {engineeringSkills}

      <Divider mb="xl" mt="md" />

      <H3 light>Hiring</H3>

      <Grid gap={20} templateColumns="repeat(2, 1fr)">
        <Field
          formatter="money"
          label="Salary (Min)"
          minLength={5}
          name="salaryMin"
          placeholder="R$ 0"
          required
          type="text"
        />
        <Field
          formatter="money"
          label="Salary (Max)"
          name="salaryMax"
          placeholder="R$ 0"
          required
          type="text"
        />
      </Grid>
      <Field
        items={contractTypes}
        label="Contract Type"
        name="contractType"
        required
        type="checkbox"
      />

      <Field label="Are you available to start immediately?" name="availability" type="toggle" />

      <Divider mb="xl" mt="md" />
      <H3 light>About yourself</H3>

      <Field
        assistiveText="Tell us a little about your experience"
        label="Resume"
        name="resume"
        placeholder="..."
        type="textarea"
      />

      <Spacer distribution="end">
        <Button disabled={!isDirty} type="submit">
          Send
        </Button>
      </Spacer>
    </Box>
  );
}

export const Basic: Story = {
  render: () => <Form<FormData> defaultValues={defaultValues}>{EditForm}</Form>,
};
