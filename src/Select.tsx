import { ChangeEvent, forwardRef, useCallback, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import { useMount } from 'react-use';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import is from 'is-lite';

import { getTheme } from './modules/helpers';
import { appearanceStyles, baseStyles, getStyledOptions, inputStyles } from './modules/system';
import {
  ComponentProps,
  StyledProps,
  WithBorderless,
  WithChildren,
  WithElementSpacing,
  WithFormElements,
} from './types';

export interface SelectKnownProps
  extends StyledProps,
    WithBorderless,
    WithChildren,
    Omit<WithElementSpacing, 'suffixSpacing'>,
    WithFormElements {
  large?: boolean;
}

export type SelectProps = ComponentProps<HTMLSelectElement, SelectKnownProps>;

export const StyledSelect = styled(
  'select',
  getStyledOptions(),
)<SelectProps & { filled: boolean }>(props => {
  const { filled, large, multiple } = props;
  const { colors, darkColor, darkMode, grayMid, spacing, white } = getTheme(props);

  let color = grayMid;
  const paddingY = large ? spacing.sm : spacing.xs;

  if (filled) {
    color = darkMode ? white : darkColor;
  }

  if (multiple) {
    color = grayMid;
  }

  return css`
    ${appearanceStyles};
    ${baseStyles(props)};
    background-image: url('${`data:image/svg+xml,%3Csvg height="16px" version="1.1" viewBox="0 0 16 16" width="16px" xmlns="http://www.w3.org/2000/svg" %3E%3Cpath d="M14,5.52466366 C14,5.41704038 13.9641256,5.32735426 13.8923766,5.25560543 L13.3004484,4.60986548 C13.1928251,4.53811658 13.0852018,4.50224213 12.9775785,4.50224213 C12.8699551,4.50224213 12.7802691,4.53811658 12.7085202,4.60986548 L8.02690583,9.3452915 L3.29147982,4.60986548 C3.21973094,4.53811658 3.13004485,4.50224213 3.02242152,4.50224213 C2.91479821,4.50224213 2.82511211,4.53811658 2.75336323,4.60986548 L2.10762332,5.25560543 C2.03587444,5.32735426 2,5.41704038 2,5.52466366 C2,5.63228701 2.03587444,5.72197313 2.10762332,5.79372196 L7.70403588,11.3901345 C7.81165919,11.4618834 7.91928251,11.4977579 8.02690583,11.4977579 C8.13452915,11.4977579 8.22421524,11.4618834 8.29596412,11.3901345 L13.8923766,5.79372196 C13.9641256,5.72197313 14,5.63228701 14,5.52466366 Z" fill="${color.replace(
      '#',
      '%23',
    )}" /%3E%3C/svg%3E`}');
    background-repeat: no-repeat;
    background-position: right 12px center;
    ${inputStyles(props, 'select')};
    color: ${color};

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
  borderless: false,
  disabled: false,
  large: false,
  multiple: false,
  prefixSpacing: false,
  width: '100%',
};
