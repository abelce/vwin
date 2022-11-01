import { defineConfig } from 'dumi';

import path from 'path';
const repo = 'dumi-template';

export default defineConfig({
  title: repo,
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  // Because of using GitHub Pages
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  alias: {
    vmin: path.resolve(__dirname, './packages'),
    somo: path.resolve(__dirname, './packages/somo/src'),
  },
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/umijs/dumi-template',
    },
  ],
  // more config: https://d.umijs.org/config
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'somo',
        libraryDirectory: 'src',
      },
      'somo',
    ],
  ],
  apiParser: {
    // 自定义属性过滤配置，也可以是一个函数，用法参考：https://github.com/styleguidist/react-docgen-typescript/#propfilter
    propFilter: {
      // 是否忽略从 node_modules 继承的属性，默认值为 false
      // skipNodeModules: true,
    },
  },
});
