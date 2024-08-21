import styled from '@emotion/styled';
import { ComponentProps } from '@gilbarbara/react-dropdown';

import { useTheme } from '~/hooks/useTheme';

import { ButtonUnstyled } from '~/components/ButtonUnstyled';

import { Theme, WithAccent } from '~/types';

import { DropdownProps } from './useDropdown';

interface Props extends WithAccent, ComponentProps, Pick<DropdownProps, 'onCreate'> {
  theme: Theme;
}

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
  const { getDataAttributes, theme } = useTheme();

  const handleClick = () => {
    onCreate?.(search, () => setStatus('close'));
  };

  return (
    <StyledDropdownAdd {...getDataAttributes('DropdownAdd')} theme={theme}>
      <ButtonUnstyled color={accent} onClick={handleClick}>
        {getLabels().create.replace(/{search}/, `"${search}"`)}
      </ButtonUnstyled>
    </StyledDropdownAdd>
  );
}

DropdownAdd.displayName = 'DropdownAdd';

export default DropdownAdd;
