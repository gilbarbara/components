import styled from '@emotion/styled';
import { ComponentProps } from '@gilbarbara/react-dropdown';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';

import { WithAccent } from '~/types';

import { DropdownProps } from './types';

interface Props extends WithAccent, ComponentProps, Pick<DropdownProps, 'onCreate'> {}

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
    accent = 'primary',
    methods: { getLabels, setStatus },
    onCreate,
    state: { search },
  } = props;

  const handleClick = () => {
    onCreate?.(search, () => setStatus('close'));
  };

  return (
    <StyledDropdownAdd data-component-name="DropdownAdd">
      <ButtonUnstyled color={accent} onClick={handleClick}>
        {getLabels().create.replace(/{search}/, `"${search}"`)}
      </ButtonUnstyled>
    </StyledDropdownAdd>
  );
}

DropdownAdd.displayName = 'DropdownAdd';

export default DropdownAdd;
