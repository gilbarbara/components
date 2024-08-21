import { forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { PlainObject } from '@gilbarbara/types';
import is from 'is-lite';

import { getStyledOptions, getStyles } from '~/modules/system';

import { Box } from '~/components/Box';
import { FormElementWrapper } from '~/components/FormElementWrapper';
import { Icon } from '~/components/Icon';
import { Label } from '~/components/Label';

import { WithTheme } from '~/types';

import { FormGroupProps, useFormGroup } from './useFormGroup';

export const StyledFormGroup = styled(
  'div',
  getStyledOptions(),
)<Partial<FormGroupProps> & WithTheme>(props => {
  const { dataAttributeName, spacing } = props.theme;

  return css`
    margin-bottom: ${spacing.md};
    width: 100%;
    ${getStyles(props)};

    [data-${dataAttributeName}='FormGroupContent'] {
      > * {
        margin-bottom: 0;
        margin-top: 0;
      }

      [data-${dataAttributeName}='Label'] {
        margin-right: ${spacing.xs};
      }

      [data-${dataAttributeName}='FormGroupContent'] {
        flex: 1;
      }

      [data-${dataAttributeName}='AssistiveContent'] {
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
)<Partial<FormGroupProps> & WithTheme>(props => {
  const { darkMode, grayScale, spacing, typography } = props.theme;

  return css`
    align-items: center;
    color: ${darkMode ? grayScale['200'] : grayScale['500']};
    display: flex;
    font-size: ${typography.sm.fontSize};
    line-height: 16px;
    margin-top: ${spacing.xs};
    min-height: ${spacing.md};
    text-align: left;
  `;
});

const ErrorComponent = styled.div<WithTheme>(props => {
  const { colors } = props.theme;

  return css`
    align-items: center;
    color: ${colors.red};
    display: flex;
  `;
});

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useFormGroup(props);
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
  } = componentProps;

  const content: PlainObject<ReactNode> = {
    assistiveText,
  };

  if (error && valid === false) {
    content.assistiveText = (
      <ErrorComponent theme={rest.theme}>
        <Icon mr="xxs" name="danger-o" title="Invalid" />
        <span>{error}</span>
      </ErrorComponent>
    );
  }

  content.children = !skipIcon ? (
    <FormElementWrapper
      endContent={
        is.boolean(valid) && valid ? (
          <Icon color="green" name="check-o" size={24} title="valid" />
        ) : undefined
      }
    >
      {children}
    </FormElementWrapper>
  ) : (
    children
  );

  if (label) {
    content.label = (
      <Label
        labelId={labelId}
        labelInfo={
          labelInfo || (required && <Icon color="red" ml="xxs" name="asterisk" size={12} />)
        }
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
        <AssistiveContent {...getDataAttributes('AssistiveContent')} theme={rest.theme}>
          {content.assistiveText}
        </AssistiveContent>
      )}
    </>
  );

  if (inline) {
    content.main = (
      <Box {...getDataAttributes('FormGroupContent')} display="flex">
        {content.main}
      </Box>
    );
  }

  return (
    <StyledFormGroup ref={ref} {...getDataAttributes('FormGroup')} inline={inline} {...rest}>
      {content.main}
    </StyledFormGroup>
  );
});

FormGroup.displayName = 'FormGroup';

export { defaultProps, type FormGroupProps } from './useFormGroup';
