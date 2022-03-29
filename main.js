import App from './App'
import {Api} from 'pages/api/api.js'
import store from 'store/store.js'
import topimg from 'pages/components/topimg.vue'

Vue.prototype.api = new Api()
Vue.component('topimg',topimg)

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
		store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif