import styled from '@emotion/styled';
import { ComponentProps } from '@gilbarbara/react-dropdown';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';

import { DropdownProps, WithColor } from '~/types';

interface Props extends WithColor, ComponentProps, Pick<DropdownProps, 'onCreate'> {}

const StyledDropdownAdd = styled.div`
  width: 100%;

  button {
    display: flex;
    justify-content: center;
    padding: 8px;
    width: 100%;
  }
`;

function DropdownAdd(props: Props) {
  const {
    methods: { getLabels, setStatus },
    onCreate,
    shade,
    state: { search },
    variant = 'primary',
  } = props;

  const handleClick = () => {
    if (onCreate) {
      onCreate(search, () => setStatus('close'));
    }
  };

  return (
    <StyledDropdownAdd data-component-name="DropdownAdd">
      <ButtonUnstyled onClick={handleClick} shade={shade} variant={variant}>
        {getLabels().create.replace(/{search}/, `"${search}"`)}
      </ButtonUnstyled>
    </StyledDropdownAdd>
  );
}

DropdownAdd.displayName = 'DropdownAdd';

export default DropdownAdd;
