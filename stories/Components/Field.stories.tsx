import * as React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import { ComponentMeta } from '@storybook/react';

import {
  Box,
  Button,
  Divider,
  Field,
  FieldCheckboxGroup,
  FormWrapper,
  Grid,
  Group,
  H2,
  H3,
} from '../../src';
import { FormWrapperProps } from '../../src/types';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Field',
  component: Field,
  argTypes: {
    ...hideProps('onBlur', 'onFocus', 'onChange'),
  },
} as ComponentMeta<typeof Field>;

export interface FormData {
  acceptedSeniority?: string[];
  area: string;
  availability: boolean;
  contractType: string[];
  email: string;
  experience: number;
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
  specialization: string;
}

const areas = [
  { label: 'Data', value: 'data' },
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
];
const contractTypes = [
  {
    label: 'Full-time',
    name: 'full-time',
  },
  {
    label: 'Part-time',
    name: 'part-time',
  },
  {
    label: 'Freelance',
    name: 'freelance',
  },
];
const languages = ['Go', 'Java', 'Kotlin/Java', 'Node.js', 'Python'].map(d => ({
  label: d,
  value: d,
}));

const specializations = [
  { value: 'back-end', label: 'Back-End' },
  { value: 'devops', label: 'DevOps' },
  { value: 'front-end', label: 'Front-End' },
  { value: 'full-stack', label: 'Full Stack' },
];

const seniorities = [
  { label: 'Junior', name: 'junior' },
  { label: 'Mid-Level', name: 'mid-level' },
  { label: 'Senior', name: 'senior' },
  { label: 'Specialist', name: 'specialist' },
  { label: 'Leadership', name: 'leadership' },
];

function BaseForm<T extends FormWrapperProps<FormData>>(props: T): JSX.Element {
  const { formMethods } = props;

  const {
    formState: { isDirty },
    handleSubmit,
  } = formMethods;

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleFormSubmit: SubmitHandler<FormData> = formData => {
    action('handleFormSubmit')(formData);
  };

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
        <Field label="Area" name="area" required type="select">
          <option value="">Select an option</option>
          {areas.map(d => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </Field>
        <Field
          dropdownOptions={{
            multi: true,
            options: languages,
          }}
          label="Languages"
          name="languages"
          required
          type="dropdown"
        />
      </Grid>

      <Field
        label="Specialization"
        name="specialization"
        options={specializations}
        required
        type="radio"
      />

      <FieldCheckboxGroup
        assistiveText="Select which seniorities you are willing to accept"
        label="Accepted seniorities"
        name="acceptedSeniority"
        options={seniorities}
      />

      <Divider mb="xl" mt="md" />

      <H3 light>Hiring</H3>

      <Grid gap={20} templateColumns="repeat(2, 1fr)">
        <Field
          formatter="moneyBR"
          label="Salary (Min)"
          minLength={5}
          name="salaryMin"
          placeholder="R$ 0"
          required
          type="text"
        />
        <Field
          formatter="moneyBR"
          label="Salary (Max)"
          name="salaryMax"
          placeholder="R$ 0"
          required
          type="text"
        />
      </Grid>
      <FieldCheckboxGroup
        label="Contract Type"
        name="contractType"
        options={contractTypes}
        required
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

      <Group distribution="flex-end">
        <Button disabled={!isDirty} type="submit">
          Salvar
        </Button>
      </Group>
    </Box>
  );
}

export const Basic = () => {
  const defaultValues: FormData = {
    acceptedSeniority: ['specialist', 'leadership'],
    area: 'design',
    availability: true,
    contractType: ['full-time'],
    email: 'test-user@example.com',
    experience: 8,
    housingAssistance: true,
    languages: ['Kotlin/Java', 'Go'],
    locationCity: 'São Paulo',
    locationState: 'SP',
    locationRequired: true,
    name: 'Test user',
    password: 'MzY2NGFkYjd!',
    passwordConfirmation: 'MzY2NGFkYjd!',
    phone: 11988776655,
    resume: '',
    salaryMax: 20000,
    salaryMin: 10000,
    specialization: 'front-end',
  };

  return (
    <FormWrapper<FormData> defaultValues={defaultValues}>
      {formProps => <BaseForm {...formProps} />}
    </FormWrapper>
  );
};
