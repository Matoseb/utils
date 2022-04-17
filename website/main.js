import 'the-new-css-reset/css/reset.css'
import './styling/main.scss'

import Vue from 'vue'
import App from './App.vue'

// plugins
import VueAWN from 'vue-awesome-notifications'
Vue.use(VueAWN, {})

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VueMeta from 'vue-meta'
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
})

import VTooltip from 'v-tooltip'
Vue.use(VTooltip, {
  defaultPlacement: 'top',
})

new Vue({
  render: (h) => h(App),
}).$mount('#app')
