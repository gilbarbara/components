import {
  ChangeEvent,
  cloneElement,
  forwardRef,
  isValidElement,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  useId,
  useState,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { usePrevious, useUpdateEffect } from '@gilbarbara/hooks';
import { PlainObject, SetRequired } from '@gilbarbara/types';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import is from 'is-lite';

import { getColorTokens, getColorWithTone } from '~/modules/colors';
import { baseStyles, getOutlineStyles, getStyledOptions } from '~/modules/system';

import { ToggleInnerProps, ToggleProps, useToggle } from './useToggle';

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

const StyledLabel = styled(
  'label',
  getStyledOptions(),
)<Pick<ToggleInnerProps, 'accent' | 'theme'>>(props => {
  const { accent, theme } = props;
  const { dataAttributeName, radius } = theme;
  const { mainColor } = getColorTokens(accent, null, theme);

  return css`
    display: inline-flex;

    &:focus {
      outline: none;

      [data-${dataAttributeName}='ToggleElement'] {
        border-radius: ${radius.sm};
        outline: none;
        ${getOutlineStyles(mainColor, theme)};
        z-index: unset;
      }
    }
  `;
});

const StyledTrack = styled(
  'span',
  getStyledOptions(),
)<ToggleInnerProps>(props => {
  const { accent, colorTrack, isChecked, theme } = props;
  const { darkMode, grayScale, radius } = theme;

  const { mainColor } = getColorTokens(accent, null, theme);
  let backgroundColor = darkMode ? grayScale['700'] : grayScale['200'];

  if (colorTrack) {
    backgroundColor = getColorTokens(colorTrack, null, theme).mainColor;
  }

  if (isChecked) {
    backgroundColor = mainColor;
  }

  return css`
    background-color: ${backgroundColor};
    border-radius: ${radius.sm};
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: background-color 0.4s;
  `;
});

const StyledTrackIcon = styled('span')<ToggleInnerProps>(props => {
  const { accent, isChecked, size, theme } = props;
  const { darkColor } = theme;
  const { textColor } = getColorTokens(accent, null, theme);
  const { height, space } = styles[size];

  return css`
    align-items: center;
    bottom: 0;
    color: ${isChecked ? textColor : darkColor};
    display: flex;
    height: ${px(height)};
    justify-content: center;
    left: ${isChecked ? px(space) : undefined};
    position: absolute;
    right: ${isChecked ? undefined : px(space)};
    top: 0;
  `;
});

const StyledButton = styled(
  'span',
  getStyledOptions(),
)<ToggleInnerProps>(props => {
  const { accent, colorButton, disabled, isChecked, size, theme } = props;
  const { grayScale, opacityDisabled, white } = theme;
  const { mainColor } = getColorTokens(accent, null, theme);

  let backgroundColor = white;

  if (accent === 'white' && isChecked) {
    backgroundColor = grayScale['800'];
  } else if (isChecked) {
    backgroundColor = getColorWithTone(mainColor, '50');
  }

  if (colorButton) {
    backgroundColor = is.array(colorButton)
      ? getColorTokens(isChecked ? colorButton[1] : colorButton[0], null, theme).mainColor
      : getColorTokens(colorButton, null, theme).mainColor;
  }

  const { height, space } = styles[size];

  return css`
    align-items: center;
    background-color: ${backgroundColor};
    border-radius: 50%;
    bottom: ${px(space)};
    display: flex;
    font-size: ${px(height - 6)};
    justify-content: center;
    left: ${isChecked ? px(height + 2) : px(space)};
    opacity: ${disabled ? opacityDisabled : 1};
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
    const { disabled, label, size, theme } = props;
    const { opacityDisabled } = theme;

    const { height, width } = styles[size];

    return css`
      ${baseStyles(theme)};
      cursor: ${disabled ? 'default' : 'pointer'};
      height: ${px(height)};
      margin-right: ${label ? '8px' : 0};
      opacity: ${disabled ? opacityDisabled : 1};
      position: relative;
      user-select: none;
      vertical-align: middle;
      width: ${px(width)};
    `;
  },
);

/**
 * Make sure to pass the `aria-label` prop when the `label` prop is not provided.
 * This is required for accessibility.
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useToggle(props);
  const {
    accent,
    as,
    checked,
    colorButton,
    colorTrack,
    defaultChecked,
    disabled,
    iconEnd,
    iconStart,
    label,
    name,
    onChange,
    onToggle,
    size,
    thumbIconChecked,
    thumbIconUnchecked,
    ...rest
  } = componentProps;
  const [isChecked, setChecked] = useState(is.boolean(checked) ? checked : defaultChecked);
  const previousChecked = usePrevious(checked);
  const labelId = useId();

  useUpdateEffect(() => {
    if (is.boolean(checked) && previousChecked !== checked) {
      setChecked(checked);
    }
  }, [checked, previousChecked]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (is.boolean(checked)) {
      return;
    }

    const { target } = event;

    setChecked(target.checked);

    onChange?.(target.checked);
  };

  const handleClickLabel = () => {
    if (!disabled) {
      onToggle?.(!isChecked);
    }
  };

  const handleClickInput = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (disabled || !['Enter', 'Space'].includes(event.code)) {
      return;
    }

    const status = !isChecked;

    onToggle?.(status);

    if (is.boolean(checked)) {
      return;
    }

    setChecked(status);
    onChange?.(status);
  };

  const value = isChecked ? 'on' : 'off';
  const checkStatus: PlainObject<boolean> = {};

  if (is.boolean(checked)) {
    checkStatus.checked = checked;
  } else {
    checkStatus.defaultChecked = defaultChecked;
  }

  let labelElement: ReactNode = null;

  if (label) {
    labelElement = isValidElement(label) ? (
      cloneElement(label as ReactElement, { id: labelId })
    ) : (
      <span id={labelId}>{label}</span>
    );
  }

  return (
    <StyledLabel
      accent={accent}
      as={as}
      data-checked={isChecked}
      {...getDataAttributes('Toggle')}
      data-disabled={disabled}
      onClick={handleClickLabel}
      onKeyDown={handleKeyDown}
      style={{
        cursor: disabled ? 'default' : 'pointer',
        pointerEvents: disabled ? 'none' : 'auto',
        touchAction: disabled ? 'none' : undefined,
      }}
      tabIndex={disabled ? -1 : 0}
      {...rest}
    >
      <VisuallyHidden elementType="span">
        <input
          ref={ref}
          aria-checked={isChecked}
          aria-labelledby={label ? labelId : undefined}
          disabled={disabled}
          name={name}
          onChange={handleChange}
          onClick={handleClickInput}
          role="switch"
          type="checkbox"
          value={value}
          {...checkStatus}
        />
      </VisuallyHidden>
      <StyledToggle
        accent={accent}
        aria-hidden
        {...getDataAttributes('ToggleElement')}
        disabled={disabled}
        label={label}
        name={name}
        size={size}
        theme={rest.theme}
      >
        <StyledTrack
          accent={accent}
          colorTrack={colorTrack}
          {...getDataAttributes('ToggleTrack')}
          isChecked={isChecked}
          size={size}
          theme={rest.theme}
        />
        <StyledButton
          accent={accent}
          colorButton={colorButton}
          {...getDataAttributes('ToggleButton')}
          disabled={disabled}
          isChecked={isChecked}
          size={size}
          theme={rest.theme}
        >
          {isChecked ? thumbIconChecked : thumbIconUnchecked}
        </StyledButton>
        {!isChecked && iconStart && (
          <StyledTrackIcon
            accent={accent}
            {...getDataAttributes('ToggleTrackIcon')}
            isChecked={isChecked}
            size={size}
            theme={rest.theme}
          >
            {iconStart}
          </StyledTrackIcon>
        )}
        {isChecked && iconEnd && (
          <StyledTrackIcon
            accent={accent}
            {...getDataAttributes('ToggleTrackIcon')}
            isChecked={isChecked}
            size={size}
            theme={rest.theme}
          >
            {iconEnd}
          </StyledTrackIcon>
        )}
      </StyledToggle>
      {labelElement}
    </StyledLabel>
  );
});

Toggle.displayName = 'Toggle';

export { defaultProps, type ToggleProps } from './useToggle';
