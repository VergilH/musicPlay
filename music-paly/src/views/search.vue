<template>
<div class="main">
  <titleComponent></titleComponent>
  <div id="search-btn">
    <input type="text" placeholder="搜索" v-model="key" @click="getKey()" maxlength="20">
  </div>
  <div class="hot-key">
    <p>热门搜索</p>
    <span v-for="key in hotKey.slice(0, 6)" :key="key.w" @click="getKey(key.k)">
      {{key.k}}
    </span>
  </div>
  <div class="result" v-for="song in searchRes" :key="song.id">
    <p>{{song.songname}}</p>
    <span v-for="singer in song.singer" :key="singer.name" class="singer-album-name">/{{singer.name}}</span>
    <p class="singer-album-name">- {{song.albumname}}</p>
  </div>
</div>
</template>

<script>
import titleComponent from '../components/titleComponent.vue'
import { getHotKey, search } from '../apis/search.js'
export default {
  name: 'search',
  components: {
    titleComponent
  },
  data () {
    return {
      hotKey: [],
      key: '',
      timeout: null,
      searchRes: []
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
      let key = this.key // 对参数赋值
      search(key).then((res) => {
        console.log(res.data)
        let num1 = res.data.indexOf('(') // 截取第一个（所在位置
        let num2 = res.data.lastIndexOf(')') // 截取倒数第一个）所在位置
        let resultData = JSON.parse(res.data.substring(num1 + 1, num2)) // eslint-disable-line no-unused-vars
        console.log(resultData.data.song.list)
        this.searchRes = resultData.data.song.list
      })
    },
    getKey (key) {
      console.log(key)
      search(key).then((res) => {
        let num1 = res.data.indexOf('(') // 截取第一个（所在位置
        let num2 = res.data.lastIndexOf(')') // 截取倒数第一个）所在位置
        let resultData = JSON.parse(res.data.substring(num1 + 1, num2)) // eslint-disable-line no-unused-vars
        console.log(resultData.data.song.list)
        this.searchRes = resultData.data.song.list
      })
    }
  },
  watch: {
    key (cur, old) { // 监听input触发请求
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        search(cur).then((res) => {
          console.log(res.data)
          let num1 = res.data.indexOf('(') // 截取第一个（所在位置
          let num2 = res.data.lastIndexOf(')') // 截取倒数第一个）所在位置
          let resultData = JSON.parse(res.data.substring(num1 + 1, num2)) // eslint-disable-line no-unused-vars
          console.log(resultData.data.song.list)
          this.searchRes = resultData.data.song.list
        })
      }, 600)
    }
  },
  created () {
  },
  mounted () {
    this.getSearchHotKey()
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
.main {
  min-height: 100vh;
  background-color: #222;
  color: #fff;
}
input{
  outline-style: none;
  border: 1px solid #646464;
  border-radius: 5px;
  padding: 8px 10px;
  width: 85%;
  background-color: #646464;
  font-size: 16px;
  color: #33cc99;
}
#search-btn {
  margin: 20px auto;
  width: 100%;
}
.hot-key {
  margin: 0 15px;
  overflow: auto;
  text-align: left;
  span {
    float: left;
    display: inline-block;
    margin: 5px;
    padding: 5px 10px;
    border-radius: 4px;
    line-height: 14px;
    box-sizing: border-box;
    background-color: #646464;
    font-size: 14px;
  }
}
.result {
  margin: 0 15px;
  padding: 5px 0;
  border-bottom: 1px solid #000;
  line-height: 20px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  .singer-album-name {
    position: relative;
    left: -4px;
    display: inline-block;
    font-size: 12px;
    line-height: 30px;
    color: #999;
  }
}
</style>
