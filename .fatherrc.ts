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
  // umd: {
  //   globals: {},
  //   name: 'gule',
  //   file: 'gule', // 指定文件名 直接打包到dist目录
  //   minFile: true, // 是否为 umd 生成压缩后的版本。
  //   sourcemap: true, // 是否同步输出sourcemap
  // },
  extractCSS: true, // 配置是否提取 css 为单独文件。
  lessInBabelMode: true,
  sassInRollupMode: {},
  runtimeHelpers: true, //是否把 helper 方法提取到 @babel/runtime 里。
  // pkgs: [
  //   "vwin-eazy-win",
  //   "vwin-image-loader",
  //   "vwin-upload"
  // ],
  // extraBabelPlugins: [
  //   ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
  // ],
};
