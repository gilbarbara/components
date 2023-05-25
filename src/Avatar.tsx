import { CSSProperties, forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getInitials } from '@gilbarbara/helpers';

import { BoxCenter } from './Box';
import { getColorVariant, getTheme } from './modules/helpers';
import { getStyledOptions } from './modules/system';
import { AvatarSize, StyledProps, WithBorder, WithColor, WithFlexItem } from './types';

export interface AvatarProps extends StyledProps, WithBorder, WithColor, WithFlexItem {
  image?: string;
  name: string;
  /** @default md */
  size?: AvatarSize;
  style?: CSSProperties;
}

export const defaultProps = {
  shade: 'mid',
  size: 'md',
  variant: 'primary',
} satisfies Omit<AvatarProps, 'name'>;

const Circle = styled(
  'div',
  getStyledOptions(),
)<Required<Pick<AvatarProps, 'shade' | 'size' | 'variant'>>>(props => {
  const { shade, size, variant } = props;
  const { avatar, variants } = getTheme(props);
  const { bg, color } = getColorVariant(variant, shade, variants);
  const selectedSize = avatar[size];

  return css`
    background-color: ${bg};
    color: ${color};
    height: ${selectedSize.size};
    font-size: ${selectedSize.fontSize};
    line-height: ${selectedSize.size};
    text-align: center;
    width: ${selectedSize.size};
  `;
});

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { image, name, shade, size, variant, ...rest } = { ...defaultProps, ...props };

  const { avatar } = getTheme(props);
  const selectedSize = avatar[size];

  return (
    <BoxCenter
      ref={ref}
      data-component-name="Avatar"
      height={selectedSize.size}
      overflow="hidden"
      radius="round"
      width={selectedSize.size}
      {...rest}
    >
      {image ? (
        <img alt={name} height={selectedSize.size} src={image} width={selectedSize.size} />
      ) : (
        <Circle shade={shade} size={size} variant={variant}>
          {getInitials(name).toUpperCase()}
        </Circle>
      )}
    </BoxCenter>
  );
});

Avatar.displayName = 'Avatar';
