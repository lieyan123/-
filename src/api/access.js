import axios from '@/libs/api.request'

export const getAccessData = () => {
    return axios.request({
      url: 'http://localhost:3000/users/getAccessData',
      method: 'get'
    })
  }