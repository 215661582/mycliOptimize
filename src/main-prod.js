import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
// // element
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// // 引入axios
import MyHttpServer from '@/api/index.js'
// Vue.prototype.$http = MyHttpServer
Vue.use(MyHttpServer)
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
