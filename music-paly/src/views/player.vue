<template>
<div id="content">
  <div class="content-bg" :style="{backgroundImage: 'url('+ albumImg +')'}"></div>
  <span id="back-btn" @click="$router.back(-1)">
    <font-awesome-icon :icon="['fas', 'chevron-left']" />
  </span>
  <div class="content">
    <p class="name">{{name}}</p>
    <p class="singer" v-for="singer in singers" :key="singer.name">
      <span>{{singer.name}}</span>
    </p>
    <div class="circle-img">
      <div class="inner-circle" :style="{backgroundImage: 'url('+ albumImg +')'}"></div>
    </div>
    <div class="player-scroll">
      <div id="scroll-point"></div>
    </div>
    <div class="play-btn" @click="play()"><font-awesome-icon icon="play" /></div>
    <audio ref="audio" :src="playUrl" :currentTime="curTime"></audio>
  </div>
</div>
</template>

<script>
export default {
  name: 'player',
  data () {
    return {
      songmid: String,
      playUrl: String,
      playList: Array,
      name: String,
      singers: Array,
      albumImg: String,
      curTime: Number
    }
  },
  methods: {
    getToken () {
      let songmid = this.$route.query.songmid // 接收路由传递参数
      console.log(songmid)
      let index = this.$route.query.index
      let url = '/play/cgi-bin/musicu.fcg?format=json&data=%7B%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%22358840384%22%2C%22songmid%22%3A%5B%22' + songmid + '%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%221443481947%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A%2218585073516%22%2C%22format%22%3A%22json%22%2C%22ct%22%3A24%2C%22cv%22%3A0%7D%7D'
      this.$axios.get(url)
        .then((res) => { // 播放链接需要使用数据拼接
          console.log(res.data.req_0.data)
          if (!res.data.req_0.data.midurlinfo[0].purl) { // 无法获取到值则无法播放
            alert('因版权原因无法播放')
          }
          let playUrl = '/music/' + res.data.req_0.data.midurlinfo[0].purl // sip[0]+purl = http://ws.stream.qqmusic.qq.com + C400 + params
          console.log(playUrl)
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
      this.name = playList[index].songname
      this.singers = playList[index].singer
      let albummid = playList[index].albummid
      let url = '/img/music/photo_new/T002R180x180M000' + albummid + '.jpg'
      this.albumImg = url
    },
    play () { // 播放
      let music = this.$refs.audio
      this.$refs.audio.play()
      console.log(music.duration)
      console.log(this.curTime)
    },
    pause () {
      this.$refs.audio.pause()
    },
    time () {
      console.log('1')
    }
  },
  created () {
  },
  mounted () {
    this.getToken()
    this.getAlbumImg()
  },
  watch: {
    '$route': { // 监听路由地址，路由变化则调动方法
      handler (route) {
        if (route.name === 'player') {
          this.getToken()
          this.getAlbumImg()
        }
      }
    },
    'this.$refs.audio.currentTime': function () {
      console.log(this.$refs.audio.currentTime)
    }
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
  filter: blur(25px);
}
#back-btn {
  z-index: 100;
  position: absolute;
  left: 10px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  color: #fff;
}
.content {
  z-index: 10;
  position: relative;
  min-height: 100vh;
  background-color: rgba($color: #000000, $alpha: .5);
  color: #fff;
  text-align: center;
  .name {
    padding: 20px;
    font-size: 20px;
  }
  .singer {
    padding: 0 0 20px;
  }
  .circle-img {
    position: relative;
    margin: 20px auto;
    width: 180px;
    height: 180px;
    border-radius: 90px;
    background-color: #fff;
    line-height: 180px;
  }
  .inner-circle {
    display: inline-block;
    margin: 0 auto;
    width: 160px;
    height: 160px;
    border-radius: 80px;
    background-color: #000;
    vertical-align: middle;
  }
  .player-scroll {
    position: relative;
    margin: 30px auto;
    width: 80%;
    height: 4px;
    border-radius: 2px;
    background-color: #fff;
    #scroll-point {
      position: absolute;
      top: -1px;
      width: 6px;
      height: 6px;
      border-radius: 3px;
      background-color: #33CC99;
    }
  }
}
</style>
