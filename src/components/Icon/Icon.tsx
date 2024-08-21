import { forwardRef, useMemo } from 'react';
import SVG from 'react-inlinesvg';
import innerText from 'react-innertext';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { omit, px } from '@gilbarbara/helpers';
import { SetRequired } from '@gilbarbara/types';

import { rotate } from '~/modules/animations';
import { getColorTokens } from '~/modules/colors';
import { iconsCustom } from '~/modules/options';
import { getStyledOptions, getStyles } from '~/modules/system';

import { WithTheme } from '~/types';

import { IconProps, useIcon } from './useIcon';

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

export const StyledIcon = styled('span', getStyledOptions())<
  SetRequired<Omit<IconProps, 'url'>, 'size'> & WithTheme
>(
  {
    display: 'inline-flex',
    lineHeight: 1,
  },
  props => {
    const { color, name = '', size, spin, theme } = props;
    let iconColor = color ?? 'inherit';

    if (color) {
      const { mainColor } = getColorTokens(color, null, theme);

      iconColor = mainColor;
    }

    return css`
      color: ${iconColor};
      height: ${px(size)};
      width: ${px(size)};
      ${getStyles(omit(props, 'size'))};

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
  },
);

export const Icon = forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useIcon(props);
  const { name, size = 16, title, url, ...rest } = componentProps;

  const iconURL = useMemo(() => {
    if (name) {
      const urlPrefix = iconsCustom.some(d => d.name === name)
        ? 'https://files.gilbarbara.dev/icons/'
        : 'https://cdn.jsdelivr.net/npm/css.gg/icons/svg/';

      return `${urlPrefix}${name}.svg`;
    } else if (url) {
      return url;
    }

    return '';
  }, [name, url]);

  if (!iconURL) {
    return null;
  }

  let titleSVG: string | null;

  if (title !== null) {
    titleSVG = title ? innerText(title) : (name as string);
  } else {
    titleSVG = null;
  }

  return (
    <StyledIcon ref={ref} name={name} size={size} {...getDataAttributes('Icon')} {...rest}>
      <SVG height={size} src={iconURL} title={titleSVG} width={size} />
    </StyledIcon>
  );
});

Icon.displayName = 'Icon';

export { defaultProps, type IconProps } from './useIcon';
