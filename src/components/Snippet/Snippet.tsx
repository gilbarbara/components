import { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { SetRequired } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { getStyledOptions, getStyles } from '~/modules/system';

import { CopyToClipboard } from '~/components/CopyToClipboard/CopyToClipboard';
import { Icon } from '~/components/Icon';
import { SnippetProps, useSnippet } from '~/components/Snippet/useSnippet';

import { WithTheme } from '~/types';

export const StyledSnippet = styled('div', getStyledOptions())<
  SetRequired<SnippetProps, 'gap' | 'size'> & WithTheme
>(
  {
    alignItems: 'center',
    display: 'inline-flex',
  },
  props => {
    const { bg, color, size, theme } = props;
    const { darkMode, spacing } = theme;
    const defaultBg = darkMode ? 'gray.800' : 'gray.50';

    const { mainColor, textColor } = getColorTokens(bg ?? defaultBg, color, theme);

    const heightMap = {
      sm: px(32),
      md: px(40),
      lg: px(48),
    };

    const paddingMap = {
      sm: `${spacing.xs} ${spacing.sm}`,
      md: `${spacing.sm} ${spacing.md}`,
      lg: `${spacing.sm} ${spacing.md}`,
    };

    return css`
      background-color: ${mainColor};
      color: ${textColor};
      min-height: ${heightMap[size]};
      padding: ${paddingMap[size]};
      ${getStyles(props, { skipColor: true, useFontSize: true })};
    `;
  },
);

export const StyledWrapper = styled(
  'div',
  getStyledOptions(),
)<SetRequired<SnippetProps, 'gap'> & WithTheme>(props => {
  const { gap, removeFormatting, theme } = props;
  const { fontFamily, fontMonospace, spacing } = theme;

  return css`
    align-items: center;
    font-family: ${removeFormatting ? fontFamily : fontMonospace};
    display: flex;
    gap: ${spacing[gap]};
  `;
});

const StyledSymbol = styled.span`
  display: inline-flex;
`;

export const StyledPre = styled(
  'pre',
  getStyledOptions(),
)<SetRequired<SnippetProps, 'gap'> & WithTheme>(props => {
  const { preventWrap, removeFormatting, theme } = props;
  const { fontFamily, fontMonospace } = theme;

  return css`
    font-family: ${removeFormatting ? fontFamily : fontMonospace};
    display: flex;
    margin: 0;
    ${preventWrap && 'white-space: nowrap'};
  `;
});

export function Snippet(props: SnippetProps) {
  const { componentProps, getDataAttributes } = useSnippet(props);
  const {
    checkIcon = <Icon name="check" />,
    children,
    copyIcon = <Icon name="copy" />,
    copyValue,
    disableAnimation,
    gap,
    hideCopyButton,
    hideSymbol,
    hideTooltip,
    onCopy,
    onError,
    preventWrap,
    removeFormatting,
    symbol,
    theme,
    timeout,
    tooltipCopiedText,
    tooltipProps,
    tooltipText,
    ...rest
  } = componentProps;

  const content: Record<string, ReactNode> = {};

  if (!hideSymbol) {
    content.symbol = <StyledSymbol>{symbol}</StyledSymbol>;
  }

  content.main = Array.isArray(children) ? (
    <div>
      {children.map((child, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <StyledWrapper key={index} gap={gap} removeFormatting={removeFormatting} theme={theme}>
          {content.symbol}
          <StyledPre
            gap={gap}
            preventWrap={preventWrap}
            removeFormatting={removeFormatting}
            theme={theme}
          >
            {child}
          </StyledPre>
        </StyledWrapper>
      ))}
    </div>
  ) : (
    <StyledWrapper gap={gap} removeFormatting={removeFormatting} theme={theme}>
      {content.symbol}
      <StyledPre
        gap={gap}
        preventWrap={preventWrap}
        removeFormatting={removeFormatting}
        theme={theme}
      >
        {children}
      </StyledPre>
    </StyledWrapper>
  );

  if (!hideCopyButton) {
    content.copyButton = (
      <CopyToClipboard
        checkIcon={checkIcon}
        copyIcon={copyIcon}
        disableAnimation={disableAnimation}
        hideTooltip={hideTooltip}
        onCopy={onCopy}
        onError={onError}
        padding="xxs"
        timeout={timeout}
        tooltipCopiedText={tooltipCopiedText}
        tooltipProps={tooltipProps}
        tooltipText={tooltipText}
        value={copyValue ?? children}
      />
    );
  }

  return (
    <StyledSnippet {...getDataAttributes('Snippet')} gap={gap} theme={theme} {...rest}>
      {content.main}
      {content.copyButton}
    </StyledSnippet>
  );
}

export { defaultProps, type SnippetProps } from './useSnippet';
