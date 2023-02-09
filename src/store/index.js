import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0,
        currentAddress: '',
        superiorAddress: '',
        submitComputingPower: '',
        basicComputingPower: ''
    },
    mutations: {
        getCurrentAddress(state, newval) {
            state.currentAddress = newval
        },
        getSuperiorAddress(state, newval) {
            state.superiorAddress = newval
        },
        getSubmitComputingPower(state, newval) {
            state.submitComputingPower = newval
        },
        getBasicComputingPower(state, newval) {
            state.basicComputingPower = newval
        }
    }
})
export default store