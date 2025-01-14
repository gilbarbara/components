import { forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getInitials, omit, px } from '@gilbarbara/helpers';
import { SetRequired } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { colorStyles, getStyledOptions, getStyles } from '~/modules/system';

import { Icon } from '~/components/Icon';

import { WithTheme } from '~/types';

import { AvatarProps, useAvatar } from './useAvatar';

function getSize(props: SetRequired<AvatarProps, 'size'> & WithTheme) {
  const { fontSize, size, theme } = props;

  const selectedSize =
    typeof size === 'number'
      ? {
          size: `${size}px`,
          fontSize: `${size / 2}px`,
        }
      : theme.avatar[size];

  if (fontSize) {
    selectedSize.fontSize = px(fontSize);
  }

  return selectedSize;
}

const StyledAvatar = styled('div', getStyledOptions())<
  SetRequired<Omit<AvatarProps, 'image' | 'name'>, 'borderColor' | 'size'> & WithTheme
>(
  {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    outlineOffset: '2px',
    overflow: 'hidden',
  },
  props => {
    const { borderColor, bordered, theme } = props;
    const { size } = getSize(props);

    const { mainColor } = getColorTokens(borderColor, null, theme);

    return css`
      outline: ${bordered ? `2px solid ${mainColor}` : 'none'};
      height: ${size};
      width: ${size};
      ${getStyles(omit(props, 'size'), { skipColor: true })};
    `;
  },
);

const Circle = styled('div', getStyledOptions())<
  Required<Pick<AvatarProps, 'bg' | 'size'>> & WithTheme
>(
  {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  props => {
    const { fontSize, size } = getSize(props);

    return css`
      height: ${size};
      font-size: ${fontSize};
      width: ${size};
      ${colorStyles(props)};
    `;
  },
);

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useAvatar(props);
  const { fallback, image, name, ...rest } = componentProps;
  const { size } = getSize(componentProps);

  let content: ReactNode;

  if (image) {
    content = <img alt={name ?? 'User'} height={size} src={image} width={size} />;
  } else if (name) {
    content = <Circle {...rest}>{getInitials(name).toUpperCase()}</Circle>;
  } else if (fallback) {
    content = <Circle {...rest}>{fallback}</Circle>;
  } else {
    const avatarSize = parseInt(size, 10);
    const iconSize = avatarSize * 0.7;

    content = (
      <Circle {...rest}>
        <Icon name="user" size={iconSize} />
      </Circle>
    );
  }

  return (
    <StyledAvatar
      ref={ref}
      aria-label={name ?? 'Unknown'}
      {...getDataAttributes('Avatar')}
      {...rest}
    >
      {content}
    </StyledAvatar>
  );
});

Avatar.displayName = 'Avatar';

export { type AvatarProps, defaultProps } from './useAvatar';
