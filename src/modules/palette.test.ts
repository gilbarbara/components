import { generatePalette } from '~/modules/palette';

describe('generatePalette', () => {
  it('should return properly', () => {
    expect(generatePalette('#ff0044')).toMatchSnapshot();
  });

  it('should return a monochromatic palette', () => {
    expect(generatePalette('#808080', true)).toMatchSnapshot();
  });
});
