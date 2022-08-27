import { FieldValues, FormProvider, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import { AnyObject } from '@gilbarbara/types';

export interface FormProps<T extends FieldValues = FieldValues> {
  formMethods: UseFormReturn<T>;
}

interface Props<T extends FieldValues> extends UseFormProps<T> {
  children: (props: FormProps<T>) => JSX.Element;
}

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
export function Form<T extends AnyObject = AnyObject>({
  children,
  ...props
}: Props<T>): JSX.Element {
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

export { SubmitHandler as FormSubmitHandler } from 'react-hook-form';
