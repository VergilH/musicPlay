<template>
<div id="alphabet">
  <ul v-for="id in alphabet" :key="id">
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
    alphabet: Array
  },
  methods: {
    top (id) { // 跳转锚
      document.querySelector('#' + id).scrollIntoView(true)
    }
  }
}
</script>

<style lang="scss" scoped>
#alphabet {
  position: fixed;
  top: 50%;
  right: 14px;
  transform: translate(-50%, -50%);
  padding: 5px 0;
  width: 18px;
  border-radius: 10px;
  background-color: rgba($color: #b8b8b8, $alpha: .5);
  font-size: 12px;
  ul {
    list-style-type: none;
  }
  li {
    line-height: 16px;
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
