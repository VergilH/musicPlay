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
      <div class="title-img">
        <img v-lazy="item.picUrl" alt="">
      </div>
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
      list: []
    }
  },
  methods: {
    _getMusicRank () {
      getMusicRank().then((res) => {
        this.list = res.data.topList
      })
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
.title-img {
  flex: 0;
  width: 100px;
  height: 100px;
  border-radius: 10px 0 0 10px;
}
img {
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
