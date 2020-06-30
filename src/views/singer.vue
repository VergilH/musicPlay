<template>
  <router-view></router-view>
</template>

<script>
import singers from '../components/singers.vue'
export default {
  name: 'singer',
  components: {
    singers
  },
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
</style>
