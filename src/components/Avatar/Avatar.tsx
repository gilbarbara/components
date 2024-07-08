import { CSSProperties, forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getInitials, mergeProps } from '@gilbarbara/helpers';
import { SetRequired, Simplify } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { baseStyles, colorStyles, getStyledOptions, radiusStyles } from '~/modules/system';

import { Icon } from '~/components/Icon';

import {
  AvatarSize,
  StyledProps,
  VariantWithTones,
  WithColorsDefaultBg,
  WithFlexItem,
  WithRadius,
} from '~/types';

export interface AvatarKnownProps
  extends StyledProps,
    WithColorsDefaultBg,
    WithFlexItem,
    WithRadius {
  /**
   * Avatar border
   */
  borderColor?: VariantWithTones;
  /**
   * Avatar border
   */
  bordered?: boolean;
  /**
   * Fallback content when no image is provided
   */
  fallback?: ReactNode;
  /**
   * Image URL
   */
  image?: string;
  name?: string;
  /**
   * Avatar size.
   * @default md
   */
  size?: AvatarSize;
  style?: CSSProperties;
}

export type AvatarProps = Simplify<AvatarKnownProps>;

export const defaultProps = {
  bg: 'primary',
  borderColor: 'primary',
  bordered: false,
  size: 'md',
  radius: 'round',
} satisfies Omit<AvatarProps, 'name'>;

const StyledAvatar = styled(
  'div',
  getStyledOptions(),
)<SetRequired<Omit<AvatarProps, 'image' | 'name'>, 'borderColor' | 'size'>>(props => {
  const { borderColor, bordered, size } = props;
  const { avatar, ...theme } = getTheme(props);
  const selectedSize = avatar[size];

  const { mainColor } = getColorTokens(borderColor, null, theme);

  return css`
    ${baseStyles(props)};
    align-items: center;
    outline: ${bordered ? `2px solid ${mainColor}` : 'none'};
    outline-offset: 2px;
    display: flex;
    flex-shrink: 0;
    height: ${selectedSize.size};
    justify-content: center;
    overflow: hidden;
    width: ${selectedSize.size};
    ${radiusStyles(props)};
  `;
});

const Circle = styled(
  'div',
  getStyledOptions(),
)<Required<Pick<AvatarProps, 'bg' | 'size'>>>(props => {
  const { size } = props;
  const { avatar } = getTheme(props);
  const selectedSize = avatar[size];

  return css`
    align-items: center;
    display: flex;
    height: ${selectedSize.size};
    font-size: ${selectedSize.fontSize};
    justify-content: center;
    text-align: center;
    width: ${selectedSize.size};
    ${colorStyles(props)};
  `;
});

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { fallback, image, name, size, ...rest } = mergeProps(defaultProps, props);
  const { getDataAttributes, theme } = useTheme();

  const selectedSize = theme.avatar[size];

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
