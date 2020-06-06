<template>
<div>
  <div>
    <img v-bind:src='url+singermid+url2'>
  </div>
</div>
</template>

<script>
import { getSingerDetail } from '../apis/singer.js'
export default {
  name: 'singerdetail',
  data () {
    return {
      singermid: '',
      singerDetail: '',
      singerList: [],
      url: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000',
      url2: '.jpg?max_age=2592000'
    }
  },
  methods: {
    _getSingerDetail () {
      let singermid = this.$route.params.id
      getSingerDetail(singermid).then((res) => {
        console.log(res)
        this.singermid = res.data.data.singer_mid
        console.log(res.data.data.singer_mid)
        this.singerDetail = res.data.data
        this.singerList = res.data.data.list
      })
    }
  },
  created () {
    this._getSingerDetail()
  },
  destroyed () {

  }
}
</script>

<style lang="scss" scoped>
</style>
