import { CSSProperties, forwardRef, ReactNode } from 'react';
import SVG from 'react-inlinesvg';
import innerText from 'react-innertext';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import is from 'is-lite';
import { RequireExactlyOne, SetRequired } from 'type-fest';

import { getColorVariant, getTheme, px } from './modules/helpers';
import { iconsCustom } from './modules/options';
import { baseStyles, getStyledOptions, marginStyles } from './modules/system';
import { Icons, StyledProps, WithColor, WithMargin } from './types';

export interface IconKnownProps extends StyledProps, WithColor, WithMargin {
  color?: string;
  name: Icons;
  /** @default 16 */
  size?: number;
  spin?: boolean;
  style?: CSSProperties;
  title?: ReactNode;
  url: string;
}

export type IconProps = RequireExactlyOne<IconKnownProps, 'name' | 'url'>;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const StyledIcon = styled(
  'span',
  getStyledOptions(),
)<SetRequired<Omit<IconProps, 'name'>, 'size'>>(props => {
  const { color, shade, size, spin, variant } = props;
  const { variants } = getTheme(props);
  let iconColor = color || 'inherit';

  if (!color && variant) {
    const { bg } = getColorVariant(variant, shade, variants);

    iconColor = bg;
  }

  return css`
    ${baseStyles(props)};
    color: ${iconColor};
    display: inline-flex;
    line-height: 1;
    height: ${px(size)};
    width: ${px(size)};
    ${marginStyles(props)};

    > * {
      ${!!spin &&
      css`
        animation: ${rotate} 1s infinite linear;
      `};
    }
  `;
});

export const Icon = forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const { name, size = 16, title, url, ...rest } = props;
  let iconURL = '';

  if (name) {
    const urlPrefix = iconsCustom.includes(name as typeof iconsCustom[number])
      ? 'https://files.gilbarbara.dev/icons/'
      : 'https://cdn.jsdelivr.net/npm/css.gg/icons/svg/';

    iconURL = `${urlPrefix}${name}.svg`;
  } else if (url) {
    iconURL = url;
  }

  let titleString = name as string;

  if (!is.undefined(title)) {
    titleString = is.string(title) ? title : innerText(title);
  }

  return (
    <StyledIcon ref={ref} data-component-name="Icon" size={size} {...rest}>
      <SVG height={size} src={iconURL} title={titleString} width={size} />
    </StyledIcon>
  );
});

Icon.defaultProps = {
  size: 16,
  spin: false,
};
