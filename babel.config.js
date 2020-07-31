// 这是项目发布阶段需要用到的 babel 插件
const prodPlugins = []

// process.env.NODE_ENV 可以获取编译模式
// 判断如果当前编译模式是=== production 发布模式
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 发布产品时候的插件数组
  plugins: [...prodPlugins, '@babel/plugin-syntax-dynamic-import']
}
