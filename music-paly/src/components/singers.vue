<template>
<div class="main">
  <titleComponent></titleComponent>
  <loading v-show="!singer.length"></loading>
  <div v-for="letter in AZ" :key="letter.id" v-show="!!singer.length" :id="getId(letter)">
    <ul>
      <ul class="letter">{{letter}}</ul>
      <ul class="singers-list" v-for="name in singer" :key="name.Fsort" v-if="letter == name.Findex" @click="_getSingerDetail(name.Fsinger_mid)">
        <img v-lazy='url+name.Fsinger_mid+url2'>
        <li>{{name.Fsinger_name}}</li>
      </ul>
    </ul>
  </div>
  <alphabet :alphabet="AZ"></alphabet>
</div>
</template>

<script>
import titleComponent from './titleComponent.vue'
import loading from './loading.vue'
import alphabet from './alphabet.vue'
import { getSinger, getSingerDetail } from '../apis/singer.js'
export default {
  name: 'singers',
  components: {
    titleComponent,
    loading,
    alphabet
  },
  data () {
    return {
      url: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000',
      url2: '.jpg?max_age=2592000',
      singer: [],
      AZ: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    }
  },
  methods: {
    _getSinger () { // 获取歌手列表
      getSinger().then((res) => {
        let data = res.data.data.list
        data.sort((a, b) => { // 按A-Z重新排序
          return a['Findex'].localeCompare(b['Findex'])
        })
        this.singer = data
      })
    },
    _getSingerDetail (id) { // 获取歌手id
      let singermid = id
      console.log(singermid)
      this.$router.push({
        path: `/singer/singerdetail/${singermid}`
      })
    },
    sortList () {
      console.log(this.singer)
      this.singer.sort((a, b) => {
        console.log(a['Findex'].localeCompare(b['Findex']))
      })
    },
    getId: function (id) { // 给元素加上id
      return id
    }
  },
  created () {
    this._getSinger()
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
ul {
  position: relative;
  padding: 0;
  text-align: center;
  li {
    list-style-type: none;
  }
  img {
    position: absolute;
    top: 3px;
    left: 8px;
    width: 46px;
    height: 46px;
    border-radius: 23px;
  }
}
.singer-img {
  width: 40px;
  height: 40px;
}
.letter {
  padding-left: 10px;
  border-bottom: 1px solid #000;
  line-height: 17px;
  box-sizing: border-box;
  color: #fff;
  background-color: #828282;
}
.singers-list {
  padding-left: 10px;
  border-bottom: 1px solid #000;
  line-height: 52px;
  color: #fff;
  background-color: #222;
}
</style>
