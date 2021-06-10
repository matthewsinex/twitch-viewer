import Vue from 'vue'
import NewsLayout from './news-layout.vue'

import { store } from './store/NewsStore.js'

new Vue({
  el: '#app',
  store,
  components: {
    NewsLayout
  }
})
