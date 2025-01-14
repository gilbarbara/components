import { FormProvider, useForm as useHookForm } from 'react-hook-form';
import { PlainObject } from '@gilbarbara/types';

import { FormProps, useForm } from './useForm';

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
export function Form<T extends PlainObject<any> = PlainObject<any>>(props: FormProps<T>) {
  const {
    componentProps: { children, ...rest },
  } = useForm(props);
  const formMethods = useHookForm<T>({
    mode: 'onChange',
    ...rest,
  });

  return <FormProvider {...formMethods}>{children({ formMethods })}</FormProvider>;
}

Form.displayName = 'Form';

export type { FormProps, FormRenderProps } from './useForm';

export type { SubmitHandler as FormSubmitHandler } from 'react-hook-form';
