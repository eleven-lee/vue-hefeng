import axios from 'axios'

export function getCategorylist() {
  const url = '/api/category/categoriesOfMall.do?depotId=343651486779183110'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  }
)
}
