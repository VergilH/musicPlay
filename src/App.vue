<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="router"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      transitionName: 'slide-right' // 初始动画
    }
  },
  watch: {
    $route (to, from) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #222;
}
* {
  margin: 0;
  padding: 0;
}
body {
  margin: 0;
  padding: 0;
}
.main {
  position: relative;
  width: 100%;
}
#top-myths-icon {
  position: relative;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  color: #fff;
  background-color: #222;
  .collect {
    position: absolute;
    top: 12px;
    right: 20px;
    font-size: 18px;
  }
  .back-btn {
    position: absolute;
    left: 10px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
  }
}
.slide-left-enter, .slide-right-leave-to {
  transform: translateX(100%)
}
.slide-left-leave-to, .slide-right-enter {
  transform: translateX(-100%)
}
.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
  transition: .5s;
  position: absolute;
  top:0;
}
</style>
