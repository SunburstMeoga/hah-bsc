import Vue from 'vue'

import App from './App.vue'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.config.productionTip = false

import Web3 from 'web3'
Vue.prototype.Web3 = Web3

new Vue({
    render: h => h(App)
}).$mount('#app')