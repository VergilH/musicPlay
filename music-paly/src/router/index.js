import Vue from 'vue'
import Router from 'vue-router'
import rank from '../views/rank.vue'
import singer from '../views/singer.vue'
import songs from '../views/songs.vue'
import search from '../views/search.vue'
import player from '../views/player.vue'
import musicPlayList from '../views/musicPlayList.vue'
import recommend from '../components/recommend.vue'
import recommendList from '../components/recommendList.vue'
import singers from '../components/singers.vue'
import singerDetail from '../components/singerDetail.vue'
import rankList from '../components/rankList.vue'
import rankListDetail from '../components/rankListDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'rank',
      component: rank,
      children: [
        {
          path: '',
          name: 'ranklist',
          component: rankList
        },
        {
          path: '/rank/rankdetail/:id',
          name: 'ranklistdetail',
          component: rankListDetail
        }
      ]
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer,
      children: [
        {
          path: '',
          name: 'singers',
          component: singers
        },
        {
          path: '/singer/singerdetail/:id',
          name: 'singerdetail',
          component: singerDetail
        }
      ]
    },
    {
      path: '/songs',
      name: 'songs',
      component: songs,
      children: [
        {
          path: '',
          name: 'recommend',
          component: recommend
        },
        {
          path: '/songs/recommendlist/:id',
          name: 'recommendlist',
          component: recommendList
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/player/:id',
      name: 'player',
      component: player
    }
  ]
})
