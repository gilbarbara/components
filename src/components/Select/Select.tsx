import { ChangeEvent, forwardRef, useCallback, useRef, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useMergeRefs, useMount } from '@gilbarbara/hooks';
import { Simplify } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { appearanceStyles, baseStyles, getStyledOptions, inputStyles } from '~/modules/system';

import {
  OmitElementProps,
  StyledProps,
  WithAccent,
  WithBorderless,
  WithChildren,
  WithElementSpacing,
  WithFormElements,
} from '~/types';

export interface SelectKnownProps
  extends StyledProps,
    WithAccent,
    WithBorderless,
    WithChildren,
    Omit<WithElementSpacing, 'suffixSpacing'>,
    WithFormElements {
  large?: boolean;
}

export type SelectProps = Simplify<OmitElementProps<HTMLSelectElement, SelectKnownProps>>;

export const defaultProps = {
  accent: 'primary',
  borderless: false,
  disabled: false,
  large: false,
  multiple: false,
  prefixSpacing: false,
  width: '100%',
} satisfies Omit<SelectProps, 'children' | 'name'>;

export const StyledSelect = styled(
  'select',
  getStyledOptions(),
)<SelectProps & { filled: boolean }>(props => {
  const { accent = defaultProps.accent, filled, large, multiple } = props;
  const { darkColor, darkMode, grayScale, spacing, white, ...theme } = getTheme(props);
  const { mainColor } = getColorTokens(accent, null, theme);

  let color = grayScale['500'];
  const paddingY = large ? spacing.sm : spacing.xs;

  if (filled) {
    color = darkMode ? white : darkColor;
  }

  if (multiple) {
    color = grayScale['500'];
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
      border-color: ${mainColor};
    `};

    &[multiple] {
      padding: 0;

      > option {
        padding: ${paddingY} ${spacing.md};

        &:not(:checked) {
          background: ${`${white} linear-gradient(0deg, ${white} 0%, ${white} 100%)`};
        }

        &:checked {
          background: ${`${mainColor} linear-gradient(0deg, ${mainColor} 0%, ${mainColor} 100%)`};
          color: ${white};
          font-weight: bold;
        }
      }
    }
  `;
});

export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { name, onChange, ...rest } = { ...defaultProps, ...props };
  const localRef = useRef<HTMLSelectElement>(null);
  const mergedRefs = useMergeRefs(localRef, ref);
  const [isFilled, setFilled] = useState(!!rest.defaultValue || !!rest.value);

  useMount(() => {
    setFilled(!!localRef.current?.value);
  });

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setFilled(!!event.target.value);

      onChange?.(event);
    },
    [onChange],
  );

  return (
    <StyledSelect
      ref={mergedRefs}
      data-component-name="Select"
      filled={isFilled}
      id={name}
      name={name}
      onChange={handleChange}
      {...rest}
    />
  );
});

Select.displayName = 'Select';
