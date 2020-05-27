<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import ranking from './components/ranking.vue'
import singer from './components/singer.vue'
export default {
  name: 'App',
  components: {
    ranking,
    singer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  padding: 0;
}
</style>
