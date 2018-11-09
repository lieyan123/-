import axios from '@/libs/api.request'


export const getStore = () => {
    return axios.request({
      url: 'http://localhost:3000/store/getStore',
      method: 'get'
    })
  }

  export const getProduct = () => {
    return axios.request({
      url: 'http://localhost:3000/store/getProduct',
      method: 'get'
    })
  }

  export const getSuppliersData = () => {
    return axios.request({
      url: 'http://localhost:3000/store/getSuppliersData',
      method: 'get'
    })
  }


  export const getStoreProduct = (id) => {
    return axios.request({
      url: 'http://localhost:3000/store/getStoreProduct',
      params: {
        id
      },
      method: 'get'
    })
  }

  export const insertProduct = (name,description) => {
    return axios.request({
      url: 'http://localhost:3000/store/insertProduct',
      params: {
        name,
        description
      },
      method: 'get'
    })
  }

  export const submitForm = (operaterid,supplierid,Intime,tabledata) => {
    return axios.request({
      url: 'http://localhost:3000/store/submitForm',
      params: {
        operaterid,
        supplierid,
        Intime,
        tabledata
      },
      method: 'get'
    })
  }

  export const getProductGroup = (userid) => {
    return axios.request({
      url: 'http://localhost:3000/store/getProductGroup',
      params: {
        userid
      },
      method: 'get'
    })
  }



  export const getGroupdetails = (groupid) => {
    return axios.request({
      url: 'http://localhost:3000/store/getGroupdetails',
      params: {
        groupid
      },
      method: 'get'
    })
  }

  export const importProduct = (groupid,storeid) => {
    return axios.request({
      url: 'http://localhost:3000/store/importProduct',
      params: {
        groupid,
        storeid
      },
      method: 'get'
    })
  }



