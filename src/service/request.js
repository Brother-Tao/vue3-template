import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 30000
})

// 请求拦截
request.interceptors.request.use(
  (config) => {

    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
