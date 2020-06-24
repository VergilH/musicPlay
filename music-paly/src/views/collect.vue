<template>
<div>
  <ul id="collect-list">
    <li v-for="song in list" :key="song.name">
      {{song.songname}}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'collect',
  components: {
  },
  data () {
    return {
      list: Array
    }
  },
  methods: {
    getCollect () {
      let list = JSON.parse(localStorage.getItem('collectList'))
      this.list = list
    }
  },
  created () {
    this.getCollect()
  },
  destroyed () {
  }
}
</script>

<style lang='scss' scoped>
#collect-list {
  width: 100%;
}
</style>
