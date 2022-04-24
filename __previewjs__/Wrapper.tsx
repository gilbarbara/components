import * as React from 'react';

import { Box } from '../src';

export function Wrapper({ children }: React.PropsWithChildren<any>) {
  return <Box padding="md">{children}</Box>;
}
