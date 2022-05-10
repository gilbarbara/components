import { SubmitHandler } from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import { ComponentMeta } from '@storybook/react';
import { Box, Button, Divider, Field, Grid, H2, H3, Spacer } from 'src';
import { Form, FormProps } from 'src/Form';

import { hideNoControlsWarning } from '../__helpers__';

export default {
  title: 'Components/Form',
  component: Form,
  subcomponents: { Field },
  parameters: {
    controls: hideNoControlsWarning(),
  },
} as ComponentMeta<typeof Form>;

export interface FormData {
  area: string;
  availability: boolean;
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

const areas = [
  { label: 'Data', value: 'data' },
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
];

const contractTypes = [
  { label: 'Full-time', name: 'full-time' },
  { label: 'Part-time', name: 'part-time' },
  { label: 'Freelance', name: 'freelance' },
];

const frameworks = [
  { label: '.Net', value: 'dotnet' },
  { label: 'Angular', value: 'angular' },
  { label: 'Flutter', value: 'flutter' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Vue', value: 'vue' },
];

const languages = [
  { label: 'C#', value: 'csharp' },
  { label: 'Dart', value: 'dart' },
  { label: 'Go', value: 'go' },
  { label: 'Java', value: 'java' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Kotlin (Java)', value: 'kotlin' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'PHP', value: 'php' },
  { label: 'Python', value: 'python' },
  { label: 'Swift', value: 'swift' },
  { label: 'TypeScript', value: 'typescript' },
];

const specializations = [
  { label: 'Back-End', value: 'back-end' },
  { label: 'DevOps', value: 'devops' },
  { label: 'Front-End', value: 'front-end' },
  { label: 'Full Stack', value: 'full-stack' },
];

const seniorities = [
  { label: 'Junior', value: 'junior' },
  { label: 'Mid-Level', value: 'mid-level' },
  { label: 'Senior', value: 'senior' },
  { label: 'Specialist', value: 'specialist' },
  { label: 'Leadership', value: 'leadership' },
];

const defaultValues: FormData = {
  area: 'engineering',
  availability: true,
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

function EditForm({ formMethods }: FormProps<FormData>) {
  const {
    formState: { isDirty },
    handleSubmit,
    watch,
  } = formMethods;
  const area = watch('area');

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleFormSubmit: SubmitHandler<FormData> = formData => {
    action('handleFormSubmit')(formData);
  };

  let engineeringSkills;

  if (area === 'engineering') {
    engineeringSkills = (
      <>
        <Field
          label="Specialization"
          name="specialization"
          options={specializations}
          required
          type="radio"
        />

        <Grid gap={20} templateColumns="repeat(2, 1fr)">
          <Field
            dropdownProps={{
              multi: true,
            }}
            label="Languages"
            name="languages"
            options={languages}
            required
            type="dropdown"
          />
          <Field
            dropdownProps={{
              multi: true,
              searchable: false,
            }}
            label="Frameworks"
            name="frameworks"
            options={frameworks}
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
          label="Seniority"
          name="seniority"
          options={seniorities}
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
        label="Contract Type"
        name="contractType"
        options={contractTypes}
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

export function Basic() {
  return <Form<FormData> defaultValues={defaultValues}>{EditForm}</Form>;
}
