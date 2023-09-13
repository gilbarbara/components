import { ChangeEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { Radio } from '~/components/CheckboxAndRadio';
import { Spacer } from '~/components/Spacer';

import { RadioItem } from '~/types';

import { FieldRadioProps } from './types';

interface Props extends FieldRadioProps {
  registration: UseFormRegisterReturn;
}

function FieldRadio(props: Props) {
  const { accent, borderless, disabled, items = [], onChange, readOnly, registration } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    onChange?.(target.value);
  };

  return (
    <Spacer gapVertical="xs">
      {items.map((d: RadioItem) => (
        <Radio
          key={d.value}
          {...d}
          {...registration}
          accent={accent}
          borderless={borderless}
          disabled={disabled}
          onChange={handleChange}
          readOnly={readOnly}
          size="sm"
        />
      ))}
    </Spacer>
  );
}

FieldRadio.displayName = 'FieldRadio';

export default FieldRadio;
