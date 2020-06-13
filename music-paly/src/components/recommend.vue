<template>
<div>
  <titleComponent></titleComponent>
  <div class="main-inner">
    <h4>热门歌单推荐</h4>
    <ul>
      <li class="main-list" v-for="list in lists" :key="list.re" @click="goMusicPage(list.dissid)">
        <img v-lazy="list.imgurl">
        <div class="list-text">
          <span class="list-detail">{{list.dissname}}</span>
          <span class="list-detail">创建者:{{list.creator.name}}</span>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import titleComponent from './titleComponent.vue'
import { getList } from '@/apis/songs.js'
export default {
  name: 'songs',
  components: {
    titleComponent
  },
  data () {
    return {
      lists: [],
      isDisplay: true
    }
  },
  methods: {
    getSongs: function () {
      let params = { // eslint-disable-line no-unused-vars
        g_tk: 1928093487,
        disstid: 2054427046,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0
      }
      let url = '/api/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?g_tk=1928093487&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&disstid=2054427046&type=1&json=1&utf8=1&onlysong=0&platform=yqq&hostUin=0&needNewCode=0&jsonpCallback=playlistinfoCallback' // 推荐列表详细内容，后续页面使用
      this.$axios.get(url).then((res) => {
        console.log(res)
        let num1 = res.data.indexOf('(') // 截取第一个（所在位置
        let num2 = res.data.lastIndexOf(')') // 截取倒数第一个）所在位置
        let resultData = JSON.parse(res.data.substring(num1 + 1, num2)) // eslint-disable-line no-unused-vars
        console.log(resultData)
      })
    },
    _getList: function () { // 推荐列表数据
      getList().then((res) => {
        console.log(res)
        this.lists = res.data.list
      })
    },
    goMusicPage (id) { // 路由传参到详情页
      // console.log(dissid)
      this.$router.push({
        path: `/songs/recommendlist/${id}`
      })
    }
  },
  created () {
    this._getList()
  }
}
</script>

<style lang='scss' scoped>
.main-out {
  width: 100%;
  overflow: hidden;
}
.main-inner {
  flex: 1;
  background-color: #222;
  color: #fff;
}
h4 {
  margin: 0;
}
img {
  flex: 0;
  width: 100px;
  height: 100px;
  border-radius: 10px 0 0 10px;
}
ul {
  margin: 0;
  padding: 0;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 26.6px;
  font-size: 14px;
}
.main-list {
  list-style-type: none;
  display: flex;
  padding: 20px 20px 0 20px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.list-text {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px 0 10px 15px;
  min-width: 0;
  border-radius: 0 10px 10px 0;
  box-sizing: border-box;
  background-color: #888;
}
.list-detail {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
