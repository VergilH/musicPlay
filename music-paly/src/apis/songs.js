import axios from 'axios'
import {
  commonParams,
  opts
} from '@/apis/default.js'

export function getList () {
  let url = '/api/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  let data = Object.assign({}, commonParams, {
    rnd: Math.random(),
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  })
  return axios.get(url, {
    params: data
  })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}
