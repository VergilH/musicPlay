<template>
<div class="main">
  <titleComponent></titleComponent>
  <div id="search-btn">
    <input type="text" placeholder="搜索" v-model="key" @click="getKey()">
    <button @click="getSearch(key)">sousuo</button>
  </div>
  <div class="hot-key" >
    <span v-for="key in hotKey" :key="key.w">
      {{key.k}}
    </span>
  </div>
  <div class="result" v-for="song in searchRes" :key="song.id">
    <p>{{song.songname}}</p>
    <span v-for="singer in song.singer" :key="singer.name">/{{singer.name}}</span>
    <p class="album-name">- {{song.albumname}}</p>
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
    getKey () {
      console.log(this.key)
    }
  },
  created () {
    this.getSearchHotKey()
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #222;
  color: #fff;
}
#search-btn {
  margin: 20px auto;
  width: 100%;
}
.hot-key {
  overflow: auto;
  span {
    float: left;
    display: inline-block;
    margin: 5px;
    padding: 5px 10px;
    border: 1px solid #000000;
    border-radius: 4px;
    line-height: 16px;
    box-sizing: border-box;
  }
}
.result {
  margin: 10px 0;
  border-bottom: 1px solid #000;
  line-height: 16px;
  text-align: left;
  .album-name {
    display: inline-block;
  }
}
</style>
