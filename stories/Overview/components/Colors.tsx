import { isValidElement, ReactNode } from 'react';
import { capitalize, objectEntries } from '@gilbarbara/helpers';
import { compare, textColor } from 'colorizr';

import { Box, Chip, Flex, FlexCenter, H2, H3, Paragraph, Spacer } from '~';

import * as theme from '~/modules/theme';
import { TONES } from '~/stories/__helpers__';

interface SwatchProps {
  bg: string;
  color: string;
  content: ReactNode;
  footer?: ReactNode;
  size?: number;
}

const { colors, grayScale, textColorOptions, variants } = theme;

function getValidationColor(isValid: boolean) {
  return isValid ? 'green' : 'red';
}

function Swatch({ bg, color, content, footer, size = 100 }: SwatchProps) {
  return (
    <Box>
      <FlexCenter
        bg={bg}
        color={textColor(color, textColorOptions)}
        data-component-name="Swatch"
        height={size}
        radius="lg"
        textAlign="center"
        width={size}
      >
        {content}
      </FlexCenter>
      {footer &&
        (isValidElement(footer) ? (
          footer
        ) : (
          <Paragraph align="center" mt="md">
            {footer}
          </Paragraph>
        ))}
    </Box>
  );
}

export function Colors() {
  return (
    <>
      <H2>Colors</H2>

      <Flex gap={32} justify="start" maxWidth={1024} mb="xxl" wrap="wrap">
        {objectEntries(colors).map(([key, value]) => {
          const { contrast, largeAA, largeAAA, normalAA, normalAAA } = compare(
            value,
            textColor(value, textColorOptions),
          );

          return (
            <Swatch
              key={key}
              bg={value}
              color={value}
              content={
                <Flex direction="column" gap="xxs" justify="center" size="sm" textAlign="center">
                  <Paragraph size="lg">{key}</Paragraph>
                  <Paragraph mt={0} style={{ fontWeight: 500 }}>
                    {value}
                  </Paragraph>
                </Flex>
              }
              footer={
                <Flex align="center" direction="column" gap="sm" justify="center" mt="md" size="sm">
                  <Chip bg="black" bold variant="bordered">
                    {contrast}
                  </Chip>
                  <Flex gap="xs">
                    <Chip bg={getValidationColor(normalAA)}>AA</Chip>
                    <Chip bg={getValidationColor(normalAAA)}>AAA</Chip>
                  </Flex>
                  <Flex gap="xs">
                    <Chip bg={getValidationColor(largeAA)} bold size="md">
                      AA
                    </Chip>
                    <Chip bg={getValidationColor(largeAAA)} bold size="md">
                      AAA
                    </Chip>
                  </Flex>
                </Flex>
              }
              size={160}
            />
          );
        })}
      </Flex>
    </>
  );
}

export function Grayscale() {
  return (
    <>
      <H2>Grayscale</H2>

      <Flex gap={32} justify="start" maxWidth={720} wrap="wrap">
        {objectEntries(grayScale).map(([key, color]) => (
          <Swatch
            key={key}
            bg={color}
            color={color}
            content={
              <>
                {key}
                <br />
                <span style={{ fontWeight: 500 }}>{color}</span>
              </>
            }
          />
        ))}
      </Flex>
    </>
  );
}

export function Tones() {
  return (
    <>
      <H2>Tones</H2>

      <Spacer gap="xl" grow mb="xxl" orientation="vertical">
        {TONES.map(tone => (
          <Box key={tone}>
            <H3 light>{tone}</H3>
            <Flex gap={32} justify="start" maxWidth={720} wrap="wrap">
              {objectEntries(variants).map(([variant, variantTones]) => {
                const bg = variantTones[tone];

                return (
                  <Swatch
                    key={variant}
                    bg={bg}
                    color={bg}
                    content={
                      <>
                        {variant}
                        <br />
                        <span style={{ fontWeight: 500 }}>{bg}</span>
                      </>
                    }
                  />
                );
              })}
            </Flex>
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

      <Spacer gap="xl" grow mb="xxl" orientation="vertical">
        {objectEntries(variants).map(([variant, tonesMap]) => (
          <Box key={variant}>
            <H3 light>{capitalize(variant)}</H3>
            <Flex gap={32} justify="start" maxWidth={720} wrap="wrap">
              {objectEntries(tonesMap).map(([tone, value]) => {
                return (
                  <Swatch
                    key={tone}
                    bg={value}
                    color={value}
                    content={
                      <>
                        {tone}
                        <br />
                        <span style={{ fontWeight: 500 }}>{value}</span>
                      </>
                    }
                  />
                );
              })}
            </Flex>
          </Box>
        ))}
      </Spacer>
    </>
  );
}
