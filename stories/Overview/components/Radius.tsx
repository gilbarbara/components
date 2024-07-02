import { objectKeys } from '@gilbarbara/helpers';

import { Box, BoxCenter, Grid, H2, H3, Paragraph } from '~';

import { radius, spacing } from '~/modules/theme';

export default function Radius() {
  return (
    <Box>
      <H2>Radius</H2>

      <Paragraph>
        The <strong>radius</strong> key is used used for the radius prop that some components
        support.
      </Paragraph>

      <Grid display="inline-grid" gap={spacing.xl} mt="xl" templateColumns="repeat(4, 1fr)">
        {objectKeys(radius).map(radii => (
          <BoxCenter key={radii} bg="gray.100" height={128} radius={radii} width={128}>
            <H3 mb={0}>{radii}</H3>
          </BoxCenter>
        ))}
      </Grid>
    </Box>
  );
}
