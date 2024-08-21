import { forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { PlainObject } from '@gilbarbara/types';
import is from 'is-lite';

import { getStyledOptions, marginStyles } from '~/modules/system';

import { FlexCenter } from '~/components/Flex';

import { WithTheme } from '~/types';

import { FormElementWrapperProps, useFormElementWrapper } from './useFormElementWrapper';

const StyledFormElementWrapper = styled(
  'div',
  getStyledOptions(),
)<FormElementWrapperProps & WithTheme>(props => {
  const { width } = props;

  return css`
    position: relative;
    width: ${px(width)};
    ${marginStyles(props)};
  `;
});

export const FormElementWrapper = forwardRef<HTMLDivElement, FormElementWrapperProps>(
  (props, ref) => {
    const { componentProps, getDataAttributes } = useFormElementWrapper(props);
    const { children, endContent, size, startContent, ...rest } = componentProps;

    const content: PlainObject<ReactNode> = {};
    const [width, height] = is.array(size) ? size : [size, size];

    if (startContent) {
      content.startContent = (
        <FlexCenter
          {...getDataAttributes('FormElementWrapperStartContent')}
          bottom={0}
          height={height}
          left={0}
          position="absolute"
          top={0}
          width={width}
        >
          {startContent}
        </FlexCenter>
      );
    }

    if (endContent) {
      content.endContent = (
        <FlexCenter
          {...getDataAttributes('FormElementWrapperEndContent')}
          bottom={0}
          height={height}
          position="absolute"
          right={0}
          top={0}
          width={width}
        >
          {endContent}
        </FlexCenter>
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

export { defaultProps, type FormElementWrapperProps } from './useFormElementWrapper';
