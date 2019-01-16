import Vue from 'vue';
import App from './App';
import { SuperSelect } from '../src';

Vue.component('super-select', SuperSelect)

new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
})