import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldRadioProps } from './types';

import { Radio } from '../CheckboxAndRadio';
import { Spacer } from '../Spacer';
import { Option } from '../types';

interface Props extends FieldRadioProps {
  registration: UseFormRegisterReturn;
}

function FieldRadio(props: Props): JSX.Element {
  const { options = [], registration } = props;

  return (
    <Spacer mb="xs">
      {options.map((d: Option) => (
        <Radio key={d.value} {...d} {...registration} size="sm" />
      ))}
    </Spacer>
  );
}

export default FieldRadio;
