import { dirname, join, parse } from 'path';
import { existsSync } from 'fs';
import TsConfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin';

function getPackageDir(filepath: any) {
  let currDir = dirname(require.resolve(filepath));

  while (true) {
    if (existsSync(join(currDir, 'package.json'))) {
      return currDir;
    }

    const { dir, root } = parse(currDir);

    if (dir === root) {
      throw new Error(
        `Could not find package.json in the parent directories starting from ${filepath}.`
      );
    }

    currDir = dir;
  }
}

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  webpackFinal: async (config: any) => {
    config.resolve.alias['@emotion/core'] = getPackageDir('@emotion/react');
    config.resolve.alias['@emotion/styled'] = getPackageDir('@emotion/styled');
    config.resolve.plugins = [new TsConfigPathsWebpackPlugin()];

    return config;
  },
}
