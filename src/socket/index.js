import Vue from 'vue';
let socket = io.connect();
Vue.prototype.$socket = socket;
