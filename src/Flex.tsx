import { forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StandardLonghandProperties, StandardShorthandProperties } from 'csstype';

import { Box, BoxProps } from './Box';

export interface FlexProps extends BoxProps {
  alignContent?: StandardLonghandProperties['alignContent'];
  alignItems?: StandardLonghandProperties['alignItems'];
  children?: ReactNode;
  display?: 'flex' | 'inline-flex';
  flex?: StandardShorthandProperties['flex'];
  flexBasis?: StandardLonghandProperties['flexBasis'];
  flexDirection?: StandardLonghandProperties['flexDirection'];
  flexGrow?: StandardLonghandProperties['flexGrow'];
  flexShrink?: StandardLonghandProperties['flexShrink'];
  flexWrap?: StandardLonghandProperties['flexWrap'];
  justifyContent?: StandardLonghandProperties['justifyContent'];
  order?: StandardLonghandProperties['order'];
}

export const StyledFlex = styled(Box)<FlexProps>(props => {
  const {
    alignContent,
    alignItems,
    display = 'flex',
    flex,
    flexBasis,
    flexDirection,
    flexGrow,
    flexShrink,
    flexWrap,
    justifyContent,
    order,
  } = props;

  return css`
    align-content: ${alignContent};
    align-items: ${alignItems};
    display: ${display};
    flex-basis: ${flexBasis};
    flex-direction: ${flexDirection};
    flex-grow: ${flexGrow};
    flex-shrink: ${flexShrink};
    flex-wrap: ${flexWrap};
    flex: ${flex};
    justify-content: ${justifyContent};
    order: ${order};
  `;
});

export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => (
  <StyledFlex ref={ref} data-component-name="Flex" {...props} />
));

Flex.defaultProps = {
  display: 'flex',
};
Flex.displayName = 'Flex';

export const FlexCenter = forwardRef<HTMLDivElement, FlexProps>((props, ref) => (
  <StyledFlex
    ref={ref}
    data-component-name="FlexCenter"
    {...props}
    alignItems="center"
    flexDirection="column"
    justifyContent="center"
  />
));

FlexCenter.defaultProps = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};
FlexCenter.displayName = 'FlexCenter';

export const FlexInline = forwardRef<HTMLDivElement, FlexProps>((props, ref) => (
  <StyledFlex
    ref={ref}
    alignItems="center"
    as="span"
    data-component-name="FlexInline"
    display="inline-flex"
    {...props}
  />
));

FlexInline.defaultProps = {
  alignItems: 'center',
  display: 'inline-flex',
};
FlexInline.displayName = 'FlexInline';
