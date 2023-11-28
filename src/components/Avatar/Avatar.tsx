import { CSSProperties, forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getInitials } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

import { getTheme } from '~/modules/helpers';
import { colorStyles, getStyledOptions } from '~/modules/system';

import { BoxCenter } from '~/components/Box';

import { AvatarSize, StyledProps, WithBorder, WithColorsDefaultBg, WithFlexItem } from '~/types';

export interface AvatarKnownProps
  extends StyledProps,
    WithBorder,
    WithColorsDefaultBg,
    WithFlexItem {
  image?: string;
  name: string;
  /** @default md */
  size?: AvatarSize;
  style?: CSSProperties;
}

export type AvatarProps = Simplify<AvatarKnownProps>;

export const defaultProps = {
  bg: 'primary',
  size: 'md',
} satisfies Omit<AvatarProps, 'name'>;

const Circle = styled(
  'div',
  getStyledOptions(),
)<Required<Pick<AvatarProps, 'bg' | 'size'>>>(props => {
  const { size } = props;
  const { avatar } = getTheme(props);
  const selectedSize = avatar[size];

  return css`
    height: ${selectedSize.size};
    font-size: ${selectedSize.fontSize};
    line-height: ${selectedSize.size};
    text-align: center;
    width: ${selectedSize.size};
    ${colorStyles(props)};
  `;
});

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { image, name, size, ...rest } = { ...defaultProps, ...props };

  const { avatar } = getTheme(props);
  const selectedSize = avatar[size];

  return (
    <BoxCenter
      ref={ref}
      data-component-name="Avatar"
      flex={{ shrink: 0 }}
      height={selectedSize.size}
      overflow="hidden"
      radius="round"
      width={selectedSize.size}
      {...rest}
    >
      {image ? (
        <img alt={name} height={selectedSize.size} src={image} width={selectedSize.size} />
      ) : (
        <Circle size={size} {...rest}>
          {getInitials(name).toUpperCase()}
        </Circle>
      )}
    </BoxCenter>
  );
});

Avatar.displayName = 'Avatar';
