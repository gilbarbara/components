import LinkTo from '@storybook/addon-links/react';

import { Flex, FlexInline, Icon } from '~';

interface FooterProps {
  next?: string;
  previous?: string;
}

export default function Navigation(props: FooterProps) {
  const { next, previous } = props;

  return (
    <Flex border={{ side: 'top', color: 'primary.100' }} mt="lg" pt="xs">
      {previous && (
        <FlexInline>
          <LinkTo kind={previous} story="docs">
            <FlexInline color="black">
              <Icon color="primary" mr="xs" name="chevron-left" />
              {previous}
            </FlexInline>
          </LinkTo>
        </FlexInline>
      )}
      {next && (
        <FlexInline ml="auto">
          <LinkTo kind={next} story="docs">
            <FlexInline color="black">
              {next}
              <Icon color="primary" ml="xs" name="chevron-right" />
            </FlexInline>
          </LinkTo>
        </FlexInline>
      )}
    </Flex>
  );
}
