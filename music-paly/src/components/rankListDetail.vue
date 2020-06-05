<template>
<div>
  <div class="main">
    <div id="top-img" v-bind:style="{backgroundImage: 'url('+ topImgUrl +')'}">
      <span id="back-btn" @click="$router.back(-1)">返回</span>
      <p>{{title}}</p>
    </div>
    <ul>
      <li v-for="(song, index) in songList" :key="song.cur_count">
        <div class="index">{{index + 1}}</div>
        <div class="song-detail">
          <p id="song-name">{{song.data.songname}}</p>
          <p v-for="singer in song.data.singer" :key="singer.name">/{{singer.name}}</p>
          <p>- {{song.data.albumname}}</p>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { getRankDetail } from '../apis/rank.js'
export default {
  name: 'rankListDetail',
  data () {
    let id = this.$route.params.id // 接收路由参数
    this.disstid = id
    return {
      disstid: '',
      songList: [],
      title: '',
      topImgUrl: ''
    }
  },
  methods: {
    getMusicListDetail () { // 点击先获取点击元素的排行榜id
      let topid = this.$route.params.id // 榜单id
      getRankDetail(topid).then((res) => { // 修改topid即可
        console.log(res)
        this.songList = res.data.songlist
        this.title = res.data.topinfo.ListName
        this.topImgUrl = res.data.topinfo.pic_v12
      })
    }
  },
  created () {
    this.getMusicListDetail()
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  background-color: #222;
}
#top-img {
  position: relative;
  width: 100%;
  height: 260px;
  background: center no-repeat;
  background-size: cover;
  #back-btn {
    position: absolute;
    top: 5px;
    left: 10px;
  }
  p {
    line-height: 40px;
    font-size: 20px;
    font-weight: 1000;
  }
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
