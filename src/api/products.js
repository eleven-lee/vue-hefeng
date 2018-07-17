import axios from 'axios'
import {commonParams} from './config'

export function getProductList(categoryId, value) {
  const url = '/api//product/searchProductsOfMall.do'

  const datas = Object.assign({}, commonParams, {
    data: {
      categoryId: categoryId,
      sort: 'SALES_VOLUME_DESC',
      fields: [
        {
          field: 'brand',
          value: value
        }
      ]
    }
  })
  return axios.get(url, {
    params: datas
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
