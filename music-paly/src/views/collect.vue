<template>
<div class="main">
  <div id="top-myths-icon" >
    <font-awesome-icon icon="pastafarianism" />
    <font-awesome-icon class="collect" icon="user-astronaut" @click="goCollectPage()" />
  </div>
  <div id="title">我的收藏</div>
  <ul id="collect-list">
    <li v-for="(song, index) in list" :key="song.cur_count" @click="getSongMid(song.songmid, index)">
      <div class="index">{{index + 1}}</div>
      <div class="song-detail">
        <p id="song-name">{{song.songname}}</p>
        <p v-for="singer in song.singer" :key="singer.name">/{{singer.name}}</p>
        <p>- {{song.albumname}}</p>
        <font-awesome-icon icon="trash-alt" />
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
    }
  },
  created () {
    this.getCollect()
  },
  destroyed () {
  }
}
</script>

<style lang='scss' scoped>
.main {
  min-height: 100vh;
}
#collect-list {
  width: 100%;
}
#title {
  margin: 0 30px 10px;
  border: 1px solid #000000;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 30px;
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
