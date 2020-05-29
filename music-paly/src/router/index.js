import Vue from 'vue'
import Router from 'vue-router'
import ranking from '@/components/ranking.vue'
import singer from '../components/singer.vue'
import songs from '../components/songs.vue'
import search from '../components/search.vue'
import musicPlayList from '../components/musicPlayList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Ranking',
      component: ranking
      /* children: [
        {
          path: '/rank',
          name: 'rankDetail',
          component: () => import('../components/rankDetail.vue')
        }
      ] */
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer
    },
    {
      path: '/songs',
      name: 'songs',
      component: songs
    },
    {
      path: '/musicplaylist',
      name: 'musicPlayList',
      component: musicPlayList
    },
    {
      path: '/search',
      name: 'search',
      component: search
    }
  ]
})
