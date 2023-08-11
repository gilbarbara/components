import { UseFormRegisterReturn } from 'react-hook-form';

import { Radio } from '~/components/CheckboxAndRadio';
import { Spacer } from '~/components/Spacer';

import { RadioItem } from '~/types';

import { FieldRadioProps } from './types';

interface Props extends FieldRadioProps {
  registration: UseFormRegisterReturn;
}

function FieldRadio(props: Props) {
  const { items = [], registration } = props;

  return (
    <Spacer mb="xs">
      {items.map((d: RadioItem) => (
        <Radio key={d.value} {...d} {...registration} size="sm" />
      ))}
    </Spacer>
  );
}

FieldRadio.displayName = 'FieldRadio';

export default FieldRadio;
