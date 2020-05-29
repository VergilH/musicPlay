<template>
<div>singer</div>
</template>

<script>
import { getSinger } from '../apis/singer.js'
export default {
  name: 'singer',
  data () {
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
    this.$axios.get(url, {
      params: data
    }).then((res) => {
      console.log(res)
      console.log(res.data)
      let num1 = res.data.indexOf('(') // 截取第一个（所在位置
      let num2 = res.data.lastIndexOf(')') // 截取倒数第一个）所在位置
      let resultData = JSON.parse(res.data.substring(num1 + 1, num2)) // eslint-disable-line no-unused-vars
      console.log(resultData.data.list)
    })
    return {
    }
  },
  methods: {
    _getSinger () {
      getSinger()
    }
  },
  created () {
    this._getSinger()
  }
}
</script>

<style>
</style>
