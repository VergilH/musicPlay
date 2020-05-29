<template>
<div>Search</div>
</template>

<script>
import { getHotKey, search } from '../apis/search.js'
export default {
  name: 'search',
  data () {
    return {
    }
  },
  methods: {
    getSearchHotKey () {
      getHotKey()
    },
    getSearch () {
      search()
    }
  },
  created () {
    this.getSearch()
    this.getSearchHotKey()
  }
}
</script>

<style>
</style>
