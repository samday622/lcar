// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import {Slider, Button, Input, Select, TimeSelect, TimePicker, DatePicker, Option, Form, FormItem} from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/loading-spin.svg'),
  loading: require('./assets/loading-spin.svg'),
  attempt: 1
})

Vue.use(Slider)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(TimePicker)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
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
