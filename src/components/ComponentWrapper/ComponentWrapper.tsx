import { CSSProperties, forwardRef, ReactElement, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { PlainObject, Simplify, StringOrNumber } from '@gilbarbara/types';
import is from 'is-lite';

import { getStyledOptions, marginStyles } from '~/modules/system';

import { BoxCenter } from '~/components/Box';
import { Icon } from '~/components/Icon';

import { Icons, StyledProps, WithChildren, WithMargin } from '~/types';

export interface ComponentWrapperKnownProps extends StyledProps, WithChildren, WithMargin {
  prefix?: Icons | ReactElement;
  /**
   * A single value for both or [width,height]
   * @default 32
   */
  size?: StringOrNumber | [StringOrNumber, StringOrNumber];
  style?: CSSProperties;
  suffix?: Icons | ReactElement;
  /** @default 100% */
  width?: StringOrNumber;
}

export type ComponentWrapperProps = Simplify<ComponentWrapperKnownProps>;

export const defaultProps = {
  size: 40,
  width: '100%',
} satisfies Omit<ComponentWrapperProps, 'children'>;

const StyledComponentWrapper = styled(
  'div',
  getStyledOptions('prefix', 'suffix'),
)<Pick<ComponentWrapperProps, 'width'>>(props => {
  const { width } = props;

  return css`
    position: relative;
    width: ${px(width)};
    ${marginStyles(props)};
  `;
});

export const ComponentWrapper = forwardRef<HTMLDivElement, ComponentWrapperProps>((props, ref) => {
  const { children, prefix, size, suffix, ...rest } = { ...defaultProps, ...props };

  const content: PlainObject<ReactNode> = {};
  const height = is.array(size) ? size[1] : size;
  const width = is.array(size) ? size[0] : size;

  if (prefix) {
    content.prefix = (
      <BoxCenter bottom={0} height={height} left={0} position="absolute" top={0} width={width}>
        {is.string(prefix) ? <Icon name={prefix} size={20} /> : prefix}
      </BoxCenter>
    );
  }

  if (suffix) {
    content.suffix = (
      <BoxCenter bottom={0} height={height} position="absolute" right={0} top={0} width={width}>
        {is.string(suffix) ? <Icon name={suffix} size={20} /> : suffix}
      </BoxCenter>
    );
  }

  return (
    <StyledComponentWrapper ref={ref} data-component-name="ComponentWrapper" {...rest}>
      {content.prefix}
      {children}
      {content.suffix}
    </StyledComponentWrapper>
  );
});

ComponentWrapper.displayName = 'ComponentWrapper';
