import * as React from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { AnyObject } from '@gilbarbara/types';

import { ButtonBase } from './ButtonBase';
import { Icon } from './Icon';
import { getColorVariant, getTheme } from './modules/helpers';
import {
  backgroundStyles,
  baseStyles,
  marginStyles,
  styledOptions,
  textStyles,
} from './modules/system';
import {
  Icons,
  Shades,
  StyledProps,
  Variants,
  WithColor,
  WithMargin,
  WithTextOptions,
} from './types';

export interface TagProps extends StyledProps, WithColor, WithMargin, WithTextOptions {
  children: React.ReactNode;
  color?: Variants;
  colorShade?: Shades;
  iconAfter?: Icons;
  iconBefore?: Icons;
  invert?: boolean;
  onClickAfter?: (event: React.MouseEvent) => void;
  onClickBefore?: (event: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export const StyledTag = styled(
  'span',
  styledOptions,
)<TagProps>(props => {
  const { color, colorShade, variant } = props;
  const { radius, variants } = getTheme(props);

  const selectedColor =
    color || (variant && !['black', 'white'].includes(variant) ? variant : undefined);
  let colorProp: string | undefined;

  if (selectedColor) {
    colorProp = getColorVariant(selectedColor, colorShade, variants).bg;
  }

  return css`
    ${baseStyles(props)};
    ${backgroundStyles(props)};
    ${marginStyles(props)};
    ${textStyles(props)};
    align-items: center;
    border-radius: ${radius.xs};
    color: ${colorProp};
    display: inline-flex;
    line-height: 1;
    padding: 4px 12px;
  `;
});

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>((props, ref) => {
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
  size: 'small',
  variant: 'primary',
};
Tag.displayName = 'Tag';
