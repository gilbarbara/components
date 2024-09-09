import { forwardRef, useMemo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useStableValue } from '@gilbarbara/hooks';

import { getColorTokens } from '~/modules/colors';
import { getStyledOptions, getStyles } from '~/modules/system';

import { FlexInline } from '~/components/Flex';

import { WithTheme } from '~/types';

import { keyboardKeysLabelMap, keyboardKeysMap, KeyboardProps, useKeyboard } from './useKeyboard';

export const StyledKeyboard = styled('kbd', getStyledOptions())<
  Omit<KeyboardProps, 'keys'> & WithTheme
>(
  {
    display: 'inline-flex',
    lineHeight: 1,
  },
  props => {
    const { bg, color, theme } = props;
    const { darkMode, spacing } = theme;
    const defaultBg = darkMode ? 'gray.800' : 'gray.50';

    const { mainColor, textColor } = getColorTokens(bg ?? defaultBg, color, theme);

    return css`
      background-color: ${mainColor};
      color: ${textColor};
      padding: ${spacing.xxxs} ${spacing.xs};
      ${getStyles(props, { skipColor: true, useFontSize: true })};

      > abbr {
        text-decoration: none;
      }
    `;
  },
);

export const Keyboard = forwardRef<HTMLSpanElement, KeyboardProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useKeyboard(props);
  const { children, keys, separator, textOnly, ...rest } = componentProps;
  const keysValue = useStableValue(typeof keys === 'string' ? [keys] : keys);

  const keysContent = useMemo(() => {
    return keysValue.map((key, index) => (
      <FlexInline key={key}>
        <abbr title={keyboardKeysLabelMap[key]}>
          {textOnly ? keyboardKeysLabelMap[key] : keyboardKeysMap[key]}
        </abbr>
        {separator && index < keysValue.length - 1 && separator}
      </FlexInline>
    ));
  }, [keysValue, separator, textOnly]);

  return (
    <StyledKeyboard ref={ref} {...getDataAttributes('Keyboard')} {...rest}>
      {keysContent}
      {separator && children && keysValue.length > 0 && <span>{separator}</span>}
      {children && <span>{children}</span>}
    </StyledKeyboard>
  );
});

Keyboard.displayName = 'Keyboard';

export { defaultProps, type KeyboardProps } from './useKeyboard';
