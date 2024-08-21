import { mergeProps } from '@gilbarbara/helpers';
import { PlainObject } from '@gilbarbara/types';

import { useTheme } from './useTheme';

export function useComponentProps<
  TProps extends PlainObject<any>,
  TDefaultProps extends PlainObject<any>,
>(props: TProps, defaultProps: TDefaultProps = {} as TDefaultProps) {
  const { getDataAttributes, theme } = useTheme();
  const propsWithTheme = { ...props, theme };

  return {
    componentProps: mergeProps(defaultProps, propsWithTheme),
    getDataAttributes,
  };
}
