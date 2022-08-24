import Vue from 'vue';
let object={
};
for (let i in object) {
    Vue.component(i,object[i]);
}