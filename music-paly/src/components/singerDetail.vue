<template>
<div class="main">
  <span id="back-btn" @click="$router.back(-1)"><font-awesome-icon icon="chevron-left" /></span>
  <div id="top-img" v-bind:style="{backgroundImage: 'url('+url+singermid+url2+')'}"></div>
  <div class="content">
    <ul>
      <li v-for="(song, index) in singerList" :key="song.id" @click="getSongMid(song.songmid, index)">
        <div class="index">{{index + 1}}</div>
        <div class="song-detail">
          <p id="song-name">{{song.songname}}</p>
          <p v-for="singer in song.singer" :key="singer.name">/{{singer.name}}</p>
          <p>-  {{song.albumname}}</p>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { getSingerDetail } from '../apis/singer.js'
export default {
  name: 'singerdetail',
  data () {
    return {
      singermid: '',
      singerDetail: '',
      singerList: [],
      url: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000',
      url2: '.jpg?max_age=2592000'
    }
  },
  methods: {
    _getSingerDetail () {
      let singermid = this.$route.params.id
      getSingerDetail(singermid).then((res) => {
        console.log(res)
        this.singermid = res.data.data.singer_mid
        this.singerDetail = res.data.data
        let list = []
        for (let i = 0; i < res.data.data.list.length; i++) { // 重排数据格式
          list.push(res.data.data.list[i].musicData)
        }
        this.singerList = list
        console.log(list)
      })
    },
    getSongMid (songmid, index) { // 路由跳转至播放器页面
      window.sessionStorage.setItem('playList', JSON.stringify(this.singerList)) // 播放列表
      let mid = songmid
      let i = index
      this.$router.push({
        path: `/player`,
        query: {
          songmid: mid,
          index: i
        }
        // path: `/player/${mid}`
      })
    }
  },
  created () {
    this._getSingerDetail()
  },
  destroyed () {

  }
}
</script>

<style lang="scss" scoped>
#top-img {
  position: relative;
  width: 100%;
  height: 280px;
  background: center no-repeat;
  background-size: cover;
}
#back-btn {
  z-index: 10;
  position: absolute;
  left: 10px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
}
.content {
  position: relative;
  bottom: 20px;
  padding-top: 10px;
  width: 100%;
  border-radius: 20px 20px 0 0;
  box-sizing: border-box;
  background-color: #222;
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
