import * as React from 'react';
import { FormProvider, useForm, UseFormProps } from 'react-hook-form';
import { AnyObject } from '@gilbarbara/types';

import { FormWrapperProps } from './types';

interface Props<T> extends UseFormProps<T> {
  children: (props: FormWrapperProps<T>) => React.ReactNode;
}

export function FormWrapper<T extends AnyObject = AnyObject>({
  children,
  ...props
}: Props<T>): JSX.Element {
  const formMethods = useForm<T>({
    mode: 'onChange',
    ...props,
  });

  return <FormProvider {...formMethods}>{children({ formMethods })}</FormProvider>;
}
