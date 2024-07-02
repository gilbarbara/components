import { Box, BoxCenter, Grid, H2, H3, Paragraph } from '~';

import { spacing } from '~/modules/theme';

export default function Radius() {
  return (
    <Box>
      <H2>Radius</H2>

      <Paragraph>
        The <strong>radius</strong> key is used used for the radius prop that some components
        support.
      </Paragraph>

      <Grid display="inline-grid" gap={spacing.xl} mt="xl" templateColumns="repeat(4, 1fr)">
        <BoxCenter bg="gray.100" height={128} radius="xxs" width={128}>
          <H3 mb={0}>xxs</H3>
        </BoxCenter>

        <BoxCenter bg="gray.100" height={128} radius="xs" width={128}>
          <H3 mb={0}>xs</H3>
        </BoxCenter>

        <BoxCenter bg="gray.100" height={128} radius="sm" width={128}>
          <H3 mb={0}>sm</H3>
        </BoxCenter>

        <BoxCenter bg="gray.100" height={128} radius="md" width={128}>
          <H3 mb={0}>md</H3>
        </BoxCenter>

        <BoxCenter bg="gray.100" height={128} radius="lg" width={128}>
          <H3 mb={0}>lg</H3>
        </BoxCenter>

        <BoxCenter bg="gray.100" height={128} radius="xl" width={128}>
          <H3 mb={0}>xl</H3>
        </BoxCenter>

        <BoxCenter bg="gray.100" height={128} radius="round" width={128}>
          <H3 mb={0}>round</H3>
        </BoxCenter>
      </Grid>
    </Box>
  );
}
