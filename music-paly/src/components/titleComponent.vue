<template>
<div id="header">
  <span @click="goSongs()">推荐</span>
  <span>歌手</span>
  <span @click="goRank()">排行</span>
  <span>搜索</span>
</div>
</template>

<script>
export default {
  name: 'header',
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
    }
  }
}
</script>

<style lang="scss" scoped>
#header {
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
