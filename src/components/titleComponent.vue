<template>
<div id="top">
  <span @click="goSongs()"><font-awesome-icon icon="thumbs-up" />推荐</span>
  <span @click="goSinger()"><font-awesome-icon icon="microphone" />歌手</span>
  <span @click="goRank()"><font-awesome-icon icon="list-alt" />排行</span>
  <span @click="goSearch()"><font-awesome-icon icon="search" />搜索</span>
</div>
</template>

<script>
export default {
  name: 'topComponent',
  data () {
    return {
    }
  },
  methods: {
    goSongs () {
      this.$router.push({
        path: '/songs'
      })
    },
    goRank () {
      this.$router.push({
        path: '/'
      })
    },
    goSinger () {
      this.$router.push({
        path: '/singer'
      })
    },
    goSearch () {
      this.$router.push({
        path: '/search'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#top {
  width: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  background-color: #222;
  color: #fff;
  span {
    display: inline-block;
    padding: 5px 10px;
    width: 50px;
    border-radius: 10px;
    background-color: #aaafaf;
  }
}
</style>
