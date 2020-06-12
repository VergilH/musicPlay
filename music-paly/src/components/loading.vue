<template>
<div id="load">
  <img src="../assets/loading.gif">
  <p><font-awesome-icon icon="redo" spin /></p>
  <p>加载中...</p>
</div>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
#load {
  z-index: 9;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  text-align: center;
  background-color: #222;
  img {
    display: inline-block;
    width: 40px;
    height: 40px;
  }
  p {
    display: inline-block;
    margin-top: 20px;
    width: 100%;
  }
}
</style>
