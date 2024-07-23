import { CSSProperties, forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, px } from '@gilbarbara/helpers';
import { PlainObject, Simplify, StringOrNumber } from '@gilbarbara/types';
import is from 'is-lite';

import { useTheme } from '~/hooks/useTheme';

import { getStyledOptions, marginStyles } from '~/modules/system';

import { BoxCenter } from '~/components/Box';

import { StyledProps, WithChildren, WithEndContent, WithMargin, WithStartContent } from '~/types';

export interface FormElementWrapperKnownProps
  extends StyledProps,
    WithChildren,
    WithEndContent,
    WithMargin,
    WithStartContent {
  /**
   * A single value for both or [width,height]
   * @default 40
   */
  size?: StringOrNumber | [width: StringOrNumber, height: StringOrNumber];
  style?: CSSProperties;
  /** @default 100% */
  width?: StringOrNumber;
}

export type FormElementWrapperProps = Simplify<FormElementWrapperKnownProps>;

export const defaultProps = {
  size: 40,
  width: '100%',
} satisfies Omit<FormElementWrapperProps, 'children'>;

const StyledFormElementWrapper = styled(
  'div',
  getStyledOptions(),
)<Pick<FormElementWrapperProps, 'width'>>(props => {
  const { width } = props;

  return css`
    position: relative;
    width: ${px(width)};
    ${marginStyles(props)};
  `;
});

export const FormElementWrapper = forwardRef<HTMLDivElement, FormElementWrapperProps>(
  (props, ref) => {
    const { children, endContent, size, startContent, ...rest } = mergeProps(defaultProps, props);
    const { getDataAttributes } = useTheme();

    const content: PlainObject<ReactNode> = {};
    const [width, height] = is.array(size) ? size : [size, size];

    if (startContent) {
      content.startContent = (
        <BoxCenter
          {...getDataAttributes('FormElementWrapperStartContent')}
          bottom={0}
          height={height}
          left={0}
          position="absolute"
          top={0}
          width={width}
        >
          {startContent}
        </BoxCenter>
      );
    }

    if (endContent) {
      content.endContent = (
        <BoxCenter
          {...getDataAttributes('FormElementWrapperEndContent')}
          bottom={0}
          height={height}
          position="absolute"
          right={0}
          top={0}
          width={width}
        >
          {endContent}
        </BoxCenter>
      );
    }

    return (
      <StyledFormElementWrapper ref={ref} {...getDataAttributes('FormElementWrapper')} {...rest}>
        {content.startContent}
        {children}
        {content.endContent}
      </StyledFormElementWrapper>
    );
  },
);

FormElementWrapper.displayName = 'FormElementWrapper';
