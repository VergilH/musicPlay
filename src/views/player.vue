<template>
<div id="content">
  <div class="content-bg" :style="{backgroundImage: 'url('+ albumImg +')'}"></div>
  <span id="back-btn" @click="$router.back(-1)">
    <font-awesome-icon :icon="['fas', 'chevron-left']" />
  </span>
  <div class="content">
    <p class="name">{{name}}</p>
    <p class="singer" >
      <span v-for="(singer, index) in singers" :key="singer.name"><span v-if="!!index">/</span>{{singer.name}}</span>
    </p>
    <div class="circle-img">
      <div class="inner-circle" :style="{backgroundImage: 'url('+ albumImg +')'}"></div>
    </div>
    <div class="player-scroll" ref="scroll">
      <div class="scroll-inner" ref="point">
        <div id="scroll-point"></div>
      </div>
    </div>
    <div class="play-btn">
      <span class="left" @click="lastSong()"><font-awesome-icon icon="angle-double-left" /></span>
      <span class="play" v-if="playing" @click="play()"><font-awesome-icon icon="play" /></span>
      <span class="pause" v-if="pauseing" @click="pause()"><font-awesome-icon icon="pause" /></span>
      <span class="right" @click="nextSong()"><font-awesome-icon icon="angle-double-right" /></span>
    </div>
    <audio ref="audio"
      @timeupdate="onTimeUpdate"
      @play="isPlay"
      @pause="isPause"
      @onended="end()"
      :src="playUrl">
    </audio>
  </div>
</div>
</template>

<script>
import jsonp from '../apis/jsonp.js'
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
      curSong: Number,
      curTime: Number,
      totalTime: Number,
      playing: true,
      pauseing: false,
      cantPlay: Boolean
    }
  },
  methods: {
    playerUrl (songmid) {
      let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&data=%7B%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%22358840384%22%2C%22songmid%22%3A%5B%22' + songmid + '%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%221443481947%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A%2218585073516%22%2C%22format%22%3A%22json%22%2C%22ct%22%3A24%2C%22cv%22%3A0%7D%7D'
      jsonp(url).then((res) => { // 播放链接需要使用数据拼接
        console.log(res)
        if (!res.req_0.data.midurlinfo[0].purl) { // 无法获取到值则无法播放
          this.cantPlay = true
        }
        let playUrl = '/music/' + res.req_0.data.midurlinfo[0].purl // sip[0]+purl = http://ws.stream.qqmusic.qq.com + C400 + params'
        console.log(playUrl)
        this.playUrl = playUrl // 播放链接
      })
        .catch(err => {
          console.log(err)
        })
    },
    getToken () {
      this.songmid = this.$route.query.songmid // 接收路由传递参数
      this.playerUrl(this.songmid)
    },
    getAlbumImg () { // 获取专辑图片
      let playList = JSON.parse(window.sessionStorage.getItem('playList'))
      let index = this.$route.query.index
      this.curSong = index
      this.playList = playList
      this.name = playList[index].songname
      this.singers = playList[index].singer
      let albummid = playList[index].albummid
      console.log(albummid)
      let url = 'https://y.gtimg.cn/music/photo_new/T002R180x180M000' + albummid + '.jpg'
      console.log(url)
      this.albumImg = url
    },
    nextSong () { // 下收歌曲
      let index = this.curSong + 1
      let playList = this.playList
      this.name = playList[index].songname
      this.singers = playList[index].singer
      this.songmid = playList[index].songmid
      let albummid = playList[index].albummid
      let url = 'https://y.gtimg.cn/music/photo_new/T002R180x180M000' + albummid + '.jpg'
      this.albumImg = url
      this.curSong = index
      this.playerUrl(this.songmid)
    },
    lastSong () { // 上首歌曲
      let index = this.curSong - 1
      let playList = this.playList
      this.name = playList[index].songname
      this.singers = playList[index].singer
      this.songmid = playList[index].songmid
      let albummid = playList[index].albummid
      let url = 'https://y.gtimg.cn/music/photo_new/T002R180x180M000' + albummid + '.jpg'
      this.albumImg = url
      this.curSong = index
      this.playerUrl(this.songmid)
    },
    play () { // 播放
      let music = this.$refs.audio
      this.$refs.audio.play()
      console.log(music.duration)
      this.totalTime = music.duration
      console.log(this.curTime)
    },
    pause () {
      this.$refs.audio.pause()
    },
    isPlay () {
      console.log('music playing')
      this.pauseing = true
      this.playing = false
    },
    isPause () {
      console.log('music pause')
      this.playing = true
      this.pauseing = false
      if (this.totalTime === this.curTime) {
        this.$refs.point.style.width = 0
      }
    },
    onTimeUpdate (res) { // audio时间更新触发，用于监听播放时刻
      console.log(res.target.currentTime)
      this.curTime = res.target.currentTime
      this.$refs.point.style.width = (this.curTime / this.totalTime) * 100 + '%'
    },
    end () {
      console.log('end')
      this.$refs.point.style.width = 0
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
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .circle-img {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -140px 0 0 -110px;
    width: 220px;
    height: 220px;
    border-radius: 110px;
    background-color: #fff;
    line-height: 220px;
  }
  .inner-circle {
    display: inline-block;
    margin: 0 auto;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    background-color: #000;
    vertical-align: middle;
  }
  .player-scroll {
    position: fixed;
    bottom: 100px;
    margin: 30px 10%;
    width: 80%;
    height: 4px;
    border-radius: 2px;
    background-color: #fff;
    .scroll-inner {
      position: relative;
      height: 4px;
      border-radius: 2px;
      background-color: #33CC99;
    }
    #scroll-point {
      position: absolute;
      top: -1px;
      right: -3px;
      width: 6px;
      height: 6px;
      border-radius: 3px;
      background-color: #33CC99;
    }
  }
}
.play-btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: 100px;
  span {
    display: inline-block;
    font-size: 24px;
  }
  .left {

  }
  .play {
    margin: 0 30px;
  }
  .pause {
    margin: 0 30px;
  }
  .right {

  }
}
</style>
