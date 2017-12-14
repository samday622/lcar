// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import 'vue2-animate/dist/vue2-animate.min.css'
import axios from 'axios'
import qs from 'qs'
import {Slider} from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Slider)
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.config.productionTip = false

Vue.prototype.$ajax = axios
Vue.prototype.$qs = qs

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = '隆筹好车 - ' + to.meta.title
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
