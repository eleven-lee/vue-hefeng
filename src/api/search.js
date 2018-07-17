import axios from 'axios'
import {commonParams} from './config'

export function search(query) {
  const url = '/api/product/searchSuggestWords.do'

  const data = Object.assign({}, commonParams, {
    data: {
      keyword: query
    }
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getHotKey() {
  const url = '/api/product/searchKeyWords.do'

  const data = Object.assign({}, commonParams)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
