import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import login from './modules/login.js';
import overt from './modules/overt.js';

export default new Vuex.Store({
  modules:{
    login,
    overt
  }
});