<template>
<div id="content">
  <div class="content-bg" :style="{backgroundImage: 'url('+ albumImg +')'}"></div>
  <div id="top-btn"></div>
  <div class="content">
    <p class="name">{{name}}</p>
    <p class="singer" v-for="singer in singers" :key="singer.name">
      <span>{{singer.name}}</span>
    </p>
    <div class="img"></div>
    <div class="player-srcoll"></div>
    <div class="play-btn" @click="play()"><font-awesome-icon icon="play" /></div>
    <audio ref="audio" :src="playUrl"></audio>
  </div>
</div>
</template>

<script>
export default {
  name: 'player',
  data () {
    let id = this.$route.params.id // 接收路由参数
    this.songmid = id
    return {
      songmid: String,
      playUrl: String,
      playList: Array,
      name: String,
      singers: Array,
      albumImg: String
    }
  },
  methods: {
    getToken () {
      let songmid = this.$route.query.songmid // 接收路由传递参数
      let index = this.$route.query.index
      console.log(index)
      let url = '/play/cgi-bin/musicu.fcg?format=json&data=%7B%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%22358840384%22%2C%22songmid%22%3A%5B%22' + songmid + '%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%221443481947%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A%2218585073516%22%2C%22format%22%3A%22json%22%2C%22ct%22%3A24%2C%22cv%22%3A0%7D%7D'
      this.$axios.get(url)
        .then((res) => { // 播放链接需要使用数据拼接
          let playUrl = '/music/' + res.data.req_0.data.midurlinfo[0].purl // sip[0]+purl = http://ws.stream.qqmusic.qq.com + C400 + params
          this.playUrl = playUrl // 播放链接
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAlbumImg () { // 获取专辑图片
      let playList = JSON.parse(window.sessionStorage.getItem('playList'))
      let index = this.$route.query.index
      this.playList = playList
      this.name = playList[index].data.songname
      this.singers = playList[index].data.singer
      let albummid = playList[index].data.albummid
      let url = '/img/music/photo_new/T002R180x180M000' + albummid + '.jpg'
      this.albumImg = url
    },
    play () {
      this.$refs.audio.play()
    }
  },
  created () {
    this.getToken()
  },
  mounted () {
    this.getAlbumImg()
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
#content {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
}
.content-bg {
  z-index: 0;
  position: absolute;
  width: 100%;
  min-height: 100vh;
  background: center no-repeat;
  background-size: cover;
  filter: blur(5px);
}
.content {
  z-index: 10;
  position: relative;
  min-height: 100vh;
  background-color: rgba($color: #000000, $alpha: .5);
  color: #fff;
  .name {
    
  }
  .singer {
    
  }
}
</style>
