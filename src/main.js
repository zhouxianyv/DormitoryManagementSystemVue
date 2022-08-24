// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/css/reset.css';
import '@/axios/index.js';
import '@/components/index.js';
import '@/directive/index.js';
import '@/socket/index.js';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUi from 'element-ui';
import store from './store';
Vue.config.productionTip = false;
Vue.use(ElementUi);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
