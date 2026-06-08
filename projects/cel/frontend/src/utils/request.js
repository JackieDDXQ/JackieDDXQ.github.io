
import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000
})

request.interceptors.response.use(
  response => {
    if (response.data.code === 200) {
      return response.data
    } else {
      return Promise.reject(response.data.message)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
