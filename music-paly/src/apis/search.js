import axios from 'axios'
import {
  commonParams,
  opts
} from '@/apis/default.js'

export function getHotKey () { // 热门搜索数据
  let url = '/api/splcloud/fcgi-bin/gethotkey.fcg'
  let data = {
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1
  }
  axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res)
  })
}

export function search () { // 检索关键词
  let url = 'api/soso/fcgi-bin/search_for_qq_cp'
  let data = {
    w: '林俊杰', // 关键词
    p: 10, // 分页：默认10
    n: 10 // 请求数量：默认10
  }
  axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res)
  })
}
