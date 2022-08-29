import { CSSProperties, forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnyObject } from '@gilbarbara/types';
import is from 'is-lite';

import { Box } from './Box';
import { ComponentWrapper } from './ComponentWrapper';
import { Icon } from './Icon';
import { Label } from './Label';
import { getTheme } from './modules/helpers';
import {
  baseStyles,
  borderStyles,
  getStyledOptions,
  isDarkMode,
  layoutStyles,
  marginStyles,
  paddingStyles,
  radiusStyles,
} from './modules/system';
import {
  ComponentProps,
  StyledProps,
  WithBorder,
  WithChildren,
  WithInline,
  WithLayout,
  WithMargin,
  WithPadding,
  WithRadius,
} from './types';

export interface FormGroupKnownProps
  extends StyledProps,
    WithBorder,
    WithChildren,
    WithInline,
    WithLayout,
    WithMargin,
    WithPadding,
    WithRadius {
  assistiveText?: ReactNode;
  error?: ReactNode;
  hideAssistiveText?: boolean;
  label?: ReactNode;
  labelId?: string;
  labelInfo?: ReactNode;
  labelStyles?: CSSProperties;
  required?: boolean;
  skipIcon?: boolean;
  valid?: boolean;
}

export type FormGroupProps = ComponentProps<HTMLElement, FormGroupKnownProps>;

export const StyledFormGroup = styled(
  'div',
  getStyledOptions(),
)<Partial<FormGroupProps>>(props => {
  const { spacing } = getTheme(props);

  return css`
    ${baseStyles(props)};
    margin-bottom: ${spacing.md};
    width: 100%;
    ${borderStyles(props)};
    ${layoutStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${radiusStyles(props)};

    [data-component-name='Box'] {
      > * {
        margin-bottom: 0;
        margin-top: 0;
      }

      [data-component-name='Label'] {
        margin-right: ${spacing.xs};
      }

      [data-component-name='FormGroupContent'] {
        flex: 1;
      }

      [data-component-name='AssistiveContent'] {
        margin-left: ${spacing.xs};

        &:empty {
          display: none;
        }
      }
    }
  `;
});

const AssistiveContent = styled(
  'div',
  getStyledOptions(),
)<Partial<FormGroupProps>>(props => {
  const { grayLight, grayMid, spacing, typography } = getTheme(props);

  return css`
    align-items: center;
    color: ${isDarkMode(props) ? grayLight : grayMid};
    display: flex;
    font-size: ${typography.mid.fontSize};
    line-height: 16px;
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

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>((props, ref) => {
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
    required,
    skipIcon,
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

  content.children = !skipIcon ? (
    <ComponentWrapper
      suffix={is.boolean(valid) && valid ? <Icon name="check-o" title="valid" /> : undefined}
    >
      {children}
    </ComponentWrapper>
  ) : (
    children
  );

  if (label) {
    content.label = (
      <Label
        labelId={labelId}
        labelInfo={labelInfo || (required && <Icon name="asterisk" variant="red" />)}
        style={labelStyles}
      >
        {label}
      </Label>
    );
  }

  content.main = (
    <>
      {content.label}
      {content.children}
      {!hideAssistiveText && (
        <AssistiveContent data-component-name="AssistiveContent">
          {content.assistiveText}
        </AssistiveContent>
      )}
    </>
  );

  if (inline) {
    content.main = <Box display="flex">{content.main}</Box>;
  }

  return (
    <StyledFormGroup ref={ref} data-component-name="FormGroup" inline={inline} {...rest}>
      {content.main}
    </StyledFormGroup>
  );
});

FormGroup.defaultProps = {
  hideAssistiveText: false,
  inline: false,
  radius: false,
  required: false,
  skipIcon: false,
};
