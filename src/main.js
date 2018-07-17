import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResouce from 'vue-resource'
import VueLazyload from 'vue-lazyload'

import 'common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(VueResouce)

Vue.use(VueLazyload, {
  loading: require('common/image/lazy_loading.gif')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
