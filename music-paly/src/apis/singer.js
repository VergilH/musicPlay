import axios from 'axios'
import {
  commonParams,
  opts
} from '@/apis/default.js'

export function getSinger () { // 歌手列表
  let url = '/api/v8/fcg-bin/v8.fcg'
  let data = {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 1576475597,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  }
  axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res)
  })
}
