import axios from 'axios'

const instance = axios.create({
  timeout: 5000
})
instance.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log('拦截器触发了')
  // console.log(config.url)
  // console.log(config)
  if (config.url !== 'login') {
    // 设置请求头
    const AUTH_TOKEN = localStorage.getItem('token')
    config.headers.Authorization = AUTH_TOKEN
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response)
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// const MyHttpServer = {}

// MyHttpServer.install = (Vue) => {
//   instance.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

//   // 添加请求拦截器
//   instance.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     // console.log('拦截器触发了')
//     // console.log(config.url)
//     // console.log(config)
//     if (config.url !== 'login') {
//       // 设置请求头
//       const AUTH_TOKEN = localStorage.getItem('token')
//       config.headers.Authorization = AUTH_TOKEN
//     }
//     return config
//   }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error)
//   })
//   // 添加响应拦截器
//   instance.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//     console.log(response)
//     return response
//   }, function (error) {
//   // 对响应错误做点什么
//     return Promise.reject(error)
//   })

//   // // 4. 添加实例方法
//   // Vue.prototype.$http = instance
// }

export default instance
