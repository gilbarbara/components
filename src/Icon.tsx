import { CSSProperties, forwardRef, ReactNode } from 'react';
import SVG from 'react-inlinesvg';
import innerText from 'react-innertext';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import is from 'is-lite';
import { RequireExactlyOne, SetRequired } from 'type-fest';

import { rotate } from './modules/animations';
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

const loadBar = keyframes`
  0%, 100% { transform: translateX(0); width: 4px; }
  25%, 75% { transform: translateX(0); width: 24px; }
  50% { transform: translateX(20px); width: 4px }
`;

const loadBarDocument = keyframes`
  0%, 10% { transform: translateX(-100%) }
  50%, 60% { transform: translateX(0) }
`;

const loadBarSound = keyframes`
  10% {transform: scaleY(0.2) }
  30% {transform: scaleY(0.8) }
  60% {transform: scaleY(0.7) }
  80% {transform: scaleY(0.2) }
  100% {transform: scaleY(1) }
`;

export const StyledIcon = styled(
  'span',
  getStyledOptions(),
)<SetRequired<Omit<IconProps, 'url'>, 'size'>>(props => {
  const { color, name = '', shade, size, spin, variant } = props;
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
      ${(!!spin || (name as string).startsWith('spinner')) &&
      css`
        animation: ${rotate} 1s infinite linear;
      `};
    }

    ${['loadbar', 'loadbar-alt'].includes(name as string) &&
    css`
      rect:last-of-type {
        animation: ${loadBar} 2s infinite linear;
      }
    `};

    ${name === 'loadbar-doc' &&
    css`
      g > rect {
        animation: ${loadBarDocument} 1s linear infinite alternate;
      }
    `};

    ${name === 'loadbar-sound' &&
    css`
      g > rect {
        animation: ${loadBarSound} 1s linear infinite alternate;
        transform: scaleY(0);
        transform-origin: bottom;

        &:nth-of-type(2) {
          animation-delay: 0.2s;
        }

        &:nth-of-type(3) {
          animation-delay: 0.4s;
        }
      }
    `};
  `;
});

export const Icon = forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const { name, size = 16, title, url, ...rest } = props;
  let iconURL = '';

  if (name) {
    const urlPrefix = iconsCustom.some(d => d.name === name)
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
    <StyledIcon ref={ref} data-component-name="Icon" name={name} size={size} {...rest}>
      <SVG height={size} src={iconURL} title={titleString} width={size} />
    </StyledIcon>
  );
});

Icon.defaultProps = {
  size: 16,
  spin: false,
};
