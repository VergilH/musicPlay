<template>
<div id="go-top-btn" ref="backToTop" @click="$router.back(-1)">
  <font-awesome-icon :icon="['fas', 'chevron-left']" />
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    windowScroll () { // 返回顶部按钮
      // 滚动条距离页面顶部的距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let backToTop = this.$refs.backToTop.style // 获取节点
      if (scrollTop > 50) { // 判断距离是否触发
        backToTop.top = '0px'
        backToTop.animationName = 'isdisplay'
        backToTop.animationDuration = '.5s'
      } else if (scrollTop < 240) {
        backToTop.animationName = 'hidden'
        backToTop.animationDuration = '.5s'
        backToTop.top = '-40px'
      }
    },
    returnTop: function () { // 返回顶部按钮
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted () {
    window.addEventListener('scroll', this.windowScroll)
  }
}
</script>

<style lang="scss" scoped>
#go-top-btn {
  z-index: 100;
  position: fixed;
  top: -40px;
  padding: 0 0 0 15px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  text-align: left;
  cursor: pointer;
  background-color: rgba($color: #828282, $alpha: .3);
  font-size: 20px;
  color: #fff;
}
@keyframes isdisplay {
  0% {
  top: -40px;
  background-color: #000;
  }
  100% {
  top: 0px;
  background-color: #fff;
  }
}
@keyframes hidden {
  0% {
  top: 0px;
  background-color: #fff;
  }
  100% {
  top: -40px;
  background-color: #000;
  }
}
</style>
