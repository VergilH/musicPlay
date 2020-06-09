<template>
<div>
  <div id="top-img" v-bind:style="{backgroundImage: 'url('+url+singermid+url2+')'}"></div>
  <div class="content">
    <ul>
      <li v-for="(song, index) in singerList" :key="song.id">
        <div class="index">{{index + 1}}</div>
        <div class="song-detail">
          <p id="song-name">{{song.musicData.songname}}</p>
          <p v-for="singer in song.musicData.singer" :key="singer.name">/{{singer.name}}</p>
          <p>-  {{song.musicData.albumname}}</p>
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
        console.log(res.data.data)
        this.singermid = res.data.data.singer_mid
        console.log(res.data.data.singer_mid)
        this.singerDetail = res.data.data
        this.singerList = res.data.data.list
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
