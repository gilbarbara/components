import { ChangeEvent, forwardRef, ReactNode, useCallback, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import { useMount } from 'react-use';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import is from 'is-lite';

import { getTheme } from './modules/helpers';
import {
  appearanceStyles,
  baseStyles,
  getStyledOptions,
  inputStyles,
  isDarkMode,
} from './modules/system';
import {
  ComponentProps,
  StyledProps,
  WithBorderless,
  WithElementSpacing,
  WithFormElements,
} from './types';

export interface SelectKnownProps
  extends StyledProps,
    WithBorderless,
    Omit<WithElementSpacing, 'suffixSpacing'>,
    WithFormElements {
  children: ReactNode;
  large?: boolean;
}

export type SelectProps = ComponentProps<HTMLSelectElement, SelectKnownProps>;

export const StyledSelect = styled(
  'select',
  getStyledOptions(),
)<SelectProps & { filled: boolean }>(props => {
  const { borderless, filled, large, multiple } = props;
  const { colors, darkColor, grayMid, spacing, white } = getTheme(props);

  let color = isDarkMode(props) ? white : darkColor;
  const paddingY = large ? spacing.sm : spacing.xs;

  if (borderless) {
    color = filled ? white : grayMid;
  }

  if (multiple) {
    color = grayMid;
  }

  return css`
    ${appearanceStyles};
    ${baseStyles(props)};
    background-image: url('${`data:image/svg+xml,%3Csvg width="10px" height="6px" viewBox="0 0 10 6" version="1.1" xmlns="http://www.w3.org/2000/svg"%3E%3Cpolygon fill="${color.replace(
      '#',
      '%23',
    )}" points="-8.8817842e-16 0 10 0 4.9980424 6"%3E%3C/polygon%3E%3C/svg%3E`}');
    background-repeat: no-repeat;
    background-position: right 8px center;
    ${inputStyles(props, 'select')};
    color: ${filled ? color : grayMid};

    ${filled &&
    css`
      border-color: ${colors.primary};
    `};

    &[multiple] {
      padding: 0;

      > option {
        padding: ${paddingY} ${spacing.md};

        &:not(:checked) {
          background: ${`${white} linear-gradient(0deg, ${white} 0%, ${white} 100%)`};
        }

        &:checked {
          background: ${`${colors.primary} linear-gradient(0deg, ${colors.primary} 0%, ${colors.primary} 100%)`};
          color: ${white};
          font-weight: bold;
        }
      }
    }
  `;
});

export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { defaultValue, name, onChange, value } = props;
  const localRef = useRef<HTMLSelectElement>(null);
  const [isFilled, setFilled] = useState(!!defaultValue || !!value);

  useMount(() => {
    setFilled(!!localRef.current?.value);
  });

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setFilled(!!event.target.value);

      if (is.function(onChange)) {
        onChange(event);
      }
    },
    [onChange],
  );

  return (
    <StyledSelect
      ref={mergeRefs([localRef, ref])}
      data-component-name="Select"
      filled={isFilled}
      id={name}
      {...props}
      onChange={handleChange}
    />
  );
});

Select.defaultProps = {
  large: false,
  multiple: false,
};
