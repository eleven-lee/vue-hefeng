import axios from 'axios'

export function getSeckill() {
  const url = '/api/index/index.do?globalParams=%7B%22osVersion%22:%225.5.0%22%7D&fuseTag=weixin&addressLat=25.782671464287105&addressLon=113.03560584646391&cityId=275&cityName=%E9%83%B4%E5%B7%9E%E5%B8%82&districtId=8323&districtName=%E5%8C%97%E6%B9%96%E5%8C%BA&provinceId=26&provinceName=%E6%B9%96%E5%8D%97%E7%9C%81&address=%E5%B1%B1%E6%B0%B4%E7%BC%98&depotId=343651486779183110&warehouseDepotId=343651486779183110&userId=&channelCode=1919kuaihe&level=1&userToken=3dce32a6-ac34-4b47-9b57-250a9659058f&data=%7B%22brandMark%22:%22recSlideBar%22%7D'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
