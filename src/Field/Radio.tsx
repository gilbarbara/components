import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldRadioProps } from './types';

import { Radio } from '../CheckboxAndRadio';
import { Group } from '../Group';
import { Option } from '../types';

interface Props extends FieldRadioProps {
  registration: UseFormRegisterReturn;
}

function FieldRadio(props: Props): JSX.Element {
  const { options = [], registration } = props;

  return (
    <Group mb="xs">
      {options.map((d: Option) => (
        <Radio key={d.value} {...d} {...registration} size="sm" />
      ))}
    </Group>
  );
}

export default FieldRadio;
