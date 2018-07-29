import Vue from 'vue';
import VueRouter from 'vue-router';
import './bootstrap';
import router from './routes';
import store from './store';
import App from './App';

window.Vue = Vue;
window.VueRouter = VueRouter;

Vue.prototype.$http = window.axios;

Vue.use(VueRouter);

const app = new Vue({
  el: '#app',
  router,
  http: {
    headers: {
      'X-CSRF-Token': axios.defaults.headers.common['X-CSRF-TOKEN'],
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  store,
  components: { App },
  template: '<App/>',
  mounted() {

  },
  render: h => h(App)
});
