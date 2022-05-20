import styled from '@emotion/styled';
import { SelectRenderer } from '@gilbarbara/react-dropdown';

import { ButtonBase } from '../ButtonBase';
import { DropdownProps, WithColor } from '../types';

interface Props
  extends WithColor,
    SelectRenderer<any>,
    Pick<DropdownProps<any>, 'createLabel' | 'onCreate'> {}

const StyledDropdownAdd = styled.div`
  width: 100%;

  button {
    display: flex;
    justify-content: center;
    padding: 8px;
    width: 100%;
  }
`;

function DropdownAdd(props: Props): JSX.Element {
  const {
    createLabel,
    methods: { dropDown },
    onCreate,
    shade,
    state: { search },
    variant = 'primary',
  } = props;

  const handleClick = () => {
    if (onCreate) {
      onCreate(search, () => dropDown('close', null));
    }
  };

  return (
    <StyledDropdownAdd data-component-name="DropdownAdd">
      <ButtonBase onClick={handleClick} shade={shade} variant={variant}>
        {createLabel?.replace(/{search}/, `"${search}"`)}
      </ButtonBase>
    </StyledDropdownAdd>
  );
}

export default DropdownAdd;
