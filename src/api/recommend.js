import axios from 'axios'

export function getRecommend(page) {
  const url = '/m_v1/statics/getzx.htm?topicId=1165&pageNum=' + page
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
