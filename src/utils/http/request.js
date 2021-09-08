import axios from 'axios'
import { getToken } from '@/utils/cache/cacheAuth'
import { notification } from 'antd'
import { history } from 'umi'
const service = axios.create({
  baseURL: '/api',
  timeout: 6000,
  headers: {
    'content-type': 'application/json'
  }
})

service.interceptors.request.use(config => {
  config.headers.token = getToken()
  return config
})

service.interceptors.response.use(res => {
    if (res.status === 200) {
      return res.data
    } else {
      notification.error({
        message: '提示',
        description: res.data.msg,
      });
      return Promise.reject(res)
    }
  },
  error => {

    let code = 0
    let msg = '系统异常'

    try {
      code = error.response.status
    } catch (e) {
      console.log(e)
    }

    if (code === 401) {
      history.push('/login')
    }

    if (code === 403) {
      history.push('/errorPages?code=403')
    }

    if (code === 404) {
      history.push('/errorPages?code=404')
    }

    if (code === 500) {
      history.push('/errorPages?code=500')
    }

    if (error.response.data.msg) {
      notification.error({
        message: '提示',
        description: error.response.data.msg || msg
      });
    }

    return Promise.reject(error)
  }
)

export default service