import axios from 'axios'
import {
  commonParams,
  opts
} from '@/apis/default.js'

export function getMusicRank () { // 获取排行榜单
  let url = '/api/v8/fcg-bin/fcg_myqq_toplist.fcg'
  let data = {
    g_tk: 1928093487,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    uin: 0,
    needNewCode: 1
  }
  return axios.get(url, {
    params: data
  }).then((res) => { // QQapi
    console.log(res)
    let num1 = res.data.indexOf('(') // 截取第一个（所在位置
    let num2 = res.data.lastIndexOf(')') // 截取倒数第一个）所在位置
    let resultData = JSON.parse(res.data.substring(num1 + 1, num2)) // 对jsonp字符串转化为json
    // console.log(resultData.data.topList)
    let list = resultData.data.topList // 赋值
    return list
  })
}

export function getRankDetail (topid) { // 榜单详细内容
  let url = '/api/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  let data = {
    g_tk: 1928093487,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    hostUin: 0,
    platform: 'h5',
    needNewCode: 1,
    order: 'listen',
    begin: 0,
    uin: 0,
    num: 100,
    songstatus: 1,
    type: 'top',
    tpl: 3,
    page: 'detail',
    topid: topid // 从实例获取
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res)
    return res
  })
}
