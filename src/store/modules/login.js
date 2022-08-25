const state = {
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
}

const mutations = {
    changeUser(state, obj) {
        state.user = obj;
        if (obj.id) {
            sessionStorage.setItem('user', JSON.stringify(obj));
        } else {
            sessionStorage.removeItem('user');
        }
    }
}

const getters = {
    user(state) {
        return state.user;
    }
}

export default{
    state,
    mutations,
    getters,
    namespaced:true
}