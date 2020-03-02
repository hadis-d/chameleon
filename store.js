import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)


export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        user: {
            loggedIn: false,
            token: ""
        }
    },

    getters: {
        auth(state) {
            return state.user
        },
        isLoggedIn: state => {
            return state.user.loggedIn
        },
        token: state=>{
            return state.user.token
        }
    },
    mutations: {
        setLoggedIn (state, truth) {
          state.user.loggedIn = truth
        },
        setToken (state, token){
          state.user.token = token
        }
      }
})