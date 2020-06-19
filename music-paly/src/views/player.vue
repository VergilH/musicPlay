<template>
<div>
  <p>this is music player</p>
  <div id="top-btn"></div>
  <div class="content">
    <p class="name">player</p>
    <div class="img"></div>
    <div class="player-srcoll"></div>
    <div class="play-btn"></div>
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
      songmid: String
    }
  },
  methods: {
    getToken () {
      let songmid = this.$route.params.id // 接收路由传递参数
      let url2 = '/play/cgi-bin/musicu.fcg?format=json&data=%7B%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%22358840384%22%2C%22songmid%22%3A%5B%22' + songmid + '%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%221443481947%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A%2218585073516%22%2C%22format%22%3A%22json%22%2C%22ct%22%3A24%2C%22cv%22%3A0%7D%7D'
      this.$axios.get(url2).then((res) => {
        console.log(res)
        let playUrl = '/music/' + res.data.req_0.data.midurlinfo[0].purl // sip[0]+purl = http://ws.stream.qqmusic.qq.com + C400 + params
        console.log(playUrl)
        this.$axios.get(playUrl)
          .then((res) => {
            console.log(res)
          })
          .catch(error => {
            console.log(error)
          })
      })
      /*
      let playUrl = 'http://ws.stream.qqmusic.qq.com/C400003lghpv0jfFXG.m4a?fromtag=0&guid=126548448&vkey=D661E5DF19B8FEB2FBFC554276746AC608AE98B0F30595B3B3BAD5C1C89ECCDD7BE599E306F786621856D22D6BD6B96F5DD344CF3814DB71'
      let data2 = {
        format: 'json205361747',
        platform: 'yqq',
        cid: 205361747,
        songmid: '003lghpv0jfFXG', // 从歌曲信息获取
        filename: 'C400003lghpv0jfFXG.m4a', // 根据songmid生成 C400 + .m4a  获取到的vkey字段是播放地址需要的
        guid: 126548448
      } */
    }
  },
  created () {
    this.getToken()
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
</style>
