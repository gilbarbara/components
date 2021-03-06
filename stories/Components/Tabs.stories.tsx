import { ComponentMeta } from '@storybook/react';
import { Icon, Paragraph, Spacer } from 'src';
import { Tab, Tabs, TabsProps } from 'src/Tabs';

import { colorProps, hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    ...Tabs.defaultProps,
    initialId: 'one',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
    maxHeight: { control: 'text' },
    minHeight: { control: 'text' },
  },
} as ComponentMeta<typeof Tabs>;

export const Basic = (props: TabsProps) => (
  <Tabs {...props}>
    <Tab
      id="one"
      title={
        <Spacer gap="xs" wrap={false}>
          <Icon name="add" />
          First tab
        </Spacer>
      }
    >
      <Paragraph>
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
        there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the
        Semantics, a large language ocean. A small river named Duden flows by their place and
        supplies it with the necessary regelialia.
      </Paragraph>
      <Paragraph>
        It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even
        the all-powerful Pointing has no control about the blind texts it is an almost
        unorthographic life One day however a small line of blind text by the name of Lorem Ipsum
        decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so,
        because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but
        the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the
        belt and made herself on the way.
      </Paragraph>
    </Tab>
    <Tab id="two" title="Second tab">
      <Paragraph>
        When she reached the first hills of the Italic Mountains, she had a last view back on the
        skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of
        her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she
        continued her way. On her way she met a copy.
      </Paragraph>
      <Paragraph>
        The copy warned the Little Blind Text, that where it came from it would have been rewritten
        a thousand times and everything that was left from its origin would be the word "and" and
        the Little Blind Text should turn around and return to its own, safe country. But nothing
        the copy said could convince her and so it didn’t take long until a few insidious Copy
        Writers ambushed her, made her drunk with Longe and Parole and dragged her into their
        agency.
      </Paragraph>
    </Tab>
    <Tab id="three" title="Third tab">
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lorem turpis, rhoncus eu
        efficitur vulputate, ornare in leo. Duis euismod aliquet ultricies. Nam elementum sem eu
        varius facilisis. Sed luctus quis ex in laoreet. Vivamus ultricies quam in accumsan rhoncus.
        Nullam id gravida lorem. Aliquam odio orci, cursus vitae posuere sit amet, commodo ac lacus.
      </Paragraph>
      <Paragraph>
        Pellentesque ac feugiat purus. Aenean congue, tortor id feugiat dapibus, massa tellus
        lacinia lectus, et posuere velit elit a nisl. Aenean a condimentum lacus. Phasellus vel
        porta lorem. Aenean imperdiet condimentum felis, malesuada gravida dui elementum sed. Sed
        vehicula ligula sit amet leo volutpat luctus. Praesent dui nunc, blandit nec nibh id,
        placerat molestie massa. Morbi mi lectus, imperdiet sit amet accumsan sed, sodales sit amet
        tellus. Etiam accumsan arcu sed erat ullamcorper posuere. Pellentesque in suscipit neque. Ut
        sed lorem suscipit, fringilla turpis ut, faucibus nibh.
      </Paragraph>
    </Tab>
    <Tab disabled id="four" title="Fourth tab">
      <Paragraph>
        Vivamus quis eros ut metus ultrices blandit eget eget velit. Maecenas quis turpis in nisi
        sagittis ullamcorper in nec erat. Morbi hendrerit imperdiet felis ultrices sagittis. Sed sed
        tristique eros. Etiam nec cursus arcu. Sed tellus justo, placerat vel porttitor non, lacinia
        vel eros. Donec scelerisque iaculis mattis. Cras venenatis commodo condimentum. Nulla enim
        ex, lobortis ac maximus in, aliquet a nisl. Suspendisse orci ipsum, porta non dapibus ut,
        tincidunt vel elit. Ut non ultricies tellus. Suspendisse ut cursus libero.
      </Paragraph>
      <Paragraph>
        Duis vel sem neceros interdum pharetra. Mauris cursus ac mi a ultricies. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque mattis
        feugiat nibh, at viverra ipsum mollis quis. Donec eu fermentum turpis, quis fermentum dui.
        Donec nunc nunc, blandit sed nisl in, sollicitudin tristique dui. Aliquam placerat auctor
        facilisis. In hac habitasse platea dictumst. Sed a enim nunc. Nam laoreet dolor ac tellus
        venenatis facilisis. Aliquam eu maximus nisl. Ut lorem purus, maximus ut augue a, placerat
        tincidunt arcu.
      </Paragraph>
    </Tab>
  </Tabs>
);
