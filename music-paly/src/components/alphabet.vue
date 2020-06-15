<template>
<div id="alphabet">
  <ul v-for="id in msg" :key="id">
    <li @click="top(id)">{{id}}</li>
  </ul>
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    msg: Array
  },
  methods: {
    top (id) {
      document.querySelector('#' + id).scrollIntoView(true)
    }
  } // <a :href="'#' + id">{{id}}</a>
}
</script>

<style lang="scss" scoped>
#alphabet {
  position: fixed;
  top: 50%;
  right: 14px;
  transform: translate(-50%, -50%);
  padding: 10px 0;
  width: 20px;
  border-radius: 10px;
  background-color: rgba($color: #b8b8b8, $alpha: .5);
  ul {
    list-style-type: none;
  }
  li {
    line-height: 20px;
    color: #fff;
    &:hover {
      color: #33CC99;
    }
    &:active {
      color: #33CC99;
    }
  }
}
</style>
