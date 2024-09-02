import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { getStoryContext, TestRunnerConfig } from '@storybook/test-runner';

const DEFAULT_VIEWPORT_SIZE = { width: 1280, height: 720 };

const config: TestRunnerConfig = {
  async preVisit(page, story) {
    const context = await getStoryContext(page, story);
    const viewportName = context.parameters?.viewport?.defaultViewport;
    const viewportParameter = MINIMAL_VIEWPORTS[viewportName];

    if (viewportParameter) {
      const viewportSize = Object.fromEntries(
        Object.entries(viewportParameter.styles!).map(([screen, size]) => [
          screen,
          parseInt(size, 10),
        ]),
      ) as { height: number; width: number };

      await page.setViewportSize(viewportSize);
    } else {
      await page.setViewportSize(DEFAULT_VIEWPORT_SIZE);
    }
  },
};

export default config;
