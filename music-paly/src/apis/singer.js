import axios from 'axios'
import {
  commonParams,
  opts
} from '@/apis/default.js'

export function getSinger () { // 歌手列表
  let url = '/api/v8/fcg-bin/v8.fcg'
  let data = {
    g_tk: 1928093487,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res)
    return res
  })
}

export function getSingerDetail (singermid) { // 歌手详情列表
  let url = '/api/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  let data = {
    g_tk: 1576475597,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    singermid: '002J4UUk29y8BY'
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res)
    return res
  })
}
