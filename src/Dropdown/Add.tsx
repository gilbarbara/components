import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SelectRenderer } from '@gilbarbara/react-dropdown';

import { Button } from '../Button';
import { getTheme } from '../modules/helpers';

type Props = SelectRenderer<any>;

const StyledDropdownAdd = styled.div(props => {
  const { spacing } = getTheme(props);

  return css`
    padding: ${spacing.xs};
  `;
});

function DropdownAdd(props: Props): JSX.Element {
  const {
    methods: { createNew },
    props: { createNewLabel },
    state: { search },
  } = props;

  const handleClick = () => {
    createNew(search);
  };

  return (
    <StyledDropdownAdd>
      <Button onClick={handleClick} transparent>
        {createNewLabel?.replace(/{search}/, `"${search}"`)}
      </Button>
    </StyledDropdownAdd>
  );
}

export default DropdownAdd;
