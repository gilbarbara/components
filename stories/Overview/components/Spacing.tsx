import { Box, Grid, H2, Paragraph, Spacer } from '~';

import { spacing } from '~/modules/theme';

import { SPACING } from '~/stories/__helpers__';

export default function Spacing() {
  return (
    <Box>
      <H2>Spacing</H2>

      <Paragraph>
        The <strong>spacing</strong> key is used used for margin, padding and a few other
        attributes.
      </Paragraph>
      <Paragraph skipMarginTop>
        Most components supports the margin and/or padding props where you can pass a spacing key.
      </Paragraph>
      <Paragraph mt="md">Additionally, you can use these shortcuts:</Paragraph>
      <Spacer gap="xl" mt="md">
        <Box>
          <Paragraph bold>Padding</Paragraph>
          <ul style={{ paddingLeft: 16 }}>
            <li>p (all sides)</li>
            <li>pt (top)</li>
            <li>pr (right)</li>
            <li>pb (bottom)</li>
            <li>pl (left)</li>
            <li>px (left and right)</li>
            <li>py (top and bottom)</li>
          </ul>
        </Box>
        <Box>
          <Paragraph bold>Margin:</Paragraph>
          <ul style={{ paddingLeft: 10 }}>
            <li>m (all sides)</li>
            <li>mt (top)</li>
            <li>mr (right)</li>
            <li>mb (bottom)</li>
            <li>ml (left)</li>
            <li>mx (left and right)</li>
            <li>my (top and bottom)</li>
          </ul>
        </Box>
      </Spacer>

      <Grid display="inline-grid" gap={spacing.xl} mt="xl" templateColumns="repeat(3, 1fr)">
        {SPACING.map(d => (
          <Spacer key={d}>
            <Box width={spacing.xxl}>
              <Paragraph bold>{d}</Paragraph>
              <Paragraph color="gray" mt={0} size="sm">
                {spacing[d]}
              </Paragraph>
            </Box>
            <Box bg="primary" height={spacing.xxl} width={spacing[d]} />
          </Spacer>
        ))}
      </Grid>
    </Box>
  );
}
