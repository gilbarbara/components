import * as React from 'react';
import mergeRefs from 'react-merge-refs';
import { useMount } from 'react-use';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import is from 'is-lite';

import { getTheme } from './modules/helpers';
import {
  appearanceStyles,
  baseStyles,
  inputStyles,
  isDarkMode,
  styledOptions,
} from './modules/system';
import { ComponentProps, StyledProps } from './types';

export interface SelectKnownProps extends StyledProps {
  bigger?: boolean;
  borderless?: boolean;
  children: React.ReactNode;
}

export type SelectProps = ComponentProps<HTMLSelectElement, SelectKnownProps>;

export const StyledSelect = styled(
  'select',
  styledOptions,
)<SelectProps & { filled: boolean }>(props => {
  const { bigger, borderless, filled, multiple } = props;
  const { colors, darkColor, grayMid, inputHeight, spacing, white } = getTheme(props);

  const paddingX = bigger ? '16px' : '12px';
  let color = isDarkMode(props) ? white : darkColor;

  if (borderless) {
    color = filled ? white : grayMid;
  }

  if (multiple) {
    color = grayMid;
  }

  return css`
    ${baseStyles(props)};
    ${appearanceStyles};
    ${inputStyles(props)}
    background-image: url('${`data:image/svg+xml,%3Csvg width="10px" height="6px" viewBox="0 0 10 6" version="1.1" xmlns="http://www.w3.org/2000/svg"%3E%3Cpolygon fill="${color.replace(
      '#',
      '%23',
    )}" points="-8.8817842e-16 0 10 0 4.9980424 6"%3E%3C/polygon%3E%3C/svg%3E`}');
    background-repeat: no-repeat;
    background-position: right 8px center;
    color: ${filled ? color : grayMid};
    padding: ${paddingX} ${spacing.md} ${paddingX} ${borderless ? 0 : spacing.md};
    ${!multiple ? `height: ${bigger ? inputHeight.md : inputHeight.sm}` : ''};
    white-space: nowrap;
    width: 100%;

    ${filled &&
    css`
      border-color: ${colors.primary};
    `};

    &[multiple] {
      padding: 0;

      > option {
        padding: ${paddingX} ${spacing.md};

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

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { defaultValue, name, onChange, value } = props;
  const localRef = React.useRef<HTMLSelectElement>();
  const [isFilled, setFilled] = React.useState(!!defaultValue || !!value);

  useMount(() => {
    setFilled(!!localRef.current?.value);
  });

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
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
      id={name}
      {...props}
      filled={isFilled}
      onChange={handleChange}
    />
  );
});

Select.defaultProps = {
  multiple: false,
  bigger: false,
};
Select.displayName = 'Select';
