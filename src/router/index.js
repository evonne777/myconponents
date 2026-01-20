import Vue from 'vue'
import Router from 'vue-router'
import go from '@/view/go'
import page from '@/view/page'
import UCIexample from '@/view/exam'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'go',
      component: go
    },
    {
      path: '/exam',
      name: 'exam',
      component: UCIexample
    },
    {
      path: '/page',
      name: 'page',
      component: page
    }
  ]
})
