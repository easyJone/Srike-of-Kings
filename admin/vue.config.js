module.exports = {
  chainWebpack: config => {
    // 修复HMR热更新
    config.resolve.symlinks(true);
  },
}