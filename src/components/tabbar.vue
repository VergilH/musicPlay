<template>
<div id="top" v-if="isDisplay()">
  <span ref="recommend">
    <router-link class="item" to="songs" :class="{'active':$route.path === '/songs'}">
      <p class="icon"><font-awesome-icon icon="thumbs-up" /></p>
      <p class="desc">推荐</p>
    </router-link>
  </span>
  <span>
    <router-link class="item" to="singer" :class="{'active':$route.path === '/singer'}">
      <p class="icon"><font-awesome-icon icon="microphone" /></p>
      <p class="desc">歌手</p>
    </router-link>
  </span>
  <span>
    <router-link class="item" to="/" :class="{'active':$route.path === '/'}">
      <p class="icon"><font-awesome-icon icon="list-alt" /></p>
      <p class="desc">排行</p>
    </router-link>
  </span>
  <span>
    <router-link class="item" to="search" :class="{'active':$route.path === '/search'}">
      <p class="icon"><font-awesome-icon icon="search" /></p>
      <p class="desc">搜索</p>
    </router-link>
  </span>
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
    },
    isDisplay () {
      console.log(this.$route.name)
      if (this.$route.name === 'recommend' || this.$route.name === 'search' || this.$route.name === 'ranklist' || this.$route.name === 'singers') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#top {
  z-index: 999;
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: #222;
  color: #fff;
  span {
    display: inline-block;
    padding: 5px 10px;
    width: 50px;
    border-radius: 10px;
    color: #fff;
  }
  a {
    text-decoration: none;
    color: #fff;
  }
  .active {
    color: #33CC99;
  }
  .icon {
    font-size: 24px;
  }
  .desc {
    font-size: 12px;
  }
}
</style>
