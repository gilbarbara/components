import { forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getInitials, omit } from '@gilbarbara/helpers';
import { SetRequired } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { colorStyles, getStyledOptions, getStyles } from '~/modules/system';

import { Icon } from '~/components/Icon';

import { WithTheme } from '~/types';

import { AvatarProps, useAvatar } from './useAvatar';

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
    const { borderColor, bordered, size, theme } = props;
    const { avatar } = theme;
    const selectedSize = avatar[size];

    const { mainColor } = getColorTokens(borderColor, null, theme);

    return css`
      outline: ${bordered ? `2px solid ${mainColor}` : 'none'};
      height: ${selectedSize.size};
      width: ${selectedSize.size};
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
    const { size, theme } = props;
    const selectedSize = theme.avatar[size];

    return css`
      height: ${selectedSize.size};
      font-size: ${selectedSize.fontSize};
      width: ${selectedSize.size};
      ${colorStyles(props)};
    `;
  },
);

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useAvatar(props);
  const { fallback, image, name, size, ...rest } = componentProps;
  const selectedSize = rest.theme.avatar[size];

  let content: ReactNode;

  if (image) {
    content = (
      <img alt={name ?? 'User'} height={selectedSize.size} src={image} width={selectedSize.size} />
    );
  } else if (name) {
    content = (
      <Circle size={size} {...rest}>
        {getInitials(name).toUpperCase()}
      </Circle>
    );
  } else if (fallback) {
    content = (
      <Circle size={size} {...rest}>
        {fallback}
      </Circle>
    );
  } else {
    const avatarSize = parseInt(selectedSize.size, 10);
    const iconSize = avatarSize * 0.7;

    content = (
      <Circle size={size} {...rest}>
        <Icon name="user" size={iconSize} />
      </Circle>
    );
  }

  return (
    <StyledAvatar
      ref={ref}
      aria-label={name ?? 'Unknown'}
      {...getDataAttributes('Avatar')}
      size={size}
      {...rest}
    >
      {content}
    </StyledAvatar>
  );
});

Avatar.displayName = 'Avatar';

export { defaultProps, type AvatarProps } from './useAvatar';
