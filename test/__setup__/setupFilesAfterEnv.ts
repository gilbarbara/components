import '@testing-library/jest-dom';

import { matchers } from '@emotion/jest';
import { configure } from '@testing-library/react';
import * as extendedMatchers from 'jest-extended';

expect.extend(matchers);
expect.extend(extendedMatchers);

configure({ testIdAttribute: 'data-component-name' });
