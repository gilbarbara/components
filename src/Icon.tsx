import * as React from 'react';
import SVG from 'react-inlinesvg';
import innerText from 'react-innertext';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import is from 'is-lite';
import { RequireExactlyOne, SetRequired } from 'type-fest';

import { px } from './modules/helpers';
import { iconsCustom } from './modules/icons';
import { baseStyles, marginStyles, styledOptions } from './modules/system';
import { Icons, StyledProps, WithMargin } from './types';

export interface IconKnownProps extends StyledProps, WithMargin {
  color?: string;
  name: Icons;
  /** @default 16 */
  size?: number;
  spin?: boolean;
  style?: React.CSSProperties;
  title?: React.ReactNode;
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
  styledOptions,
)<SetRequired<Omit<IconProps, 'name'>, 'size'>>(props => {
  const { color = 'inherit', size, spin } = props;

  return css`
    ${baseStyles(props)};
    ${marginStyles(props)};
    color: ${color};
    display: inline-flex;
    line-height: 1;
    height: ${px(size)};
    width: ${px(size)};

    > * {
      ${!!spin &&
      css`
        animation: ${rotate} 1s infinite linear;
      `};
    }
  `;
});

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const { name, size = 16, title, url, ...rest } = props;
  let iconURL = '';

  if (name) {
    const urlPrefix = iconsCustom.includes(name as typeof iconsCustom[number])
      ? 'https://files.wabisabi.cx/icons/'
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
};
Icon.displayName = 'Icon';
