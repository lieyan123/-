import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'http://localhost:3000/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'http://localhost:3000/gettoken',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'http://localhost:3000/logout',
    method: 'post'
  })

}

export const getUsersData = () => {
  return axios.request({
    url: 'http://localhost:3000/users/getUsersData',
    method: 'get'
  })
}

export const getCustomersData = () => {
  return axios.request({
    url: 'http://localhost:3000/users/getCustomersData',
    method: 'get'
  })
}

export const banUser = (id,state) => {
  return axios.request({
    url: 'http://localhost:3000/users/banUser',
    params: {
      id,
      state
    },
    method: 'get'
  })
}


export const banUserList = (list) => {
  return axios.request({
    url: 'http://localhost:3000/users/banUserList',
    params: {
      list
    },
    method: 'get'
  })
}

export const openUserList = (list) => {
  return axios.request({
    url: 'http://localhost:3000/users/openUserList',
    params: {
      list
    },
    method: 'get'
  })
}
