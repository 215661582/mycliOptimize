/**
 * 请求方法的统一处理
 */
// import Vue from 'vue'
import base from './base'
import http from '@/plugins/http.js'

const api = {
  /**
   * 登录请求
   * @param {用户名} username
   * @param {密码} password
   */
  getLoginData (username) {
    return http.post(base.loginPath, username)
  }
}
// Vue.prototype.$http = api
const MyHttpServer = {}
MyHttpServer.install = (Vue) => {
  //  添加实例方法
  Vue.prototype.$http = api
}

export default MyHttpServer
