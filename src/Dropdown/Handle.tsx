import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SelectRenderer } from '@gilbarbara/react-dropdown';

import { getTheme } from '../modules/helpers';
import { getStyledOptions } from '../modules/system';

const StyledHandle = styled(
  'div',
  getStyledOptions(),
)<{ isOpen: boolean }>(props => {
  const { isOpen } = props;
  const { black, darkMode, white } = getTheme(props);

  return css`
    align-items: center;
    color: ${darkMode ? white : black};
    display: flex;
    justify-content: center;
    padding: 0 8px;

    svg path {
      stroke: none !important;
      transform: rotate(${isOpen ? '180deg' : 0});
      transform-origin: center;
    }
  `;
});

function DropdownHandle(props: SelectRenderer<any>): JSX.Element {
  const {
    state: { dropdown },
  } = props;

  return (
    <StyledHandle data-component-name="DropdownHandle" isOpen={dropdown}>
      <svg
        height="16px"
        version="1.1"
        viewBox="0 0 16 16"
        width="16px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14,5.52466366 C14,5.41704038 13.9641256,5.32735426 13.8923766,5.25560543 L13.3004484,4.60986548 C13.1928251,4.53811658 13.0852018,4.50224213 12.9775785,4.50224213 C12.8699551,4.50224213 12.7802691,4.53811658 12.7085202,4.60986548 L8.02690583,9.3452915 L3.29147982,4.60986548 C3.21973094,4.53811658 3.13004485,4.50224213 3.02242152,4.50224213 C2.91479821,4.50224213 2.82511211,4.53811658 2.75336323,4.60986548 L2.10762332,5.25560543 C2.03587444,5.32735426 2,5.41704038 2,5.52466366 C2,5.63228701 2.03587444,5.72197313 2.10762332,5.79372196 L7.70403588,11.3901345 C7.81165919,11.4618834 7.91928251,11.4977579 8.02690583,11.4977579 C8.13452915,11.4977579 8.22421524,11.4618834 8.29596412,11.3901345 L13.8923766,5.79372196 C13.9641256,5.72197313 14,5.63228701 14,5.52466366 Z"
          fill="currentColor"
        />
      </svg>
    </StyledHandle>
  );
}

export default DropdownHandle;
