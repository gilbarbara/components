import { ChangeEvent, forwardRef, KeyboardEvent, ReactNode, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import { usePrevious, useUpdateEffect } from 'react-use';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnyObject } from '@gilbarbara/types';
import is from 'is-lite';

import { Label } from './Label';
import { getColorVariant, getTheme } from './modules/helpers';
import { baseStyles, getStyledOptions, isDarkMode } from './modules/system';
import { ComponentProps, StyledProps, WithColor } from './types';

export interface ToggleKnownProps extends StyledProps, WithColor {
  /**
   * Initial status (uncontrolled mode)
   * @default false
   */
  /** Status (controlled mode) */
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  name: string;
  onChange?: (value: boolean) => void;
  onClick?: (value: boolean) => void;
}

export type ToggleProps = ComponentProps<HTMLDivElement, ToggleKnownProps>;

interface InnerProps extends Omit<ToggleProps, 'name'> {
  isActive: boolean;
}

const styles = {
  borderRadius: '12px',
  height: '24px',
  space: '2px',
  width: '48px',
};

const StyledInput = styled('input')`
  bottom: 0;
  left: 0;
  opacity: 0.0001;
  position: absolute;
  right: 0;
  top: 0;
`;

const StyledTrack = styled(
  'span',
  getStyledOptions(),
)<InnerProps>(props => {
  const { isActive, shade, variant = 'primary' } = props;
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
  const { disabled, isActive, variant } = props;
  const { grayMid, variants, white } = getTheme(props);

  let backgroundColor = isDarkMode(props) ? grayMid : white;

  if (isActive) {
    backgroundColor = variant === 'yellow' ? variants.yellow.darker.bg : white;
  }

  return css`
    background-color: ${backgroundColor};
    border-radius: 50%;
    bottom: ${styles.space};
    left: ${isActive ? '26px' : styles.space};
    opacity: ${disabled ? 0.7 : 1};
    position: absolute;
    top: ${styles.space};
    transition: background-color 0.4s, left 0.2s ease;
    width: 20px;
  `;
});

export const StyledToggle = styled('div')<ToggleProps>(props => {
  const { disabled, label } = props;
  const { colors } = getTheme(props);

  return css`
    ${baseStyles(props)};
    cursor: ${disabled ? 'default' : 'pointer'};
    height: ${styles.height};
    margin-right: ${label ? '8px' : 0};
    opacity: ${disabled ? 0.8 : 1};
    position: relative;
    user-select: none;
    vertical-align: middle;
    width: ${styles.width};

    &:focus {
      filter: drop-shadow(0 0 4px ${colors.primary});
      outline: none;
    }
  `;
});

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>((props, ref) => {
  const {
    checked,
    defaultChecked = false,
    disabled,
    label,
    name,
    onChange,
    onClick,
    shade,
    variant,
    ...rest
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isActive, setActive] = useState(is.boolean(checked) ? checked : defaultChecked);
  const previousChecked = usePrevious(checked);

  useUpdateEffect(() => {
    if (is.boolean(checked) && previousChecked !== checked) {
      setActive(checked);
    }
  }, [checked, previousChecked]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setActive(target.checked);

    /* istanbul ignore else */
    if (onChange) {
      onChange(target.checked);
    }
  };

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick(inputRef.current?.checked || false);
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
  const checkStatus: AnyObject = {};

  if (is.boolean(checked)) {
    checkStatus.checked = checked;
  } else {
    checkStatus.defaultChecked = defaultChecked;
  }

  return (
    <Label data-component-name="Toggle" inline style={{ cursor: disabled ? 'default' : 'pointer' }}>
      <StyledInput
        ref={mergeRefs([inputRef, ref])}
        aria-checked={isActive}
        aria-label={!label ? name : undefined}
        disabled={disabled || is.boolean(checked)}
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
        tabIndex={0}
        {...rest}
      >
        <StyledTrack isActive={isActive} shade={shade} variant={variant} />
        <StyledButton disabled={disabled} isActive={isActive} shade={shade} variant={variant} />
      </StyledToggle>
      {label}
    </Label>
  );
});

Toggle.defaultProps = {
  defaultChecked: false,
  disabled: false,
  shade: 'mid',
  variant: 'primary',
};
