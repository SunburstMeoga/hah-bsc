import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0,
        currentAddress: '',
        superiorAddress: ''
    },
    mutations: {
        getCurrentAddress(state, newval) {
            state.currentAddress = newval
        },
        getSuperiorAddress(state, newval) {
            state.superiorAddress = newval
        },
    }
})
export default store