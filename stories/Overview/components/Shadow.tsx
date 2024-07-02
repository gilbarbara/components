import { Box, BoxCenter, Grid, H2, H3, Paragraph } from '~';

import { spacing } from '~/modules/theme';

export default function Shadow() {
  return (
    <Box>
      <H2>Shadow</H2>

      <Paragraph>
        The <strong>shadow</strong> key is used used for the shadow prop that some components
        support.
      </Paragraph>

      <Grid display="inline-grid" gap={spacing.xxxl} mt="xl" templateColumns="repeat(3, 1fr)">
        <BoxCenter height={128} radius="md" shadow="low" width={128}>
          <H3>low</H3>
        </BoxCenter>

        <BoxCenter height={128} radius="md" shadow="mid" width={128}>
          <H3>mid</H3>
        </BoxCenter>

        <BoxCenter height={128} radius="md" shadow="high" width={128}>
          <H3>high</H3>
        </BoxCenter>
      </Grid>
    </Box>
  );
}
