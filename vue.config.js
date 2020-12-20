// 添加配置
module.exports = {
  // 配置别名
  configureWebpack: {
    resolve: {
      // 配置省略一些路径的后缀名
      extensions: [],
      alias: {
        // '@': 'src',   // 已经默认配置
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
      }
    }
  }
}