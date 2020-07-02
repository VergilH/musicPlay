<template>
<div class="main">
  <div class="main">
    <div id="top-img" v-bind:style="{backgroundImage: 'url('+ topImgUrl +')'}">
      <span id="back-btn" @click="$router.back(-1)">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </span>
      <topbackbtn></topbackbtn>
    </div>
    <ul>
      <loading v-show="!songList.length"></loading>
      <li v-for="(song, index) in songList" :key="song.cur_count" @click="getSongMid(song.songmid, index)">
        <div class="index">{{index + 1}}</div>
        <div class="song-detail">
          <p id="song-name">{{song.songname}}</p>
          <p v-for="singer in song.singer" :key="singer.name">/{{singer.name}}</p>
          <p>- {{song.albumname}}</p>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { getRankDetail } from '../apis/rank.js'
import loading from './loading.vue'
import topbackbtn from './topbackbtn.vue'
export default {
  name: 'rankListDetail',
  components: {
    loading,
    topbackbtn
  },
  data () {
    let id = this.$route.params.id // 接收路由参数
    this.disstid = id
    return {
      disstid: '',
      songList: [],
      title: '',
      topImgUrl: '',
      isLoading: Boolean
    }
  },
  methods: {
    getMusicListDetail () { // 点击先获取点击元素的排行榜id
      this.isLoading = true
      let topid = this.$route.params.id // 榜单id
      getRankDetail(topid).then((res) => { // 修改topid即可
        this.title = res.data.topinfo.ListName
        this.topImgUrl = res.data.topinfo.pic_v12
        let newList = []
        for (let i = 0; i < res.data.songlist.length; i++) { // 调整数据格式
          newList.push(res.data.songlist[i].data)
        }
        console.log(newList)
        this.songList = newList
        this.isLoading = false
      })
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
        // path: `/player/${mid}`
      })
    }
  },
  created () {
    this.getMusicListDetail()
  },
  destroyed () {
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
  height: 280px;
  background: center no-repeat;
  background-size: cover;
  color: #fff;
  #back-btn {
    position: absolute;
    left: 10px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
  }
  p {
    line-height: 40px;
    font-size: 20px;
    font-weight: 1000;
  }
}
ul {
  position: relative;
  bottom: 20px;
  padding-top: 10px;
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
