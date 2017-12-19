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
        title: '车源列表'
      }
    },
    {
      path: '/detail/:id',
      component: resolve => require(['@/page/detail'], resolve),
      meta: {
        title: '车辆详情'
      }
    },
    {
      path: '/sellcar',
      component: resolve => require(['@/page/sellcar'], resolve),
      meta: {
        title: '车辆详情'
      }
    },
    {
      path: '/order/:id',
      component: resolve => require(['@/page/order'], resolve),
      meta: {
        title: '预约看车'
      }
    },
    {
      path: '/custom',
      component: resolve => require(['@/page/custom'], resolve),
      meta: {
        title: '定制买车'
      }
    }
  ]
})
