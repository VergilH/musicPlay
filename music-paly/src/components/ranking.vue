<template>
<div>
  <titleComponent></titleComponent>
  <div class="main-out">
    <div class="main-rank" v-for="(item) in list" :key="item.total" @click="goMusicListDetail(item.id)">
      <img v-bind:src="item.picUrl" alt="">
      <div class="main-rank-list">
        <ul v-for="(item, index) in item.songList" :key="item.name">
          <span>{{index + 1}}{{item.songname}}</span>
          <span>- {{item.singername}}</span>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import titleComponent from './titleComponent.vue'
export default {
  name: 'rank',
  components: {
    titleComponent
  },
  data () {
    this.$axios.get('/api/v8/fcg-bin/fcg_myqq_toplist.fcg').then((res) => { // QQapi
      console.log(res)
      let num1 = res.data.indexOf('(') // 截取第一个（所在位置
      let num2 = res.data.lastIndexOf(')') // 截取倒数第一个）所在位置
      let resultData = JSON.parse(res.data.substring(num1 + 1, num2)) // 对jsonp字符串转化为json
      console.log(resultData.data.topList)
      this.list = resultData.data.topList // 赋值
    })
    return {
      title: '11111',
      list: []
    }
  },
  methods: {
    goMusicListDetail: function (id) { // 点击先获取点击元素的排行榜id
      let topid = id
      this.$axios.get('/api/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=' + topid + '&_=1520777874472').then((res) => { // QQapi 修改topid即可
        console.log(res)
      })
    }
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
}
img {
  flex: 0;
  width: 100px;
  height: 100px;
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
  box-sizing: border-box;
  background-color: #F5F5F5;
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
    }
  }
}
</style>
