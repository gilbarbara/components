import React from 'react';
import SVG from 'react-inlinesvg';

import CodeBlock from './CodeBlock';

import packageJson from '../../../package.json';
import { Box, Group, H3, Jumbo, Paragraph } from '../../../src';

function IntroAbout(): JSX.Element {
  return (
    <Box>
      <Jumbo>@gilbarbara/components</Jumbo>

      <Paragraph>
        A collection of high quality React components that will help you create beautiful user
        interfaces.
      </Paragraph>
      <Paragraph mt={0}>
        It is built on top of the{' '}
        <a href="https://emotion.sh/docs/introduction" rel="noopener noreferrer" target="_blank">
          {' '}
          @emotion
        </a>{' '}
        system.
      </Paragraph>

      <H3 light mt="md">
        Installation
      </H3>

      <CodeBlock language="bash">npm i @gilbarbara/components</CodeBlock>

      <H3 light mt="xl">
        Usage
      </H3>

      <CodeBlock language="tsx">{`import { DatePicker } from '@gilbarbara/components';

function App() {
  return <DatePicker />
}
`}</CodeBlock>

      <H3 mt="xl">Version: {packageJson.version}</H3>

      <Group>
        <a href="https://github.com/gilbarbara/components" rel="noreferrer" target="_blank">
          <SVG height={32} src="https://cdn.svgporn.com/logos/github-icon.svg" width={32} />
        </a>
      </Group>
    </Box>
  );
}

export default IntroAbout;
