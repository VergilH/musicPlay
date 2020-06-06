<template>
<div id="load">
  <img src="../assets/loading.gif">
  <p>Loading...</p>
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
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #222;
  p {
    display: inline-block;
    margin-top: 50px;
  }
}
</style>
