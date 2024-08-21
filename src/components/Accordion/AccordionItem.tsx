import { isValidElement, ReactNode } from 'react';

import { Collapse } from '~/components/Collapse/Collapse';
import { FlexInline } from '~/components/Flex';
import { Text } from '~/components/Text';

import { AccordionItemBaseProps, AccordionItemProps, useAccordionItem } from './useAccordion';

export function AccordionItemBase(props: AccordionItemBaseProps) {
  const { componentProps, getDataAttributes } = useAccordionItem(props);
  const { children, compact, headerAlign, hideToggle, subtitle, title, ...rest } = componentProps;

  const content: Record<string, ReactNode> = {
    title: isValidElement(title) ? title : <Text size={compact ? 'md' : 'lg'}>{title}</Text>,
  };

  if (subtitle) {
    content.subtitle = isValidElement(subtitle) ? (
      subtitle
    ) : (
      <Text color="gray.500">{subtitle}</Text>
    );
  }

  content.header = (
    <FlexInline
      {...getDataAttributes('AccordionItemWrapper')}
      align={headerAlign}
      direction="column"
      flex
      py={compact ? undefined : 'xs'}
    >
      {content.title}
      {content.subtitle}
    </FlexInline>
  );

  return (
    <Collapse
      componentName="AccordionItem"
      hideHeaderToggle={hideToggle}
      {...rest}
      role="region"
      title={content.header}
    >
      {children}
    </Collapse>
  );
}

export function AccordionItem(props: AccordionItemProps) {
  return <AccordionItemBase {...props} />;
}

export { type AccordionItemProps } from './useAccordion';
