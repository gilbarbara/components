import { CSSProperties, forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getInitials } from '@gilbarbara/helpers';

import { BoxCenter } from './Box';
import { getColorVariant, getTheme } from './modules/helpers';
import { getStyledOptions } from './modules/system';
import { StyledProps, WithBorder, WithColor, WithFlexItem } from './types';

export interface AvatarProps extends StyledProps, WithBorder, WithColor, WithFlexItem {
  image?: string;
  name: string;
  /** @default md */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'jumbo';
  style?: CSSProperties;
}

const sizes = {
  xs: {
    size: '24px',
    fontSize: '12px',
  },
  sm: {
    size: '32px',
    fontSize: '14px',
  },
  md: {
    size: '40px',
    fontSize: '16px',
  },
  lg: {
    size: '48px',
    fontSize: '18px',
  },
  xl: {
    size: '56px',
    fontSize: '20px',
  },
  jumbo: {
    size: '96px',
    fontSize: '40px',
  },
};

const Circle = styled(
  'div',
  getStyledOptions(),
)<Required<Pick<AvatarProps, 'shade' | 'size' | 'variant'>>>(props => {
  const { shade, size, variant } = props;
  const { variants } = getTheme(props);
  const { bg, color } = getColorVariant(variant, shade, variants);
  const selectedSize = sizes[size];

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
  const { image, name, shade = 'mid', size = 'md', variant = 'primary', ...rest } = props;

  const selectedSize = sizes[size];

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

Avatar.defaultProps = {
  shade: 'mid',
  size: 'md',
  variant: 'primary',
};
