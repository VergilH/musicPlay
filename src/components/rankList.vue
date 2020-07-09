<template>
<div class="main">
  <div id="top-myths-icon" >
    <font-awesome-icon icon="pastafarianism" />
    <font-awesome-icon class="collect" icon="user-astronaut" @click="goCollectPage()" />
  </div>
  <loading v-show="!list.length"></loading>
  <div class="main-out">
    <h4>官方推荐歌单</h4>
    <div class="main-rank" v-for="(item) in list" :key="item.total" @click="getMusicListDetail(item.id)">
      <img v-lazy="item.picUrl" alt="">
      <div class="main-rank-list">
        <ul v-for="(item, index) in item.songList" :key="item.name">
          <span>{{index + 1}}.{{item.songname}}</span>
          <span>- {{item.singername}}</span>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import loading from './loading.vue'
import { getMusicRank, getRankDetail } from '../apis/rank.js'
export default {
  name: 'ranklist',
  components: {
    loading
  },
  data () {
    return {
      list: [],
      isLoading: true
    }
  },
  methods: {
    _getMusicRank () {
      this.isLoading = true
      getMusicRank().then((res) => {
        console.log(res)
        this.list = res.data.topList
      })
      this.isLoading = false
    },
    getMusicListDetail: function (id) { // 点击先获取点击元素的排行榜id
      let topid = id // 榜单id
      this.$router.push({
        path: `/rank/rankdetail/${topid}`
      })
    },
    goCollectPage () {
      this.$router.push({
        path: `/collect`
      })
    },
    getMusicRank2 () { // 获取排行榜单
      let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
      let data = {
        g_tk: 1928093487,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        uin: 0,
        needNewCode: 1,
        callbackQuery: 'jsonpCallback'
      }
      const opts = {
        param: 'jsonpCallback',
        prefix: 'playlistinfoCallback'
      }
      this.$jsonp(url, data, opts).then((res) => { // QQapi
        console.log(res)
        /* let num1 = res.data.indexOf('(') // 截取第一个（所在位置
        let num2 = res.data.lastIndexOf(')') // 截取倒数第一个）所在位置
        let resultData = JSON.parse(res.data.substring(num1 + 1, num2)) // 对jsonp字符串转化为json
        // console.log(resultData.data.topList)
        let list = resultData.data.topList // 赋值
        return list */
      })
      this.$jsonp(`https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg`, {
        callbackQuery: 'jsonpCallback',
        // 指定回调的查询字符串的名称（默认callback）,后端可能自定义，比如当前案例约定的是jsonpcallback
        callbackName: 'jsonpFunc' // 回调函数方法名称
      }).then(res => {
        console.log(res)
        console.log('success')
      })
    }
  },
  created () {
  },
  mounted () {
    this._getMusicRank()
    // this.getMusicRank2()
  },
  destroyed () {
  }
}
</script>

<style lang='scss' scoped>
.main {
  width: 100%;
}
.main-out {
  width: 100%;
  background-color: #222;
  overflow: hidden;
}
h4 {
  margin: 0;
  color: #fff;
}
.main-inner {
  flex: 1;
}
img {
  flex: 0;
  width: 100px;
  height: 100px;
  border-radius: 10px 0 0 10px;
}
.main-rank {
  display: flex;
  padding: 20px 20px 0 20px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.main-rank-list {
  flex: 1;
  padding: 10px 0 10px 15px;
  min-width: 0;
  border-radius: 0 10px 10px 0;
  box-sizing: border-box;
  background-color: #888;
  ul {
    margin: 0;
    padding: 0;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 26.6px;
    font-size: 14px;
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #fff;
    }
  }
}
</style>
