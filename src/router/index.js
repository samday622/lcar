import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['@/page/list'], resolve),
      meta: {
        title: '车源列表'
      }
    },
    {
      path: '/list',
      component: resolve => require(['@/page/list'], resolve),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/detail/:id',
      component: resolve => require(['@/page/detail'], resolve),
      meta: {
        title: '车辆详情'
      }
    }
  ]
})
