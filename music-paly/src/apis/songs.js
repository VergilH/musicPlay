import axios from 'axios'
import {
  commonParams,
  opts
} from '@/apis/default.js'

/* export function getList (newData) {
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
  let url = '/api/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg' */ // 推荐列表详细
  /* return this.$axios.get(url, {
    params: data
  })
    .then(function (response) {
      return Promise.resolve(response.data)
    }) */
  /* this.$axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res)
    let newData = res
  })
} */
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

/* export function getSongList (disstid) {
  let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  let data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })
  let opts = Object.assign({}, opts, {
    param: 'jsonpCallback',
    name: 'playlistinfoCallback'
  })
  return jsonp(url, data, opts)
} */
