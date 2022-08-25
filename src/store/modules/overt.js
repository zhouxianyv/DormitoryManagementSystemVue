import axios from "axios";

const state = {
    bannerList: [],
    informationList: [],
    noticeList: []
}

const mutations = {
    changeBannerList(state, list) {
        state.bannerList = list;
    },
    changeInformationList(status, list) {
        state.informationList = list;
    },
    changeNoticeList(status, list) {
        state.noticeList = list;
    }
}

const getters = {
    bannerList(state) {
        return state.bannerList;
    },
    informationList(state) {
        return state.informationList;
    },
    noticeList(state) {
        return state.noticeList;
    }
}

const actions = {
    queryBannerList(context) {
        axios.get('/api/public-banner-list').then(response => {
            if (response.data.status) context.commit('changeBannerList', response.data.list || []);
        });
    },
    queryInformationList(context) {
        axios.get('/api/public-information-list').then(response => {
            if (response.data.status) context.commit('changeInformationList', response.data.list || []);
        });
    },
    queryNoticeList(context, params) {
        axios.get('/api/public-notice-list', {params}).then(response => {
            if (response.data.status) context.commit('changeNoticeList', response.data.list || []);
        });
    }
}

export default{
    state,
    mutations,
    getters,
    actions,
    namespaced:true
}