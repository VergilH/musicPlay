<template>
<div class="main">
  <div id="top-myths-icon" >
    <font-awesome-icon icon="pastafarianism" />
    <font-awesome-icon class="collect" icon="user-astronaut" @click="goCollectPage()" />
  </div>
  <titleComponent></titleComponent>
  <loading v-show="!lists.length"></loading>
  <div class="main-out">
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
</div>
</template>

<script>
import titleComponent from './titleComponent.vue'
import loading from './loading.vue'
import { getList } from '@/apis/songs.js'
export default {
  name: 'songs',
  components: {
    titleComponent,
    loading
  },
  data () {
    return {
      lists: [],
      isDisplay: true
    }
  },
  methods: {
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
    this._getList()
  },
  destroyed () {
  }
}
</script>

<style lang='scss' scoped>
.main-out {
  width: 100%;
  overflow: hidden;
}
.main-inner {
  width: 100%;
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
  width: 100%;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 26.6px;
  font-size: 14px;
}
.main-list {
  display: flex;
  padding: 20px 20px 0 20px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  list-style-type: none;
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
