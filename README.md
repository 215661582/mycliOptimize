# mycli

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目初始化
+ 安装了 element-ui
+ 封装了 axios 

### 项目优化

#### 在执行build命令期间移除所有的console

安装：

```shell
npm install babel-plugin-transform-remove-console --save-dev
```

配置：babel.config.js 文件

```javascript
// 这是项目发布阶段需要用到的 babel 插件
const prodPlugins = []

// process.env.NODE_ENV 可以获取编译模式
// 判断如果当前编译模式是=== production 发布模式
if (process.env.NODE_ENV === 'production') {
    // 引入包
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 发布产品时候的插件数组
  plugins: [...prodPlugins, '@babel/plugin-syntax-dynamic-import']
}

```



#### 为开发模式与发布模式指定不同的打包入口

1. 创建 main-dev.js 开发文件  也可以通过原先的main.js文件直接修改成main-dev.js 

2. 创建 main-prod.js 发布模式

3. 创建 vue.config.js 配置文件

   ```javascript
   // vue.config.js 文件
   
   module.exports = {
     // 修改默认打包入口
     chainWebpack: config => {
       // 发布模式
       config.when(process.env.NODE_ENV === 'production', config => {
           // 发布模式的时候 读取 ./src/main-prod.js 文件
         config.entry('app').clear().add('./src/main-prod.js')
       })
   
       // 开发模式
       config.when(process.env.NODE_ENV === 'development', config => {
           // 开发模式的时候 读取 ./src/main-dev.js 文件
         config.entry('app').clear().add('./src/main-dev.js')
       })
     }
   }
   
   ```

   

#### 通过 externals 加载外部 CDN 资源

为了解决单文件体积过大， 可以通过 webpack 的 externals 节点，来配置并加载外部的 CDN 资源。凡是声明在externals 中的第三方依赖包，都不会被打包。

##### 1.externals 中声明不被打包的第三方依赖包

```javascript
// vue.config.js 文件

module.exports = {
  // 修改默认打包入口
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
        // 发布模式的时候 读取 ./src/main-prod.js 文件
      config.entry('app').clear().add('./src/main-prod.js')
        
        // 凡是声明在externals 中的第三方依赖包，都不会被打包
        // element-ui 直接把全局引用给注释掉即可
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios'
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
        // 开发模式的时候 读取 ./src/main-dev.js 文件
      config.entry('app').clear().add('./src/main-dev.js')
    })
  }
}
```



##### 2.element-ui 直接在 main-prod.js 中引用给注释掉即可：

```javascript
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

// // element
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

// // 引入axios
import MyHttpServer from '@/api/index.js'
// Vue.prototype.$http = MyHttpServer
Vue.use(MyHttpServer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

```



##### 3.args[0]追加一个自定义参数

```javascript
// vue.config.js 文件

module.exports = {
  // 修改默认打包入口
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
        // 发布模式的时候 读取 ./src/main-prod.js 文件
      config.entry('app').clear().add('./src/main-prod.js')
        
        // 凡是声明在externals 中的第三方依赖包，都不会被打包
        // element-ui 直接把全局引用给注释掉即可
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios'
      })
        
        // 在发布模式中 isProd = true
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
        // 开发模式的时候 读取 ./src/main-dev.js 文件
      config.entry('app').clear().add('./src/main-dev.js')
        
        // 在开发模式中 isProd = true
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}
```



##### 4.同时，需要在 public/index.html 文件的头部， 添加如下的 CDN 资源引用

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <!-- 判断刚才自定义isProd -->
  <title><%= htmlWebpackPlugin.options.isProd ? '' : 'dev - ' %>mycli</title>
	
    <!-- 判断刚才自定义isProd 发布模式加载下面的样式 开发模式不加载 -->
  <% if(htmlWebpackPlugin.options.isProd){ %>
  <!-- element 的样式表 -->
  <link href="https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css" rel="stylesheet">
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.18.0/axios.min.js"></script>
  <!-- element js文件 -->
  <script src="https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.js"></script>
  <% } %>
</head>

<body>
  <div id="app"></div>
</body>

</html>

```



#### 路由懒加载

1. 安装：

```shell
npm install --save-dev @babel/plugin-syntax-dynamic-import
```

2. 在 babel.config.js 配置文件中声明该插件

```javascript
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

```

3. 将路由改为按需加载的形式

```javascript
// 官方示例
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')


// import Home from '@/components/HelloWorld.vue'
const Home = () => import(/* webpackChunkName: "home" */ '@/components/HelloWorld.vue')
// import Login from '@/components/login/login.vue'
const Login = () => import(/* webpackChunkName: "login" */ '@/components/login/login.vue')
```

