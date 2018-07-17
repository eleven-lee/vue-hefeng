import axios from 'axios'

export function getSilder() {
  const url = '/api/sys/init.do?fuseTag=weixin'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
