import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldRadioProps } from './types';

import { Radio } from '../CheckboxAndRadio';
import { Spacer } from '../Spacer';
import { RadioItem } from '../types';

interface Props extends FieldRadioProps {
  registration: UseFormRegisterReturn;
}

function FieldRadio(props: Props): JSX.Element {
  const { items = [], registration } = props;

  return (
    <Spacer mb="xs">
      {items.map((d: RadioItem) => (
        <Radio key={d.value} {...d} {...registration} size="sm" />
      ))}
    </Spacer>
  );
}

export default FieldRadio;
