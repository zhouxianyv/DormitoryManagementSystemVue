import Vue from "vue";
import initImg from './initImg';
let directive = {
    initImg
};
for (const key in directive) {
     if(Object.prototype.toString.call(directive) !== '[object Object]') continue;
     Vue.directive(key, directive[key]);
}
