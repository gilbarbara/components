import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnyObject } from '@gilbarbara/types';
import is from 'is-lite';

import { Group } from './Group';
import { Icon } from './Icon';
import { Label } from './Label';
import { getTheme } from './modules/helpers';
import {
  baseStyles,
  isDarkMode,
  layoutStyles,
  marginStyles,
  styledOptions,
} from './modules/system';
import { ComponentProps, StyledProps, WithInline, WithLayout, WithMargin } from './types';

export interface FormGroupKnownProps extends StyledProps, WithInline, WithLayout, WithMargin {
  assistiveText?: React.ReactNode;
  children: React.ReactNode;
  error?: React.ReactNode;
  hideAssistiveText?: boolean;
  label?: React.ReactNode;
  labelId?: string;
  labelInfo?: React.ReactNode;
  labelStyles?: React.CSSProperties;
  skipIcon?: boolean;
  valid?: boolean;
}

export type FormGroupProps = ComponentProps<HTMLElement, FormGroupKnownProps>;

export const StyledFormGroup = styled(
  'div',
  styledOptions,
)<Partial<FormGroupProps>>(props => {
  const { spacing } = getTheme(props);

  return css`
    ${baseStyles(props)};
    ${layoutStyles(props)}
    margin-bottom: ${spacing.md};
    ${marginStyles(props)}
    width: 100%;

    [data-component-name='Group'] {
      input,
      label,
      [data-component-name='AssistiveContent'] {
        margin-bottom: 0;
        margin-top: 0;
      }

      input {
        flex: 1;
        max-width: 320px;
        width: auto;
      }
    }
  `;
});

const AssistiveContent = styled(
  'div',
  styledOptions,
)<Partial<FormGroupProps>>(props => {
  const { grayLight, grayMid, spacing, typography } = getTheme(props);

  return css`
    align-items: center;
    color: ${isDarkMode(props) ? grayLight : grayMid};
    display: flex;
    font-size: ${typography.mid.fontSize};
    line-height: 1.3;
    margin-top: ${spacing.xxs};
    min-height: ${spacing.md};
    text-align: left;
  `;
});

const Error = styled.div(props => {
  const { colors } = getTheme(props);

  return css`
    align-items: center;
    color: ${colors.red};
    display: flex;
  `;
});

const InputWrapper = styled('div', styledOptions)`
  position: relative;

  > [data-component-name='Icon'] {
    line-height: 1;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;
  }
`;

export const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>((props, ref) => {
  const {
    assistiveText,
    children,
    error,
    hideAssistiveText,
    inline,
    label,
    labelId,
    labelInfo,
    labelStyles,
    skipIcon = false,
    valid,
    ...rest
  } = props;
  const content: AnyObject = {
    assistiveText,
  };

  if (error && valid === false) {
    content.assistiveText = (
      <Error>
        <Icon mr="xxs" name="danger" title="Invalid" />
        <span>{error}</span>
      </Error>
    );
  }

  if (is.boolean(valid) && valid && !skipIcon) {
    content.icon = <Icon name="check-o" size={18} title="Valid" />;
  }

  if (label) {
    content.label = (
      <Label labelId={labelId} labelInfo={labelInfo} style={labelStyles}>
        {label}
      </Label>
    );
  }

  content.main = (
    <>
      {content.label}
      <InputWrapper>
        {children}
        {content.icon}
      </InputWrapper>
      {!hideAssistiveText && (
        <AssistiveContent data-component-name="AssistiveContent">
          {content.assistiveText}
        </AssistiveContent>
      )}
    </>
  );

  if (inline) {
    content.main = <Group>{content.main}</Group>;
  }

  return (
    <StyledFormGroup ref={ref} data-component-name="FormGroup" inline={inline} {...rest}>
      {content.main}
    </StyledFormGroup>
  );
});

FormGroup.displayName = 'FormGroup';
