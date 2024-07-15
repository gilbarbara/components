import {
  AriaAttributes,
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
import { mergeProps, px } from '@gilbarbara/helpers';
import { usePrevious, useUpdateEffect } from '@gilbarbara/hooks';
import { PlainObject, SetRequired, Simplify } from '@gilbarbara/types';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import is from 'is-lite';

import { useTheme } from '~/hooks/useTheme';

import { getColorTokens, getColorWithTone } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { baseStyles, getOutlineStyles, getStyledOptions, isDarkMode } from '~/modules/system';

import {
  StyledProps,
  VariantWithTones,
  WithAccent,
  WithComponentSize,
  WithDisabled,
  WithHTMLAttributes,
  WithLabel,
} from '~/types';

export interface ToggleKnownProps
  extends StyledProps,
    AriaAttributes,
    WithAccent,
    WithComponentSize,
    WithDisabled,
    WithHTMLAttributes,
    WithLabel {
  /** Status (controlled mode) */
  checked?: boolean;
  colorButton?: VariantWithTones | [unchecked: VariantWithTones, checked: VariantWithTones];
  colorTrack?: VariantWithTones;
  /**
   * Initial status (uncontrolled mode)
   * @default false
   */
  defaultChecked?: boolean;
  iconEnd?: ReactNode;
  iconStart?: ReactNode;
  /**
   * The name for the input element, used when submitting an HTML form.
   */
  name?: string;
  /**
   * Callback when the status changes (uncontrolled mode)
   */
  onChange?: (value: boolean) => void;
  /**
   * Callback when clicking/key down the toggle
   */
  onToggle?: (value: boolean) => void;
  thumbIconChecked?: ReactNode;
  thumbIconUnchecked?: ReactNode;
}

export type ToggleProps = Simplify<ToggleKnownProps>;

interface InnerProps
  extends SetRequired<ToggleProps, 'accent' | 'size'>,
    Pick<ToggleProps, 'colorButton' | 'colorTrack'> {
  isChecked: boolean;
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
} satisfies Omit<ToggleProps, 'label'>;

const StyledLabel = styled(
  'label',
  getStyledOptions(),
)<Pick<InnerProps, 'accent'>>(props => {
  const { accent = 'primary' } = props;
  const { dataAttributeName, radius, ...theme } = getTheme(props);
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
)<InnerProps>(props => {
  const { accent, colorTrack, isChecked } = props;
  const { grayScale, radius, ...theme } = getTheme(props);

  const { mainColor } = getColorTokens(accent, null, theme);
  let backgroundColor = isDarkMode(props) ? grayScale['700'] : grayScale['200'];

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
    transition: background-color 0.4s;
    right: 0;
    top: 0;
  `;
});

const StyledTrackIcon = styled('span')<InnerProps>(props => {
  const { accent, isChecked, size } = props;
  const { darkColor, grayScale, white, ...theme } = getTheme(props);
  const { textColor } = getColorTokens(accent, null, theme);
  const { height, space } = styles[size];

  return css`
    align-items: center;
    bottom: 0;
    color: ${isChecked ? textColor : darkColor};
    display: flex;
    justify-content: center;
    left: ${isChecked ? px(space) : undefined};
    height: ${px(height)};
    position: absolute;
    right: ${isChecked ? undefined : px(space)};
    top: 0;
  `;
});

const StyledButton = styled(
  'span',
  getStyledOptions(),
)<InnerProps>(props => {
  const { accent, colorButton, disabled, isChecked, size } = props;
  const { grayScale, opacityDisabled, white, ...theme } = getTheme(props);
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
    const { disabled, label, size } = props;
    const { opacityDisabled } = getTheme(props);

    const { height, width } = styles[size];

    return css`
      ${baseStyles(props)};
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
    theme,
    thumbIconChecked,
    thumbIconUnchecked,
    ...rest
  } = mergeProps(defaultProps, props);
  const [isChecked, setChecked] = useState(is.boolean(checked) ? checked : defaultChecked);
  const previousChecked = usePrevious(checked);
  const labelId = useId();
  const { getDataAttributes } = useTheme();

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
    if (disabled || !['Space', 'Enter'].includes(event.code)) {
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
      >
        <StyledTrack
          accent={accent}
          colorTrack={colorTrack}
          {...getDataAttributes('ToggleTrack')}
          isChecked={isChecked}
          size={size}
        />
        <StyledButton
          accent={accent}
          colorButton={colorButton}
          {...getDataAttributes('ToggleButton')}
          disabled={disabled}
          isChecked={isChecked}
          size={size}
        >
          {isChecked ? thumbIconChecked : thumbIconUnchecked}
        </StyledButton>
        {!isChecked && iconStart && (
          <StyledTrackIcon
            accent={accent}
            {...getDataAttributes('ToggleTrackIcon')}
            isChecked={isChecked}
            size={size}
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
