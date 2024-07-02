import { ReactNode } from 'react';

import { Avatar, Box, Chip, H3, Image, Paragraph, type Props } from '~';

interface CardProps extends Omit<Props.BoxProps, 'title'> {
  authorImage?: string;
  authorName: string;
  date: string;
  description: ReactNode;
  imageAlt: string;
  imageSrc: string;
  tags?: Array<string | { bg: string; color?: string; name: string }>;
  title: ReactNode;
}

export default function Card(props: CardProps) {
  const {
    authorImage,
    authorName,
    date,
    description,
    imageAlt,
    imageSrc,
    padding,
    tags,
    title,
    ...rest
  } = props;

  return (
    <Box
      direction="column"
      flexBox
      minHeight={480}
      overflow="hidden"
      radius="md"
      shadow="mid"
      width={300}
      {...rest}
    >
      <Box as="header" flexBox>
        <Image alt={imageAlt} src={imageSrc} />
      </Box>
      <Box direction="column" flex flexBox padding="md">
        <H3>{title}</H3>
        <Paragraph>{description}</Paragraph>
        {!!tags && (
          <Box flexBox gap="8" mt="sm">
            {tags.map(tag => {
              const {
                bg = 'red',
                color = 'white',
                name,
              } = typeof tag === 'string' ? { name: tag } : tag;

              return (
                <Chip key={name} bg={bg} color={color}>
                  {name}
                </Chip>
              );
            })}
          </Box>
        )}
        <Box as="footer" flexBox mt="auto">
          <Avatar image={authorImage} name={authorName} />
          <Box ml="xs">
            <Paragraph bold>{authorName}</Paragraph>
            <Paragraph mt={0} size="sm">
              {date}
            </Paragraph>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
