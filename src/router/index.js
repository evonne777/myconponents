import Vue from 'vue'
import Router from 'vue-router'
import go from '@/view/go'
import page from '@/view/page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'go',
      component: go
    },
    {
      path: '/page',
      name: 'page',
      component: page
    }
  ]
})
