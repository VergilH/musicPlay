<template>
<div>
  <div class="main">
    <span @click="$router.back(-1)">返回</span>
   <!-- <div id="main-top">
      <img v-bind:src="logo">
      <div id="list-title">
        <p id="title">{{cdList.dissname}}</p>
        <span id="creator">
          <img v-bind:src="cdList.headurl" alt="">
          <p>{{cdList.nickname}}</p>
        </span>
        <p id="desc">{{cdList.desc}}</p>
      </div>
    </div> -->
    <ul>
      <li v-for="song in songList" :key="song.cur_count">
        <div class="index">{{song.cur_count}}</div>
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
    console.log(id)
    console.log(this.$route.params.imgUrl)
    return {
      disstid: '',
      songList: []
    }
  },
  methods: {
    getMusicListDetail () { // 点击先获取点击元素的排行榜id
      let topid = this.$route.params.id // 榜单id
      getRankDetail(topid).then((res) => { // 修改topid即可
        console.log(res)
        this.songList = res.data.songlist
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
#main-top {
  display: flex;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
}
img {
  flex: 0;
  margin: 0 20px 0 0;
  border-radius: 15px;
  width: 100px;
  height: 100px;
}
#list-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  #title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  #creator {
    display: inline-block;
    margin: 5px 0;
    height: 40px;
    line-height: 40px;
    img {
      display: inline-block;
      margin: 0 10px 0 2px;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      vertical-align: middle;
    }
    p {
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 10px;
    }
  }
  #desc {
    /* display: inline-block; */
    height: 30px;
    font-size: 10px;
    line-height: 15px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
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
