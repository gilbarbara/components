import { ChangeEvent, forwardRef, KeyboardEvent, ReactNode, useRef, useState } from 'react';
import { usePrevious, useUpdateEffect } from 'react-use';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { useMergeRefs } from '@gilbarbara/hooks';
import { PlainObject } from '@gilbarbara/types';
import is from 'is-lite';
import { SetRequired } from 'type-fest';

import { getColorVariant, getTheme } from '~/modules/helpers';
import { baseStyles, getStyledOptions, isDarkMode } from '~/modules/system';

import { Label } from '~/components/Label';

import {
  ComponentProps,
  StyledProps,
  WithColor,
  WithComponentSize,
  WithTextOptions,
} from '~/types';

export interface ToggleKnownProps extends StyledProps, WithColor, WithComponentSize {
  /**
   * Initial status (uncontrolled mode)
   * @default false
   */
  /** Status (controlled mode) */
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  labelOptions?: WithTextOptions;
  name?: string;
  /**
   * Callback when the status changes (uncontrolled mode)
   */
  onChange?: (value: boolean) => void;
  /**
   * Callback when clicking the toggle (controlled mode)
   */
  onClick?: (value: boolean) => void;
}

export type ToggleProps = ComponentProps<HTMLDivElement, ToggleKnownProps>;

interface InnerProps extends SetRequired<ToggleProps, 'shade' | 'size' | 'variant'> {
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
  defaultChecked: false,
  disabled: false,
  shade: 'mid',
  size: 'md',
  variant: 'primary',
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
  const { isActive, shade, variant } = props;
  const { grayDark, grayLighter, radius, variants } = getTheme(props);

  const { bg } = getColorVariant(variant, shade, variants);
  let backgroundColor = isDarkMode(props) ? grayDark : grayLighter;

  if (isActive) {
    backgroundColor = bg;
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
  const { disabled, isActive, shade, size, variant } = props;
  const { grayDarker, variants, white } = getTheme(props);

  let backgroundColor;

  if (variant === 'black') {
    backgroundColor = white;
  } else if (variant === 'white') {
    backgroundColor = grayDarker;
  } else {
    const currentVariant = variants[variant];

    if (['lighter', 'lightest'].includes(shade)) {
      backgroundColor = isActive ? currentVariant.light.bg : white;
    } else {
      backgroundColor = isActive ? currentVariant.lightest.bg : white;
    }
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

export const StyledToggle = styled('div')<SetRequired<ToggleProps, 'size'>>(props => {
  const { disabled, label, size } = props;
  const { colors } = getTheme(props);

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
      filter: drop-shadow(0 0 4px ${colors.primary});
      outline: none;
    }
  `;
});

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>((props, ref) => {
  const {
    checked,
    defaultChecked,
    disabled,
    label,
    labelOptions,
    name,
    onChange,
    onClick,
    shade,
    size,
    variant,
    ...rest
  } = { ...defaultProps, ...props };
  const inputRef = useRef<HTMLInputElement>(null);
  const [isActive, setActive] = useState(is.boolean(checked) ? checked : defaultChecked);
  const previousChecked = usePrevious(checked);
  const mergedRefs = useMergeRefs(inputRef, ref);

  useUpdateEffect(() => {
    if (is.boolean(checked) && previousChecked !== checked) {
      setActive(checked);
    }
  }, [checked, previousChecked]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setActive(target.checked);

    onChange?.(target.checked);
  };

  const handleClick = () => {
    if (!disabled) {
      onClick?.(inputRef.current?.checked ?? false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (disabled || !inputRef.current || ![' ', 'Enter'].includes(event.key)) {
      return;
    }

    const status = !isActive;

    inputRef.current.checked = status;
    setActive(status);
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
      onClick={is.boolean(checked) ? handleClick : undefined}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
      {...labelOptions}
    >
      <StyledInput
        ref={mergedRefs}
        aria-checked={isActive}
        aria-label={!label ? name : undefined}
        disabled={disabled ?? is.boolean(checked)}
        name={name}
        onChange={handleChange}
        role="switch"
        type="checkbox"
        value={value}
        {...checkStatus}
      />
      <StyledToggle
        disabled={disabled}
        label={label}
        name={name}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        size={size}
        tabIndex={0}
        {...rest}
      >
        <StyledTrack isActive={isActive} shade={shade} size={size} variant={variant} />
        <StyledButton
          disabled={disabled}
          isActive={isActive}
          shade={shade}
          size={size}
          variant={variant}
        />
      </StyledToggle>
      {label}
    </Label>
  );
});

Toggle.displayName = 'Toggle';
