import axios from 'axios'
import jsonp from './jsonp.js'
import {
  commonParams,
  opts
} from '@/apis/default.js'

export function getHotKey () { // 热门搜索数据
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  let data = {
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1
  }
  return jsonp(url, data, opts).then((res) => {
    return res
  })
}

export function search (key) { // 检索关键词
  let url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  let data = {
    w: key, // 关键词
    p: 10, // 分页：默认10
    n: 10 // 请求数量：默认10
  }
  return jsonp(url, data, opts).then((res) => {
    console.log(res)
    return res
  })
}
