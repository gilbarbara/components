import { CSSProperties, forwardRef, MouseEvent } from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { AnyObject } from '@gilbarbara/types';

import { ButtonBase } from './ButtonBase';
import { Icon } from './Icon';
import { getColorVariant, getTheme } from './modules/helpers';
import {
  backgroundStyles,
  baseStyles,
  getStyledOptions,
  marginStyles,
  textStyles,
} from './modules/system';
import {
  Icons,
  Shades,
  StyledProps,
  Variants,
  WithChildren,
  WithColor,
  WithMargin,
  WithTextOptions,
} from './types';

export interface TagProps
  extends StyledProps,
    WithChildren,
    WithColor,
    WithMargin,
    WithTextOptions {
  color?: Variants;
  colorShade?: Shades;
  iconAfter?: Icons;
  iconBefore?: Icons;
  invert?: boolean;
  onClickAfter?: (event: MouseEvent) => void;
  onClickBefore?: (event: MouseEvent) => void;
  style?: CSSProperties;
}

export const StyledTag = styled(
  'span',
  getStyledOptions(),
)<TagProps>(props => {
  const { color, colorShade, variant } = props;
  const { radius, spacing, variants } = getTheme(props);

  const selectedColor =
    color || (variant && !['black', 'white'].includes(variant) ? variant : undefined);
  let colorProp: string | undefined;

  if (selectedColor) {
    colorProp = getColorVariant(selectedColor, colorShade, variants).bg;
  }

  return css`
    ${baseStyles(props)};
    align-items: center;
    border-radius: ${radius.xs};
    color: ${colorProp};
    display: inline-flex;
    padding: ${spacing.xxs} ${spacing.sm};
    ${backgroundStyles(props)};
    ${marginStyles(props)};
    ${textStyles(props, 1)};
  `;
});

export const Tag = forwardRef<HTMLSpanElement, TagProps>((props, ref) => {
  const {
    children,
    colorShade,
    iconAfter,
    iconBefore,
    onClickAfter,
    onClickBefore,
    shade,
    ...rest
  } = props;
  const { typography } = getTheme({ theme: useTheme() });

  const iconSize = rest.size ? parseInt(typography[rest.size].fontSize, 10) : undefined;
  const icons: AnyObject = {};

  if (iconBefore && onClickBefore) {
    icons.before = (
      <ButtonBase mr="xxs" onClick={onClickBefore}>
        <Icon name={iconBefore} size={iconSize} />
      </ButtonBase>
    );
  } else if (iconBefore) {
    icons.before = <Icon mr="xxs" name={iconBefore} size={iconSize} />;
  }

  if (iconAfter && onClickAfter) {
    icons.after = (
      <ButtonBase ml="xxs" onClick={onClickAfter}>
        <Icon name={iconAfter} size={iconSize} />
      </ButtonBase>
    );
  } else if (iconAfter) {
    icons.after = <Icon ml="xxs" name={iconAfter} size={iconSize} />;
  }

  return (
    <StyledTag
      ref={ref}
      data-component-name="Tag"
      {...rest}
      colorShade={rest.invert && !colorShade ? 'mid' : colorShade || 'dark'}
      shade={rest.invert && !shade ? 'mid' : shade || 'lightest'}
    >
      {icons.before}
      <span>{children}</span>
      {icons.after}
    </StyledTag>
  );
});

Tag.defaultProps = {
  bold: false,
  invert: false,
  size: 'mid',
  variant: 'primary',
};
