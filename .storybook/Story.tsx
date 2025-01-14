import { CSSProperties, forwardRef, ReactNode } from 'react';
import styled from '@emotion/styled';
import { Simplify } from '@gilbarbara/types';

import { getStyledOptions } from '~/modules/system';
import { spacing } from '~/modules/theme';

import {
  OmitElementProps,
  SpacingOrZero,
  StyledProps,
  Theme,
  WithFlexBox,
  WithMargin,
  WithPadding,
} from '../src/types';

type StoryProps = Simplify<OmitElementProps<HTMLDivElement, StoryKnownProps>>;

export interface Context {
  args: Record<string, any>;
  globals: {
    appearance?: 'light' | 'dark' | 'side-by-side';
    backgrounds?: { value: string };
    color?: keyof Theme['colors'];
  };
  parameters: StoryProps & {
    layout?: 'centered' | 'fullscreen' | 'padded';
    paddingDocs?: SpacingOrZero;
  };
  viewMode: string;
}

export interface StoryKnownProps
  extends StyledProps,
    Pick<WithFlexBox, 'direction'>,
    Pick<WithPadding, 'padding'>,
    Pick<WithMargin, 'mx'> {
  align?: string;
  children?: ReactNode;
  display?: string;
  justify?: string;
  maxWidth?: number;
  minHeight?: string;
  minWidth?: number;
  style?: CSSProperties;
}

const StyledStory = styled(
  'div',
  getStyledOptions(),
)<StoryProps>(props => {
  const { align, direction, display, justify, maxWidth, minHeight, minWidth, mx, padding } = props;

  return {
    alignItems: align,
    display,
    flexDirection: direction,
    justifyContent: justify,
    margin: `0 ${mx && mx !== 'auto' ? spacing[mx] : mx}`,
    maxWidth,
    minHeight,
    minWidth,
    padding: padding ? spacing[padding] : undefined,
  };
});

export const Story = forwardRef<HTMLDivElement, StoryProps>((props, ref) => (
  <StyledStory ref={ref} {...props} />
));
