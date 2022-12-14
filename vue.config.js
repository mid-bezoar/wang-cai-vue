const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/bill-website/' : '/',
  lintOnSave: false,
  chainWebpack: (config) => {
    const dir = path.resolve(__dirname, 'src/assets/icons')

    config.module
      .rule('svg-sprite') // 规则
      .test(/\.svg$/) // svg 走这个规则
      .include.add(dir)
      .end() // 只包含 icons 目录
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ extract: false })
      .end()
      // 删除 svg 默认颜色
      .use('svgo-loader')
      .loader('svgo-loader')
      .tap((options) => ({ ...options, plugins: [{ removeAttrs: { attrs: 'fill' } }] }))
      .end()

    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{ plainSprite: true }])
    config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icons 目录
  }
}
