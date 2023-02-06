import Vue from 'vue'
import Mint from 'mint-ui'
import { Field } from 'mint-ui'


import App from './App.vue'
import 'mint-ui/lib/style.css'

Vue.use(Mint)
Vue.component(Field.name, Field)

Vue.config.productionTip = false

import Web3 from 'web3'
Vue.prototype.Web3 = Web3

new Vue({
    render: h => h(App)
}).$mount('#app')