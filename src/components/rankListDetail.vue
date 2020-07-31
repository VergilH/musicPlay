<template>
<div class="main">
  <div class="main">
    <div id="top-img" v-bind:style="{backgroundImage: `url(${topImgUrl})`}">
      <span id="back-btn" @click="$router.back(-1)">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </span>
      <topbackbtn></topbackbtn>
    </div>
    <ul>
      <loading v-show="!songList.length"></loading>
      <li v-for="(song, index) in songList" :key="song.cur_count">
        <div class="index">{{index + 1}}</div>
        <div class="song-detail" @click="getSongMid(song.songmid, index)">
          <p id="song-name">{{song.songname}}</p>
          <p v-for="singer in song.singer" :key="singer.name">/{{singer.name}}</p>
          <p>- {{song.albumname}}</p>
        </div>
        <div id="like">
          <span class="red" v-if="redHeart(song.songmid)" @click="deleteCollect(song)">
            <font-awesome-icon icon="heart" />
          </span>
          <span v-else @click="addCollect(song)">
            <font-awesome-icon :icon="['far', 'heart']" />
          </span>
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
      songmid: ''
    }
  },
  methods: {
    getMusicListDetail () { // 点击先获取点击元素的排行榜id
      let topid = this.$route.params.id // 榜单id
      getRankDetail(topid).then((res) => { // 修改topid即可
        console.log(res)
        this.title = res.topinfo.ListName
        this.topImgUrl = res.topinfo.pic_v12
        let newList = []
        for (let i = 0; i < res.songlist.length; i++) { // 调整数据格式
          newList.push(res.songlist[i].data)
        }
        console.log(newList)
        this.songList = newList
        this.updataCollect()
      })
    },
    getSongMid (songmid, index) { // 路由跳转至播放器页面
      window.sessionStorage.setItem('playList', JSON.stringify(this.songList)) // 播放列表
      this.$router.push({
        path: `/player`,
        query: {
          songmid: songmid,
          index: index
        }
      })
    },
    addCollect (song) { // 添加到收藏夹
      let older = JSON.parse(localStorage.getItem('collectList')) || [] // 先读取 无数据时值为null
      older.push(song)
      window.localStorage.setItem('collectList', JSON.stringify(older))
      this.updataCollect()
    },
    deleteCollect (song) {
      let older = JSON.parse(localStorage.getItem('collectList')) || [] // 先读取 无数据时值为null
      older.forEach((i, item) => { // 对比值并删除
        if (i.songmid === song.songmid) {
          older.splice(item, 1)
          window.localStorage.setItem('collectList', JSON.stringify(older))
        }
      })
      this.updataCollect()
    },
    updataCollect () { // 更新收藏内容渲染，需要及时更新
      let list = []
      let older = JSON.parse(localStorage.getItem('collectList')) || []
      for (var i = 0; i < older.length; i++) {
        if (JSON.stringify(this.songList).indexOf(JSON.stringify(older[i].songmid)) > -1) {
          list.push(older[i].songmid) // 获取到需要渲染的歌曲
        }
      }
      this.songmid = list
    },
    redHeart (target) {
      if (this.songmid.indexOf(target) === -1) {
        return false
      } else {
        return true
      }
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
  #like {
    z-index: 100;
    position: absolute;
    right: 10px;
    width: 60px;
    line-height: 60px;
    text-align: center;
  }
  .song-detail {
    flex: 1;
    padding-right: 60px;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
#song-name {
  position: relative;
  left: 0;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #fff;
}
.red {
  color: #FF253A;
}
</style>
