import { JSX } from 'react';
import { FieldValues, FormProvider, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import { PlainObject, Simplify } from '@gilbarbara/types';

export interface FormRenderProps<T extends FieldValues = FieldValues> {
  formMethods: UseFormReturn<T>;
}

export type FormProps<T extends FieldValues> = Simplify<
  UseFormProps<T> & {
    children: (props: FormRenderProps<T>) => JSX.Element;
  }
>;

/**
 A wrapper for the `react-hook-form` FormProvider for use with the **Field** component.

 It will execute the `children` with the `formMethods` from the `useForm` hook as props. You can use it inline or with a functional component.

 ```tsx
 import { Box, Button, Field, Form, FormProps, FormSubmitHandler } from '@gilbarbara/components';

 interface FormData {
   name: string;
 }

 function EditFormFn({ formMethods }: FormProps<FormData>) {
   const { formState: { isDirty }, handleSubmit, } = formMethods;

   const handleFormSubmit: SubmitHandler<FormData> = formData => {
     console.log(formData);
   };

   return (
     <Box as="form" method="POST" onSubmit={handleSubmit(handleFormSubmit)}>
       <Field label="Name" name="name" placeholder="Your name" required type="text" />

       <Button disabled={!isDirty} type="submit">
         Send
       </Button>
     </Box>
   );
 }

 export default function EditForm() {
   return <Form defaultValues={{ name: 'Test User' }}>{EditFormFn}</Form>;
 }
 ```
 */
export function Form<T extends PlainObject<any> = PlainObject<any>>({
  children,
  ...props
}: FormProps<T>) {
  const formMethods = useForm<T>({
    mode: 'onChange',
    ...props,
  });

  return (
    <FormProvider data-component-name="Form" {...formMethods}>
      {children({ formMethods })}
    </FormProvider>
  );
}

Form.displayName = 'Form';

export type { SubmitHandler as FormSubmitHandler } from 'react-hook-form';
