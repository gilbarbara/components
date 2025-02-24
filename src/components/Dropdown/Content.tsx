import { MouseEvent } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps, Option } from '@gilbarbara/react-dropdown';

import { useTheme } from '~/hooks/useTheme';
import { getStyledOptions } from '~/modules/system';

import { FlexInline } from '~/components/Flex';
import { Icon } from '~/components/Icon';

import { WithTheme } from '~/types';

export const StyledContent = styled('div', getStyledOptions())`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Item = styled(
  'div',
  getStyledOptions(),
)<WithTheme & { multi?: boolean }>(props => {
  const { color, multi, theme } = props;
  const { darkMode, grayScale, radius, spacing, white } = theme;

  let multiStyles;

  if (multi) {
    multiStyles = css`
      background-color: ${darkMode ? grayScale['700'] : white};
      border: 1px solid ${color};
      border-radius: ${radius.xxs};
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
)<WithTheme>(props => {
  const { spacing } = props.theme;

  return css`
    display: inline-flex;
    line-height: 1;
    margin-left: ${spacing.xxs};
  `;
});

const Placeholder = styled(
  'div',
  getStyledOptions(),
)<WithTheme>(props => {
  const { grayScale } = props.theme;

  return css`
    align-items: center;
    color: ${grayScale['500']};
    display: flex;
  `;
});

function DropdownContent(props: ComponentProps) {
  const {
    methods: { getStyles, removeItem },
    props: { multi, placeholder },
    state: { values },
  } = props;
  const { getDataAttributes, theme } = useTheme();

  const handleClickRemove = (value: Option) => {
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
            <Item
              key={value}
              color={getStyles().color}
              {...getDataAttributes('ContentItem')}
              multi={multi}
              theme={theme}
            >
              {!!prefix && (
                <FlexInline {...getDataAttributes('ContentItemPrefix')} mr="xxs">
                  {prefix}
                </FlexInline>
              )}
              <span>{label ?? value}</span>
              {!!suffix && (
                <FlexInline {...getDataAttributes('ContentItemSuffix')} ml="xxs">
                  {suffix}
                </FlexInline>
              )}
              {multi && (
                <ItemClose onClick={handleClickRemove(item)} theme={theme}>
                  <Icon name="close" />
                </ItemClose>
              )}
            </Item>
          );
        })}
      </StyledContent>
    );
  }

  return <Placeholder theme={theme}>{placeholder}</Placeholder>;
}

DropdownContent.displayName = 'DropdownContent';

export default DropdownContent;
