export default {
  esm: {
    type: 'babel',
    file: 'es/index',
  },
  cjs: {
    type: 'babel',
    file: 'lib/index',
    lazy: true,
  },
  extractCSS: true, // 配置是否提取 css 为单独文件。
  lessInBabelMode: true,
  sassInRollupMode: {},
  runtimeHelpers: true, //是否把 helper 方法提取到 @babel/runtime 里。
  // pkgs: ['base', 'vendor'],
  extraBabelPlugins: [],
  extraBabelPresets: [],
};
