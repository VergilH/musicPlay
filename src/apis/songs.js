import axios from 'axios'
import jsonp from './jsonp.js'
import {
  commonParams,
  opts
} from '@/apis/default.js'

export function getList () {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  let data = {
    rnd: Math.random(),
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  }
  return jsonp(url, data, opts)
    .then((res) => {
      return res.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function getSongs (id) {
  let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg' // 推荐列表详细内容，后续页面使用
  let data = { // 参数
    disstid: id,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  }
  return jsonp(url, data, opts).then((res) => {
    let num1 = res.data.indexOf('(') // 截取第一个（所在位置
    let num2 = res.data.lastIndexOf(')') // 截取倒数第一个）所在位置
    let resultData = JSON.parse(res.data.substring(num1 + 1, num2)) // eslint-disable-line no-unused-vars
    console.log(resultData)
    return resultData
  })
}
