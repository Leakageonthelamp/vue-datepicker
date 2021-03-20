import Vue from 'vue'
import App from './App.vue'

import VCalendar from 'v-calendar'
import moment from 'moment'

Vue.use(VCalendar)
Vue.use(moment)

Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')
