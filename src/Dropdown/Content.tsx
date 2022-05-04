import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SelectRenderer } from '@gilbarbara/react-dropdown';

import { Icon } from '../Icon';
import { getTheme } from '../modules/helpers';
import { isDarkMode, styledOptions } from '../modules/system';
import { DropdownOption } from '../types';

export const StyledContent = styled('div', styledOptions)`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Item = styled(
  'div',
  styledOptions,
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
      margin-right: ${spacing.xxs};
      margin-top: ${spacing.xxs};
      padding: 2px;
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
  styledOptions,
)(props => {
  const { spacing } = getTheme(props);

  return css`
    display: inline-flex;
    line-height: 1;
    margin-left: ${spacing.xxs};
  `;
});

const Content = styled(
  'span',
  styledOptions,
)(props => {
  const { spacing } = getTheme(props);

  return css`
    display: inline-flex;
    margin-right: ${spacing.xxs};
  `;
});

const Placeholder = styled(
  'div',
  styledOptions,
)(props => {
  const { grayMid } = getTheme(props);

  return css`
    color: ${grayMid};
  `;
});

function DropdownContent<T extends DropdownOption>(props: SelectRenderer<T>) {
  const {
    methods: { removeItem },
    props: { color, multi, placeholder },
    state: { values },
  } = props;

  const handleClickRemove = (value: T) => {
    return (event: React.MouseEvent) => {
      event.stopPropagation();

      removeItem(null, value, true);
    };
  };

  if (values.length) {
    return (
      <StyledContent>
        {values.map(value => {
          const { content, label } = value || {};

          return (
            <Item key={label} color={color} data-component-name="ContentItem" multi={multi}>
              {!!content && <Content>{content}</Content>}
              <span>{label || value}</span>
              {multi && (
                <ItemClose onClick={handleClickRemove(value)}>
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
