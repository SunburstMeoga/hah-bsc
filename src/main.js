import Vue from 'vue'

import App from './App.vue'

import Vant from 'vant';
import 'vant/lib/index.css';
import VueGoodTablePlugin from 'vue-good-table';

// import the styles
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTablePlugin);
Vue.use(Vant);

Vue.config.productionTip = false

import Web3 from 'web3'

Vue.prototype.Web3 = Web3
// import eth_lib from 'eth-lib'

// Vue.prototype.eth_lib = eth_lib


new Vue({
    render: h => h(App)
}).$mount('#app')