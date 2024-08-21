import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit, px } from '@gilbarbara/helpers';
import { SetRequired } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { alignStyles, getStyledOptions, getStyles, marginStyles } from '~/modules/system';

import { defaultProps, DividerProps, useDivider } from '~/components/Divider/useDivider';

import { WithTheme } from '~/types';

const borderSizes = {
  sm: '1px',
  md: '2px',
  lg: '4px',
};

const StyledDivider = styled('div', getStyledOptions('type'))<
  SetRequired<DividerProps, keyof typeof defaultProps> & WithTheme
>(
  {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    lineHeight: 1,
    position: 'relative',
  },
  props => {
    const {
      align,
      borderSize,
      borderStyle,
      children,
      color,
      gap,
      length,
      minBorderWidth,
      orientation,
      spacing,
      theme,
    } = props;
    const { spacing: spacingTheme } = theme;
    const isHorizontal = orientation === 'horizontal';

    let marginStart: string | number = 0;
    let marginEnd: string | number = 0;
    let mainColor = color;

    if (spacing) {
      if (Array.isArray(spacing)) {
        marginStart = spacing[0] ? spacingTheme[spacing[0]] : 0;
        marginEnd = spacing[1] ? spacingTheme[spacing[1]] : 0;
      } else {
        marginStart = spacingTheme[spacing];
        marginEnd = spacingTheme[spacing];
      }
    }

    if (color !== 'transparent') {
      ({ mainColor } = getColorTokens(color, null, theme));
    }

    const selectedDimension = borderSizes[borderSize];
    const margin = isHorizontal
      ? css`
          margin-bottom: ${marginStart};
          margin-top: ${marginEnd};
        `
      : css`
          margin-left: ${marginStart};
          margin-right: ${marginEnd};
        `;

    if (isHorizontal && children) {
      return css`
        color: ${mainColor};
        ${margin};
        width: ${px(length)};
        ${alignStyles(props)};
        ${getStyles(omit(props, 'align'), { useFontSize: true })};

        &:before,
        &:after {
          border-top: ${borderSizes[borderSize]} ${borderStyle} ${mainColor};
          content: '';
          display: inline-flex;
          min-width: ${px(minBorderWidth)};
          flex-grow: 1;
        }

        &:before {
          flex-grow: ${['right', 'center'].includes(align) ? 1 : 0};
          margin-right: ${spacingTheme[gap]};
        }

        &:after {
          flex-grow: ${['left', 'center'].includes(align) ? 1 : 0};
          margin-left: ${spacingTheme[gap]};
        }
      `;
    }

    return css`
      border-bottom: ${isHorizontal
        ? `${selectedDimension} ${borderStyle} ${mainColor}`
        : undefined};
      border-left: ${isHorizontal ? undefined : `${selectedDimension} ${borderStyle} ${mainColor}`};
      height: ${isHorizontal ? undefined : px(length)};
      ${margin};
      text-indent: -9999px;
      width: ${px(isHorizontal ? length : selectedDimension)};
      ${marginStyles(props)};
    `;
  },
);

export function Divider(props: DividerProps) {
  const { componentProps, getDataAttributes } = useDivider(props);

  return <StyledDivider {...getDataAttributes('Divider')} role="separator" {...componentProps} />;
}

Divider.displayName = 'Divider';

export { defaultProps, type DividerProps } from './useDivider';
