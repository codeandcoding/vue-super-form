import Vue from 'vue';
import App from './App';
import SuperForm from '../src';

Vue.component('super-form', SuperForm)

new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
})