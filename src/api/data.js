import axios from '@/libs/api.request'



export const deleteTableData = (id) => {
  return axios.request({
    url: 'http://localhost:3000/deleteTableData',
    params: {
      id
    },
    method: 'get'
  })
}

export const deleteTableList = (list) => {
  return axios.request({
    url: 'http://localhost:3000/deleteTableList',
    params: {
      list
    },
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'http://localhost:3000/GetList',
    method: 'get'
  })
}
