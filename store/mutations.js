import Vue from 'vue';
import {
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR,
  REQUEST,
  LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,
  LOGOUT,
  REGISTER, REGISTER_SUCCESS, REGISTER_FAILED,
  ERROR
} from './action.types';

export default {
  [REQUEST]: (state) => {
    state.status = 'loading';
  },

  [AUTH_REQUEST]: (state) => {
    state.status = 'loading';
  },

  [AUTH_SUCCESS]: (state, response) => {
    state.status = 'success';
    state.token = response.token;
    state.user = response.user[0];
  },

  [AUTH_LOGOUT]: (state) => {
    state.profile = {};
    state.token = false;
    state.user = null;
  },

  [AUTH_ERROR]: (state, error) => {
    state.status = 'error';
    state.error = error;
  },

  [LOGIN]: (state, user) => {
    state.token = true;
    state.user = user[0];
  },

  [LOGIN_SUCCESS]: (state, response) => {
    state.status = 'success';
    Vue.set('state', 'profile', response);
  },

  [LOGIN_FAILED]: (state) => {
    state.token = false;
  },

  [LOGOUT]: (state) => {
    state.profile = {};
  },

  [REGISTER]: (state, user) => {
    state.token = true;
    state.user = user[0];
  },

  [REGISTER_SUCCESS]: (state) => {
    state.token = true;
  },

  [REGISTER_FAILED]: (state) => {
    state.token = false;
  },

  [ERROR]: (state, err) => {
    state.status = 'error';
  }
};
