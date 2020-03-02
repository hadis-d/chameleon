import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import router from './router/router'
import store from '../store.js'
import VueAxios from 'vue-axios';
import axios from 'axios';
import Vuex from 'vuex';
import { BootstrapVue} from 'bootstrap-vue'

window.$ = require('jquery')
window.JQuery = require('jquery')

Vue.use(VueAxios, axios);
Vue.use(Vuex)
Vue.use(BootstrapVue)

new Vue(Vue.util.extend({ router, store })).$mount('#app');
import App from './App.vue';
new Vue(Vue.util.extend({ router, store }, App)).$mount('#app');
