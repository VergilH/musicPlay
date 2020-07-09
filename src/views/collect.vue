<template>
<div class="main">
  <div id="top-myths-icon" >
    <font-awesome-icon icon="chevron-left" class="back-btn" @click="$router.back(-1)" />
    <font-awesome-icon icon="pastafarianism" />
    <font-awesome-icon class="collect" icon="user-astronaut" @click="goCollectPage()" />
  </div>
  <div id="title">我的收藏</div>
  <div id="hidden-tip" v-if="!list.length">暂无收藏</div>
  <ul id="collect-list">
    <li v-for="(song, index) in list" :key="song.cur_count"> <!--  @click="getSongMid(song.songmid, index)" -->
      <div class="index">{{index + 1}}</div>
      <div class="song-detail">
        <p id="song-name">{{song.songname}}</p>
        <p v-for="singer in song.singer" :key="singer.name">/{{singer.name}}</p>
        <p>- {{song.albumname}}</p>
        <font-awesome-icon icon="trash-alt" @click="deleteCollect(index)" />
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'collect',
  components: {
  },
  data () {
    return {
      list: Array
    }
  },
  methods: {
    getCollect () { // 获取本地收藏数据
      let list = JSON.parse(localStorage.getItem('collectList')) || []
      this.list = list
    },
    deleteCollect (index) { // 删除收藏内容
      let list = JSON.parse(localStorage.getItem('collectList')) || []
      list.splice(index, index + 1)
      this.list = list
      window.localStorage.setItem('collectList', JSON.stringify(list))
    },
    getSongMid (songmid, index) { // 路由跳转至播放器页面
      window.sessionStorage.setItem('playList', JSON.stringify(this.songList)) // 播放列表
      let mid = songmid
      let i = index
      this.$router.push({
        path: `/player`,
        query: {
          songmid: mid,
          index: i
        }
      })
    }
  },
  created () {
    this.getCollect()
  },
  watch: {
    '$route': { // 监听路由地址，路由变化则调动方法
      handler (route) {
        if (route.name === 'collect') {
          this.getCollect()
        }
      }
    }
  },
  destroyed () {
  }
}
</script>

<style lang='scss' scoped>
.main {
  min-height: 100vh;
  background-color: #222;
}
#collect-list {
  width: 100%;
}
#hidden-tip {
  color: #fff;
  font-size: 18px;
  text-align: center;
}
#title {
  margin: 0 30px 10px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 30px;
  background-color: #888;
  color: #33cc99;
  text-align: center;
}
li {
  display: flex;
  width: 100%;
  height: 60px;
  text-align: left;
  list-style: none;
  .index {
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #33CC99;
  }
  .song-detail {
    flex: 1;
    width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  p {
    position: relative;
    left: -4px;
    display: inline-block;
    font-size: 12px;
    line-height: 30px;
    color: #999;
  }
}
#song-name {
  position: relative;
  left: 0;
  display: block;
  white-space: normal;
  font-size: 14px;
  color: #fff;
}
</style>
