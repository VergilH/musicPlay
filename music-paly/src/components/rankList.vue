<template>
<div>
  <titleComponent></titleComponent>
  <div class="main-out">
    <div class="main-rank" v-for="(item) in list" :key="item.total" @click="getMusicListDetail(item.id)">
      <img v-bind:src="item.picUrl" alt="">
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
import titleComponent from './titleComponent.vue'
import { getMusicRank, getRankDetail } from '../apis/rank.js'
export default {
  name: 'rankList',
  components: {
    titleComponent
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    test () {
      getMusicRank().then((res) => {
        console.log(res)
        this.list = res
      })
    },
    getMusicListDetail: function (id) { // 点击先获取点击元素的排行榜id
      let topid = id // 榜单id
      this.$router.push({
        path: `/rank/rankdetail/${topid}`
      })
    }
  },
  created () {
    this.test()
  }
}
</script>

<style lang='scss' scoped>
.main-out {
  width: 100%;
  background-color: #222;
  overflow: hidden;
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
