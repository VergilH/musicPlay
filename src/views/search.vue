<template>
<div class="main">
  <div id="top-myths-icon" >
    <font-awesome-icon icon="pastafarianism" />
    <font-awesome-icon class="collect" icon="user-astronaut" @click="goCollectPage()" />
  </div>
  <div id="search-btn">
    <input type="text" placeholder="搜索" spellcheck="false" v-model="key" @click="getKey()" maxlength="20">
  </div>
  <div class="hot-key">
    <p>热门搜索</p>
    <span v-for="key in hotKey.slice(0, 6)" :key="key.w" @click="getKey(key.k)">
      {{key.k}}
    </span>
  </div>
  <loading v-show="isLoading"></loading>
  <div class="result" v-for="(song, index) in searchRes" :key="song.id" @click="getSongMid(song.songmid, index)">
    <p>{{song.songname}}</p>
    <span v-for="singer in song.singer" :key="singer.name" class="singer-album-name">/{{singer.name}}</span>
    <p class="singer-album-name">- {{song.albumname}}</p>
  </div>
</div>
</template>

<script>
import loading from '../components/loading.vue'
import { getHotKey, search } from '../apis/search.js'
export default {
  name: 'search',
  components: {
    loading
  },
  data () {
    return {
      hotKey: [],
      key: '',
      timeout: null,
      searchRes: [],
      theSong: Array,
      isLoading: false
    }
  },
  methods: {
    getSearchHotKey: function () { // 热门搜索
      getHotKey().then((res) => { // 获取外部js返回数据
        this.hotKey = res.data.hotkey
        console.log(this.hotKey)
      })
    },
    getSearch () { // 搜索关键词
      let key = this.key // 对参数赋值
      search(key).then((res) => {
        let num1 = res.data.indexOf('(') // 截取第一个（所在位置
        let num2 = res.data.lastIndexOf(')') // 截取倒数第一个）所在位置
        let resultData = JSON.parse(res.data.substring(num1 + 1, num2))
        this.searchRes = resultData.data.song.list
      })
    },
    getKey (key) {
      console.log(key)
      search(key).then((res) => {
        let num1 = res.data.indexOf('(') // 截取第一个（所在位置
        let num2 = res.data.lastIndexOf(')') // 截取倒数第一个）所在位置
        let resultData = JSON.parse(res.data.substring(num1 + 1, num2))
        this.searchRes = resultData.data.song.list
      })
    },
    getSongMid (songmid, index) { // 路由跳转至播放器页面
      window.sessionStorage.setItem('playList', JSON.stringify(this.searchRes)) // 播放列表
      let mid = songmid
      let i = index
      this.$router.push({
        path: `/player`,
        query: {
          songmid: mid,
          index: i
        }
        // path: `/player/${mid}`
      })
    },
    goCollectPage () {
      this.$router.push({
        path: `/collect`
      })
    }
  },
  watch: {
    key (cur, old) { // 监听input触发请求
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.isLoading = true
        search(cur).then((res) => {
          let num1 = res.data.indexOf('(') // 截取第一个（所在位置
          let num2 = res.data.lastIndexOf(')') // 截取倒数第一个）所在位置
          let resultData = JSON.parse(res.data.substring(num1 + 1, num2)) // eslint-disable-line no-unused-vars
          console.log(resultData.data.song.list)
          this.searchRes = resultData.data.song.list
          this.isLoading = false
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
  border: none;
  border-radius: 6px;
  padding: 8px 10px;
  width: 85%;
  background-color: #646464;
  box-sizing: border-box;
  font-size: 16px;
  color: #33cc99;
  animation: myInputOut .5s alternate forwards;
  &:hover {
    animation: myInput .5s alternate forwards;
    /* box-shadow: 2px 2px 1px #33cc99 inset; */
  }
}
@keyframes myInput {
  from { box-shadow: none; }
  to { box-shadow: 0px 0px 5px 2px #323232 inset; }
}
@keyframes myInputOut {
  from { box-shadow: 0px 0px 5px 2px #323232 inset }
  to { box-shadow: none; }
}
#search-btn {
  margin: 0 auto 20px;
  padding: 10px 0;
  width: 100%;
  background-color: #747474;
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
