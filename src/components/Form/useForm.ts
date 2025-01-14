import { ReactNode } from 'react';
import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

export type FormProps<T extends FieldValues> = Simplify<
  UseFormProps<T> & {
    children: (props: FormRenderProps<T>) => ReactNode;
  }
>;

export interface FormRenderProps<T extends FieldValues = FieldValues> {
  formMethods: UseFormReturn<T>;
}

export function useForm<TValues extends FieldValues>(props: FormProps<TValues>) {
  return useComponentProps(props);
}
