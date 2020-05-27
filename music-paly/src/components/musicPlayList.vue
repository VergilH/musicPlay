<template>
<div>
  <div class="main">
    <div id="main-top">
      <img v-bind:src="logo" alt="无图像">
      <div id="desc">
        <p>{{cdList.dissname}}</p>
      </div>
    </div>
    <ul>
      <li v-for="(song, index) in songList" :key="song.id">
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
/* import { getSongList } from '@/apis/songs.js' */
export default {
  name: 'playMusicList',
  data () {
    let id = this.$route.query.dissid // 接收路由参数
    this.disstid = id
    console.log(id)
    return {
      disstid: '1',
      logo: '',
      cdList: '',
      songList: []
    }
  },
  methods: {
    getSongs: function () {
      let id = this.$route.query.dissid
      let url = '/api/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg' // 推荐列表详细内容，后续页面使用
      let data = { // 参数
        disstid: id,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0
      }
      console.log(data)
      this.$axios.get(url, {params: data}).then((res) => {
        console.log(res)
        let num1 = res.data.indexOf('(') // 截取第一个（所在位置
        let num2 = res.data.lastIndexOf(')') // 截取倒数第一个）所在位置
        let resultData = JSON.parse(res.data.substring(num1 + 1, num2)) // eslint-disable-line no-unused-vars
        console.log(resultData)
        this.logo = resultData.cdlist[0].logo
        this.cdList = resultData.cdlist[0]
        console.log(resultData.cdlist[0])
        this.songList = resultData.cdlist[0].songlist
      })
    }
  },
  created () {
    this.getSongs()
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  color: #fff;
}
.main {
  width: 100%;
  background-color: #222;
}
#main-top {
  display: flex;
  width: 100%;
  height: 100px;
}
img {
  flex: 0;
  width: 100px;
  height: 100px;
}
#desc {
  flex: 1;
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
