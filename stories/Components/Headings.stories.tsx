/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { H1, H2, H3, Jumbo } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Headings',
  component: Jumbo,
  argTypes: {
    ...hideProps('margin'),
    light: {
      table: { disable: true },
    },
    bigger: {
      table: { disable: true },
    },
  },
} as ComponentMeta<typeof Jumbo>;

export const Jumbo_ = (props: any) => {
  return (
    <div>
      <Jumbo bigger {...props}>
        Jumbo title (bigger)
      </Jumbo>
      <Jumbo {...props}>Jumbo title</Jumbo>
      <Jumbo light {...props}>
        Jumbo title (light)
      </Jumbo>
    </div>
  );
};

export const H1_ = (props: any) => {
  return (
    <div>
      <H1 {...props}>H1 title</H1>
      <H1 light {...props}>
        H1 title (light)
      </H1>
    </div>
  );
};

export const H2_ = (props: any) => {
  return (
    <div>
      <H2 {...props}>H2 title</H2>
      <H2 light {...props}>
        H2 title (light)
      </H2>
    </div>
  );
};

export const H3_ = (props: any) => {
  return (
    <div>
      <H3 {...props}>H3 title</H3>
      <H3 light {...props}>
        H3 title (light)
      </H3>
    </div>
  );
};
