import Vue from 'vue';
import axios from 'axios';
import store from '@/store/index.js';
Vue.prototype.$host='http://localhost:3010';
Vue.prototype.$baseUrl='/api';
const baseUrl = '/api';
const vm = new Vue();
axios.interceptors.request.use(req => {
    if (req.url!= '/api/login') {
        req.headers.authorization = store.state.login.user.token;
    }
    req.url = baseUrl + req.url;
    return req;
});
axios.interceptors.response.use(resopnse => {
    if(resopnse.data.code === 403) {
        store.commit('login/changeUser', {});
        vm.$alert('登录超时，请点击刷新重新登录','', {
            confirmButtonText: '刷新',
            callback: () => {
                window.location.reload();
            },
            showClose: false,
          });
    } else {
        return resopnse;
    }
});