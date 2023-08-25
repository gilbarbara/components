import { capitalize, objectEntries } from '@gilbarbara/helpers';
import { compare, textColor } from 'colorizr';

import { Box, BoxCenter, Grid, H2, H3, H5, Icon, Paragraph, Spacer, Text } from '~';

import { getColorTokens } from '~/modules/colors';
import { colors, grayScale, variants as themeVariants } from '~/modules/theme';

import { tones } from '~/stories/__helpers__';

interface SwatchProps {
  bg: string;
  color: string;
  content: string;
  footer?: string;
}

function Swatch({ bg, color, content, footer }: SwatchProps) {
  const { mainColor } = getColorTokens(bg, null);

  return (
    <div>
      <div
        style={{
          backgroundColor: mainColor,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 100,
          width: 100,
        }}
      >
        <span style={{ color: textColor(color) }}>{content}</span>
      </div>
      {footer && <p style={{ marginTop: 12, textAlign: 'center' }}>{footer}</p>}
    </div>
  );
}

export function Colors() {
  return (
    <>
      <H2>Colors</H2>

      <Spacer direction="vertical" gap="xl" grow mb="xxl">
        {objectEntries(colors).map(([name, value]) => {
          const { contrast, largeAA, largeAAA, normalAA, normalAAA } = compare(
            value,
            textColor(value),
          );

          return (
            <Box key={name}>
              <H3 light>
                {capitalize(name)} ({value})
              </H3>
              <BoxCenter bg={name} padding="xl" radius={{ top: 'md' }}>
                <H5>The quick brown fox jumps over the lazy dog</H5>
                <Paragraph>The quick brown fox jumps over the lazy dog</Paragraph>
              </BoxCenter>
              <Grid
                border={{ color: name }}
                radius={{ bottom: 'md' }}
                templateColumns="repeat(5, 1fr)"
              >
                <BoxCenter border={{ color: name, side: 'right' }} padding="xs">
                  Contrast: {contrast}
                </BoxCenter>
                <BoxCenter border={{ color: name, side: 'right' }} padding="xs">
                  <Spacer gap="xxs">
                    <Text>normal AA:</Text>
                    <Icon
                      color={normalAA ? colors.green : colors.red}
                      name={normalAA ? 'check-o' : 'close-o'}
                      size={24}
                    />
                  </Spacer>
                </BoxCenter>
                <BoxCenter border={{ color: name, side: 'right' }} padding="xs">
                  <Spacer gap="xxs">
                    <Text>normal AAA:</Text>
                    <Icon
                      color={normalAAA ? colors.green : colors.red}
                      name={normalAAA ? 'check-o' : 'close-o'}
                      size={24}
                    />
                  </Spacer>
                </BoxCenter>
                <BoxCenter border={{ color: name, side: 'right' }} padding="xs">
                  <Spacer gap="xxs">
                    <Text>large AA:</Text>
                    <Icon
                      color={largeAA ? colors.green : colors.red}
                      name={largeAA ? 'check-o' : 'close-o'}
                      size={24}
                    />
                  </Spacer>
                </BoxCenter>
                <BoxCenter padding="xs">
                  <Spacer gap="xxs">
                    <Text>large AAA:</Text>
                    <Icon
                      color={largeAAA ? colors.green : colors.red}
                      name={largeAAA ? 'check-o' : 'close-o'}
                      size={24}
                    />
                  </Spacer>
                </BoxCenter>
              </Grid>
            </Box>
          );
        })}
      </Spacer>
    </>
  );
}

export function Grayscale() {
  return (
    <>
      <H2>Grayscale</H2>

      <Grid gap={32} justifyContent="start" templateColumns="repeat(6, auto)">
        {objectEntries(grayScale).map(([key, color]) => (
          <Swatch key={key} bg={color} color={color} content={key} footer={color} />
        ))}
      </Grid>
    </>
  );
}

export function Tones() {
  return (
    <>
      <H2>Tones</H2>

      <Spacer direction="vertical" gap="xl" grow mb="xxl">
        {tones.map(tone => (
          <Box key={tone}>
            <H3 light>{tone}</H3>
            <Grid gap={32} justifyContent="start" templateColumns="repeat(5, auto)">
              {objectEntries(themeVariants).map(([variant, variantTones]) => {
                const bg = variantTones[tone];

                return (
                  <Swatch
                    key={variant}
                    bg={`${variant}.${tone}`}
                    color={bg}
                    content={variant}
                    footer={bg}
                  />
                );
              })}
            </Grid>
          </Box>
        ))}
      </Spacer>
    </>
  );
}

export function Variants() {
  return (
    <>
      <H2>Variants</H2>

      <Spacer direction="vertical" gap="xl" grow mb="xxl">
        {objectEntries(themeVariants).map(([variant, tonesMap]) => (
          <Box key={variant}>
            <H3 light>{capitalize(variant)}</H3>
            <Grid gap={32} justifyContent="start" templateColumns="repeat(5, auto)">
              {objectEntries(tonesMap).map(([tone, value]) => {
                return (
                  <Swatch
                    key={tone}
                    bg={`${variant}.${tone}`}
                    color={value}
                    content={tone}
                    footer={value}
                  />
                );
              })}
            </Grid>
          </Box>
        ))}
      </Spacer>
    </>
  );
}
