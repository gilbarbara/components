import { Box, H1, H2, H3, H4, H5, H6, Jumbo, Paragraph, Spacer } from '~';

import { typography } from '../../../src/modules/theme';
import { PANGRAM } from '../../__helpers__';

import Heading from './Heading';

export default function Typography() {
  return (
    <Box>
      <H2>Typography</H2>

      <Paragraph mb="xl">
        Use typography to present your design and content as clearly and efficiently as possible.
      </Paragraph>

      <H3 color="primary">Headings</H3>

      <Spacer gap="xl" mb="xl" orientation="vertical">
        <Box>
          <Heading>Jumbo - Large ({typography.jumboLarge.fontSize})</Heading>
          <Jumbo large mb={0}>
            {PANGRAM}
          </Jumbo>
        </Box>

        <Box>
          <Heading>Jumbo ({typography.jumbo.fontSize})</Heading>
          <Jumbo mb={0}>{PANGRAM}</Jumbo>
        </Box>

        <Box>
          <Heading>H1 ({typography.h1.fontSize})</Heading>
          <H1 mb={0}>{PANGRAM}</H1>
        </Box>

        <Box>
          <Heading>H2 ({typography.h2.fontSize})</Heading>
          <H2 mb={0}>{PANGRAM}</H2>
        </Box>

        <Box>
          <Heading>H3 ({typography.h3.fontSize})</Heading>
          <H3 mb={0}>{PANGRAM}</H3>
        </Box>

        <Box>
          <Heading>H4 ({typography.h4.fontSize})</Heading>
          <H4 mb={0}>{PANGRAM}</H4>
        </Box>

        <Box>
          <Heading>H5 ({typography.h5.fontSize})</Heading>
          <H5 mb={0}>{PANGRAM}</H5>
        </Box>

        <Box>
          <Heading>H6 ({typography.h6.fontSize})</Heading>
          <H6 mb={0}>{PANGRAM}</H6>
        </Box>
      </Spacer>

      <H3 color="primary">Text</H3>

      <Spacer gap="xl" orientation="vertical">
        <Box>
          <Heading>xl ({typography.xl.fontSize})</Heading>
          <Paragraph size="xl">{PANGRAM}</Paragraph>
        </Box>

        <Box>
          <Heading>lg ({typography.lg.fontSize})</Heading>
          <Paragraph size="lg">{PANGRAM}</Paragraph>
        </Box>

        <Box>
          <Heading>md ({typography.md.fontSize})</Heading>
          <Paragraph>{PANGRAM}</Paragraph>
        </Box>

        <Box>
          <Heading>sm ({typography.sm.fontSize})</Heading>
          <Paragraph size="sm">{PANGRAM}</Paragraph>
        </Box>

        <Box>
          <Heading>xs ({typography.xs.fontSize})</Heading>
          <Paragraph size="xs">{PANGRAM}</Paragraph>
        </Box>

        <Box>
          <Heading>xxs ({typography.xxs.fontSize})</Heading>
          <Paragraph size="xxs">{PANGRAM}</Paragraph>
        </Box>
      </Spacer>
    </Box>
  );
}
