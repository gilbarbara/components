import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { formatMoney, formatPhoneBR } from '@gilbarbara/helpers';
import { AnyObject } from '@gilbarbara/types';

import { FieldInputProps } from './types';
import { getInputParameters } from './utils';

import { Button } from '../Button';
import { FlexInline } from '../Flex';
import { Group } from '../Group';
import { Input } from '../Input';
import { clearNumber, getTheme } from '../modules/helpers';
import { Text } from '../Text';
import { Truncate } from '../Truncate';

interface Props extends FieldInputProps {
  currentValue: any;
  isDirty: boolean;
  registration: UseFormRegisterReturn;
  setStatus: (status: { isActive?: boolean; isDirty?: boolean }) => void;
}

const StyledColorGroup = styled.div(props => {
  const { shadow, spacing } = getTheme(props);

  return css`
    align-items: center;
    display: flex;

    > div {
      box-shadow: ${shadow.high};
      overflow: hidden;
      margin-right: ${spacing.xs};
      height: ${spacing.xl};
      width: ${spacing.xl};
    }

    input {
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      background: none;
      border: 0;
      cursor: pointer;
      height: ${spacing.xxxl};
      margin: -8px;
      padding: 0;
      width: ${spacing.xxxl};
    }
  `;
});

function FieldInput(props: Props): JSX.Element {
  const {
    currentValue,
    formatter,
    id,
    isDirty,
    name,
    onBlur,
    onChange,
    onFocus,
    registration,
    setStatus,
    skipValidation,
    type,
  } = props;

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setStatus({ isActive: false, isDirty });

      registration.onBlur(event);

      if (onBlur) {
        onBlur(event);
      }
    },
    [isDirty, onBlur, registration, setStatus],
  );

  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setStatus({ isActive: true });

      if (onFocus) {
        onFocus(event);
      }
    },
    [onFocus, setStatus],
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (formatter === 'phoneBR') {
        event.target.value = clearNumber(event.target.value).slice(0, 11);
      } else if (formatter) {
        event.target.value = clearNumber(event.target.value);
      }

      registration.onChange(event);

      if (onChange) {
        onChange(event);
      }
    },
    [formatter, onChange, registration],
  );

  const input = {
    ...getInputParameters(props, 'currentValue', 'isDirty', 'registration', 'setStatus'),
    id: id || name,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
  };

  let content;

  switch (type) {
    case 'color': {
      content = (
        <StyledColorGroup>
          <div>
            <input type="color" {...registration} {...input} />
          </div>
          {!!currentValue && <Text>{currentValue}</Text>}
        </StyledColorGroup>
      );
      break;
    }
    case 'file': {
      content = (
        <Group gap="xs">
          <FlexInline overflow="hidden" position="relative">
            <Button invert>Upload a file</Button>
            <input
              {...registration}
              {...getInputParameters(props, 'currentValue', 'isDirty', 'registration', 'setStatus')}
              id={input.id}
              style={{
                fontSize: '48px',
                left: 0,
                opacity: 0,
                position: 'absolute',
                top: 0,
                zIndex: 1,
              }}
              type="file"
            />
          </FlexInline>
          {!!currentValue?.length && <Truncate maxWidth="70%">{currentValue[0].name}</Truncate>}
        </Group>
      );
      break;
    }
    case 'hidden': {
      content = <input {...registration} {...input} type="hidden" />;
      break;
    }
    default: {
      const parameters: AnyObject<string> = {};

      if (currentValue) {
        if (formatter === 'money') {
          parameters.value = formatMoney(currentValue);
        } else if (formatter === 'phoneBR') {
          parameters.value = formatPhoneBR(`${currentValue}`);
        }
      }

      content = (
        <Input
          {...registration}
          {...input}
          {...parameters}
          endSpacing={!skipValidation}
          type={type}
        />
      );
      break;
    }
  }

  return content;
}

export default FieldInput;
