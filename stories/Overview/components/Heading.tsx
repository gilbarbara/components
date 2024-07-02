import { ReactNode } from 'react';

import { BoxInline, Paragraph } from '~';

interface HeadingProps {
  children: ReactNode;
}

export default function Heading({ children }: HeadingProps) {
  return (
    <BoxInline bg="gray.100" mb="xs" px="sm" py="xxs" radius="xl">
      <Paragraph color="gray.700" lineHeight={1} size="sm">
        {children}
      </Paragraph>
    </BoxInline>
  );
}
