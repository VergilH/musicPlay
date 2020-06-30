<template>
<div class="main">
  <div class="main">
    <span id="back-btn" @click="$router.back(-1)"><font-awesome-icon icon="chevron-left" /></span>
    <div id="main-top">
      <img :src="logo">
      <div id="list-title">
        <p id="title">{{cdList.dissname}}</p>
        <span id="creator">
          <img :src="cdList.headurl">
          <p>{{cdList.nickname}}</p>
        </span>
        <p id="desc">{{cdList.desc}}</p>
      </div>
    </div>
    <ul>
      <loading v-show="isLoading"></loading>
      <li v-for="(song, index) in songList" :key="song.id">
        <div class="index" @click="getSongMid(song.songmid, index)">{{index + 1}}</div>
        <div id="like" @click="addCollect(song)">
          <span class="red" v-if="redHeart(song.songmid)">
            <font-awesome-icon icon="heart" />
          </span>
          <span v-else>
            <font-awesome-icon :icon="['far', 'heart']" />
          </span>
        </div>
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
import { getSongs } from '@/apis/songs.js'
import loading from './loading.vue'
export default {
  name: 'recommendList',
  components: {
    loading
  },
  data () {
    let id = this.$route.params.id // 接收路由参数
    this.disstid = id
    console.log(id)
    return {
      disstid: '',
      logo: '',
      cdList: '',
      songList: [],
      songmid: Array,
      isLoading: Boolean
    }
  },
  methods: {
    _getSongs () { // 歌单内容
      this.isLoading = true
      let id = this.$route.params.id
      getSongs(id).then((res) => {
        this.logo = res.cdlist[0].logo
        this.cdList = res.cdlist[0]
        this.songList = res.cdlist[0].songlist
        this.updataCollect()
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
      })
    },
    addCollect (song) { // 添加到收藏夹
      let older = JSON.parse(localStorage.getItem('collectList')) || [] // 先读取 无数据时值为null 不可用push()方法
      older.push(song)
      window.localStorage.setItem('collectList', JSON.stringify(older))
      this.updataCollect()
    },
    updataCollect () { // 更新收藏内容渲染，需要及时更新
      let a = []
      let older = JSON.parse(localStorage.getItem('collectList')) || []
      for (var i = 0; i < older.length; i++) {
        if (JSON.stringify(this.songList).indexOf(JSON.stringify(older[i])) > -1) {
          a.push(older[i].songmid) // 获取到需要渲染的歌曲
        }
      }
      this.songmid = a
      console.log(a) // 转换成字符串判断是否含有相同数据
    },
    redHeart (id) {
      let mid = id
      if (this.songmid.indexOf(mid) === -1) {
        return false
      } else {
        return true
      }
    }
  },
  created () {
    this._getSongs()
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  background-color: #222;
  color: #fff;
}
#back-btn {
  position: absolute;
  left: 10px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
}
#main-top {
  display: flex;
  padding: 40px 20px 40px;
  width: 100%;
  box-sizing: border-box;
  background-color: #999;
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
ul {
  position: relative;
  bottom: 20px;
  padding-top: 10px;
  border-radius: 20px 20px 0 0;
  box-sizing: border-box;
  background-color: #222;
}
li {
  position: relative;
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
  #like {
    z-index: 100;
    position: absolute;
    right: 20px;
    width: 30px;
    line-height: 60px;
    text-align: center;
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
.red {
  color: #FF253A;
}
</style>
