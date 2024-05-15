import { ChangeEvent, forwardRef, KeyboardEvent, MouseEvent, ReactNode, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { usePrevious, useUpdateEffect } from '@gilbarbara/hooks';
import { PlainObject, SetRequired, Simplify } from '@gilbarbara/types';
import is from 'is-lite';

import { getColorTokens, getColorWithTone } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { baseStyles, getOutlineStyles, getStyledOptions, isDarkMode } from '~/modules/system';

import { Label } from '~/components/Label';

import {
  OmitElementProps,
  StyledProps,
  WithAccent,
  WithComponentSize,
  WithDisabled,
  WithTextOptions,
} from '~/types';

export interface ToggleKnownProps extends StyledProps, WithAccent, WithComponentSize, WithDisabled {
  /** Status (controlled mode) */
  checked?: boolean;
  /**
   * Initial status (uncontrolled mode)
   * @default false
   */
  defaultChecked?: boolean;
  label?: ReactNode;
  labelOptions?: Simplify<WithTextOptions>;
  name?: string;
  /**
   * Callback when the status changes (uncontrolled mode)
   */
  onChange?: (value: boolean) => void;
  /**
   * Callback when clicking/key down the toggle
   */
  onToggle?: (value: boolean) => void;
}

export type ToggleProps = Simplify<OmitElementProps<HTMLDivElement, ToggleKnownProps>>;

interface InnerProps extends SetRequired<ToggleProps, 'accent' | 'size'> {
  isActive: boolean;
}

const styles = {
  sm: {
    borderRadius: 8,
    height: 16,
    space: 2,
    width: 32,
  },
  md: {
    borderRadius: 10,
    height: 20,
    space: 2,
    width: 40,
  },
  lg: {
    borderRadius: 12,
    height: 24,
    space: 2,
    width: 48,
  },
};

export const defaultProps = {
  accent: 'primary',
  defaultChecked: false,
  disabled: false,
  size: 'md',
} satisfies ToggleProps;

const StyledInput = styled('input')`
  bottom: 0;
  left: 0;
  opacity: 0.0001;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
`;

const StyledTrack = styled(
  'span',
  getStyledOptions(),
)<InnerProps>(props => {
  const { accent, isActive } = props;
  const { grayScale, radius, ...theme } = getTheme(props);

  const { mainColor } = getColorTokens(accent, null, theme);
  let backgroundColor = isDarkMode(props) ? grayScale['700'] : grayScale['100'];

  if (isActive) {
    backgroundColor = mainColor;
  }

  return css`
    background-color: ${backgroundColor};
    border-radius: ${radius.sm};
    bottom: 0;
    left: 0;
    position: absolute;
    transition: background-color 0.4s;
    right: 0;
    top: 0;
  `;
});

const StyledButton = styled(
  'span',
  getStyledOptions(),
)<InnerProps>(props => {
  const { accent, disabled, isActive, size } = props;
  const { grayScale, white, ...theme } = getTheme(props);
  const { mainColor } = getColorTokens(accent, null, theme);

  let backgroundColor = white;

  if (accent === 'white' && isActive) {
    backgroundColor = grayScale['800'];
  } else if (isActive) {
    backgroundColor = getColorWithTone(mainColor, '50');
  }

  const { height, space } = styles[size];

  return css`
    background-color: ${backgroundColor};
    border-radius: 50%;
    bottom: ${px(space)};
    left: ${isActive ? px(height + 2) : px(space)};
    opacity: ${disabled ? 0.7 : 1};
    position: absolute;
    top: ${px(space)};
    transition:
      background-color 0.4s,
      left 0.2s ease;
    width: ${px(height - 4)};
  `;
});

export const StyledToggle = styled('div')<SetRequired<Omit<ToggleProps, 'onToggle'>, 'size'>>(
  props => {
    const { accent = 'primary', disabled, label, size } = props;

    const { height, width } = styles[size];

    return css`
      ${baseStyles(props)};
      cursor: ${disabled ? 'default' : 'pointer'};
      height: ${px(height)};
      margin-right: ${label ? '8px' : 0};
      opacity: ${disabled ? 0.8 : 1};
      position: relative;
      user-select: none;
      vertical-align: middle;
      width: ${px(width)};

      &:focus {
        outline: none;

        [data-component-name='ToggleTrack'] {
          ${getOutlineStyles(getColorTokens(accent, null, getTheme(props)).mainColor)};
        }
      }
    `;
  },
);

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>((props, ref) => {
  const {
    accent,
    checked,
    defaultChecked,
    disabled,
    label,
    labelOptions,
    name,
    onChange,
    onToggle,
    size,
    ...rest
  } = { ...defaultProps, ...props };
  const [isActive, setActive] = useState(is.boolean(checked) ? checked : defaultChecked);
  const previousChecked = usePrevious(checked);

  useUpdateEffect(() => {
    if (is.boolean(checked) && previousChecked !== checked) {
      setActive(checked);
    }
  }, [checked, previousChecked]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (is.boolean(checked)) {
      return;
    }

    const { target } = event;

    setActive(target.checked);

    onChange?.(target.checked);
  };

  const handleClickLabel = () => {
    if (!disabled) {
      onToggle?.(!isActive);
    }
  };

  const handleClickInput = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (disabled || !['Space', 'Enter'].includes(event.code)) {
      return;
    }

    const status = !isActive;

    onToggle?.(status);

    if (is.boolean(checked)) {
      return;
    }

    setActive(status);
    onChange?.(status);
  };

  const value = isActive ? 'on' : 'off';
  const checkStatus: PlainObject<boolean> = {};

  if (is.boolean(checked)) {
    checkStatus.checked = checked;
  } else {
    checkStatus.defaultChecked = defaultChecked;
  }

  return (
    <Label
      data-component-name="Toggle"
      inline
      onClick={handleClickLabel}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
      {...labelOptions}
    >
      <StyledInput
        ref={ref}
        aria-checked={isActive}
        aria-label={!label ? name : undefined}
        disabled={disabled}
        name={name}
        onChange={handleChange}
        onClick={handleClickInput}
        role="switch"
        type="checkbox"
        value={value}
        {...checkStatus}
      />
      <StyledToggle
        accent={accent}
        data-component-name="ToggleElement"
        disabled={disabled}
        label={label}
        name={name}
        onKeyDown={handleKeyDown}
        size={size}
        tabIndex={0}
        {...rest}
      >
        <StyledTrack
          accent={accent}
          data-component-name="ToggleTrack"
          isActive={isActive}
          size={size}
        />
        <StyledButton accent={accent} disabled={disabled} isActive={isActive} size={size} />
      </StyledToggle>
      {label}
    </Label>
  );
});

Toggle.displayName = 'Toggle';
