import SVG from 'react-inlinesvg';

import { Box, H2, H3, Jumbo, Paragraph, Spacer } from '~';

import CodeBlock from './CodeBlock';

import packageJson from '../../../package.json';

function OverviewAbout() {
  return (
    <Box>
      <Jumbo>@gilbarbara/components</Jumbo>

      <img alt="components" src="https://files.gilbarbara.dev/logos/components.svg" />

      <Paragraph mt="md">
        A collection of React components to help you create beautiful user interfaces.
      </Paragraph>
      <Paragraph mt={0}>
        It is built on top of the{' '}
        <a href="https://emotion.sh/docs/Overviewduction" rel="noopener noreferrer" target="_blank">
          {' '}
          @emotion
        </a>{' '}
        system.
      </Paragraph>

      <Spacer gap="xs" mb="xl" mt="md">
        <a href="https://github.com/gilbarbara/components" rel="noreferrer" target="_blank">
          <SVG height={24} src="https://cdn.svgporn.com/logos/github-icon.svg" width={32} />
        </a>
        <a
          href="https://www.npmjs.com/package/@gilbarbara/components"
          rel="noreferrer"
          target="_blank"
        >
          <SVG height={24} src="https://cdn.svgporn.com/logos/npm-icon.svg" width={32} />
        </a>
        <H3 light mb={0}>
          Version: {packageJson.version}
        </H3>
      </Spacer>

      <H2>Installation</H2>

      <CodeBlock language="bash">
        npm i @gilbarbara/components @emotion/react @emotion/styled
      </CodeBlock>

      <H2>Usage</H2>

      <CodeBlock language="tsx">{`import { DatePicker } from '@gilbarbara/components';

function App() {
  return <DatePicker />
}
`}</CodeBlock>

      <H2>API</H2>

      <Box mb="md">
        <Paragraph bold>Types</Paragraph>
        <Paragraph mt={0}>All the common types used in the components</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>theme</Paragraph>
        <Paragraph mt={0}>The base theme.</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>getContainerStyles</Paragraph>
        <Paragraph mt={0}>Add responsive padding to a component.</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>mergeTheme</Paragraph>
        <Paragraph mt={0}>A function to create a new theme with custom tokens.</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>px</Paragraph>
        <Paragraph mt={0}>
          Returns a px string for a number (if the input is already a string just returns it).
        </Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>responsive</Paragraph>
        <Paragraph mt={0}>Create media queries based in the `breakpoints` token.</Paragraph>
      </Box>

      <CodeBlock language="tsx">
        {`\${responsive({
  _: { // "_" is the base
    width: '29rem',
  },
  md: {
    width: '32rem',
  },
})};`}
      </CodeBlock>

      <H3 mt="md">Animation</H3>

      <Box mb="md">
        <Paragraph bold>animateIcon</Paragraph>
        <Paragraph mt={0}>Animate an element</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>fadeIn</Paragraph>
        <Paragraph mt={0}>keyframes for fadeIn animation</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>fadeOut</Paragraph>
        <Paragraph mt={0}>keyframes for fadeOut animation</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>fadeInOut</Paragraph>
        <Paragraph mt={0}>keyframes for fadeInOut animation</Paragraph>
      </Box>

      <Box mb="md">
        <Paragraph bold>rotate</Paragraph>
        <Paragraph mt={0}>keyframes for rotate animation</Paragraph>
      </Box>
    </Box>
  );
}

export default OverviewAbout;
