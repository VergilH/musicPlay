import Vue from 'vue'
import Router from 'vue-router'
const collect = r => require(['@/views/collect'], r)
const search = r => require(['@/views/search'], r)
const player = r => require(['@/views/player'], r)
const songs = r => require(['@/views/songs'], r)
const recommend = r => require(['@/components/recommend'], r)
const recommendList = r => require(['@/components/recommendList'], r)
const singer = r => require(['@/views/singer'], r)
const singers = r => require(['@/components/singers'], r)
const singerDetail = r => require(['@/components/singerDetail'], r)
const rank = r => require(['@/views/rank'], r)
const rankList = r => require(['@/components/rankList'], r)
const rankListDetail = r => require(['@/components/rankListDetail'], r)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
      path: '/player',
      name: 'player',
      component: player
    },
    {
      path: '/collect',
      name: 'collect',
      component: collect
    }
  ]
})
