import { MouseEvent } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SelectRenderer } from '@gilbarbara/react-dropdown';

import { BoxInline } from '../Box';
import { Icon } from '../Icon';
import { getTheme } from '../modules/helpers';
import { getStyledOptions, isDarkMode } from '../modules/system';
import { DropdownItem } from '../types';

export const StyledContent = styled('div', getStyledOptions())`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Item = styled(
  'div',
  getStyledOptions(),
)<{ multi?: boolean }>(props => {
  const { color, multi } = props;
  const { grayDark, radius, spacing, white } = getTheme(props);
  const darkMode = isDarkMode(props);

  let multiStyles;

  if (multi) {
    multiStyles = css`
      border: 1px solid ${color};
      border-radius: ${radius.xxs};
      background-color: ${darkMode ? grayDark : white};
      margin-bottom: ${spacing.xxs};
      margin-right: ${spacing.xs};
      margin-top: ${spacing.xxs};
      padding: 3px 6px;
    `;
  }

  return css`
    align-items: center;
    display: flex;
    line-height: 1;
    ${multiStyles};
  `;
});

const ItemClose = styled(
  'span',
  getStyledOptions(),
)(props => {
  const { spacing } = getTheme(props);

  return css`
    display: inline-flex;
    line-height: 1;
    margin-left: ${spacing.xxs};
  `;
});

const Placeholder = styled(
  'div',
  getStyledOptions(),
)(props => {
  const { darkMode, grayLight, grayMid } = getTheme(props);

  return css`
    color: ${darkMode ? grayLight : grayMid};
  `;
});

function DropdownContent<T extends DropdownItem>(props: SelectRenderer<T>) {
  const {
    methods: { removeItem },
    props: { color, multi, placeholder },
    state: { values },
  } = props;

  const handleClickRemove = (value: T) => {
    return (event: MouseEvent) => {
      event.stopPropagation();

      removeItem(null, value, true);
    };
  };

  if (values.length) {
    return (
      <StyledContent>
        {values.map(item => {
          const { label, prefix, suffix, value } = item || {};

          return (
            <Item key={value} color={color} data-component-name="ContentItem" multi={multi}>
              {!!prefix && (
                <BoxInline data-component-name="ContentItemPrefix" mr="xxs">
                  {prefix}
                </BoxInline>
              )}
              <span>{label || value}</span>
              {!!suffix && (
                <BoxInline data-component-name="ContentItemSuffix" ml="xxs">
                  {suffix}
                </BoxInline>
              )}
              {multi && (
                <ItemClose onClick={handleClickRemove(item)}>
                  <Icon name="close" />
                </ItemClose>
              )}
            </Item>
          );
        })}
      </StyledContent>
    );
  }

  return <Placeholder>{placeholder}</Placeholder>;
}

export default DropdownContent;
