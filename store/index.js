import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';

window.Vuex = Vuex;

Vue.use(Vuex);

const state = {
  error: null,
  hasLoadedOnce: false,
  profile: {},
  token: localStorage.getItem('token') || '',
  user: localStorage.getItem('user') || null,
  status: '',
};

const getters = {
  authStatus: state => state.status,
  currentUser: state => state.user,
  isAuthenticated: state => !!state.token,
};

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
  strict: process.env.Node_ENV !== 'production',
});
