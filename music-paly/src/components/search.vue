<template>
<div>
  <div id="search-btn">这是搜索按钮</div>
  <span class="hot-key" v-for="key in hotKey" :key="key.w">
    {{key.k}}
  </span>
</div>
</template>

<script>
import { getHotKey, search } from '../apis/search.js'
export default {
  name: 'search',
  data () {
    return {
      hotKey: []
    }
  },
  methods: {
    getSearchHotKey: function () { // 热门搜索
      getHotKey().then((res) => { // 获取外部js返回数据
        this.hotKey = res.data.data.hotkey
        console.log(this.hotKey)
      })
    },
    getSearch () { // 搜索关键词
      search()
    }
    /* this.hotKey = res.data.data */
  },
  created () {
    this.getSearch()
    this.getSearchHotKey()
  }
}
</script>

<style lang="scss" scoped>
#search-btn {
  margin: 20px auto;
  width: 100%;
}
.hot-key {
  float: left;
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
  border: 1px solid #000000;
  border-radius: 4px;
  line-height: 16px;
  box-sizing: border-box;
}
</style>
