import { CSSProperties, forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnyObject, StringOrNumber } from '@gilbarbara/types';
import is from 'is-lite';
import { RequireAtLeastOne } from 'type-fest';

import { FlexCenter } from './Flex';
import { Icon, IconProps } from './Icon';
import { px } from './modules/helpers';
import { getStyledOptions, marginStyles } from './modules/system';
import { Icons, WithMargin } from './types';

export interface IconWrapperKnownProps extends WithMargin {
  children: ReactNode;
  prefixIcon?: Icons | IconProps;
  /** @default 32 */
  size?: StringOrNumber;
  style?: CSSProperties;
  suffixIcon?: Icons | IconProps;
  /** @default 100% */
  width?: StringOrNumber;
}

export type IconWrapperProps = RequireAtLeastOne<
  IconWrapperKnownProps,
  'prefixIcon' | 'suffixIcon'
>;

const StyledIconWrapper = styled(
  'div',
  getStyledOptions(),
)<IconWrapperProps>(props => {
  const { width = '100%' } = props;

  return css`
    position: relative;
    width: ${px(width)};
    ${marginStyles(props)};
  `;
});

export const IconWrapper = forwardRef<HTMLDivElement, IconWrapperProps>((props, ref) => {
  const { children, prefixIcon, size, suffixIcon } = props;

  const content: AnyObject<ReactNode> = {};

  if (prefixIcon) {
    let iconProps: IconProps = {} as IconProps;

    if (is.string(prefixIcon)) {
      iconProps.name = prefixIcon;
    } else {
      iconProps = prefixIcon;
    }

    content.prefix = (
      <FlexCenter bottom={0} height={size} left={0} position="absolute" top={0} width={size}>
        <Icon size={20} {...iconProps} />
      </FlexCenter>
    );
  }

  if (suffixIcon) {
    let iconProps: IconProps = {} as IconProps;

    if (is.string(suffixIcon)) {
      iconProps.name = suffixIcon;
    } else {
      iconProps = suffixIcon;
    }

    content.suffix = (
      <FlexCenter bottom={0} height={size} position="absolute" right={0} top={0} width={size}>
        <Icon size={20} {...iconProps} />
      </FlexCenter>
    );
  }

  return (
    <StyledIconWrapper ref={ref} data-component-name="IconWrapper" {...props}>
      {content.prefix}
      {children}
      {content.suffix}
    </StyledIconWrapper>
  );
});

IconWrapper.defaultProps = {
  size: 40,
  width: '100%',
};
