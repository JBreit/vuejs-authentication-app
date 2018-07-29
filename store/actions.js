import axios from 'axios';
import {
  REQUEST, LOGIN, LOGIN_SUCCESS,
  AUTH_REQUEST, AUTH_LOGIN, AUTH_SUCCESS, AUTH_LOGIN_FAILED, AUTH_ERROR,
  LOGOUT, AUTH_LOGOUT,
  REGISTER, REGISTER_SUCCESS, REGISTER_FAILED,
  AUTH_REGISTER, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILED,
  ERROR
} from './action.types';

export default {
  [AUTH_REQUEST]: ({ commit, dispatch }, credentials) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);

      axios.post('/api/login', credentials).then(response => {
        const { token, user } = response.data;

        commit(AUTH_SUCCESS, response.data);

        localStorage.setItem('user', JSON.stringify(user[0]));
        localStorage.setItem('token', token);

        axios.defaults.headers.common['Authorization'] = token;

        //dispatch(REQUEST);

        resolve(response);
      }).catch(err => {
        commit(AUTH_ERROR, err);

        localStorage.removeItem('user');
        localStorage.removeItem('token');

        reject(err);
      });
    });
  },

  [AUTH_SUCCESS]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(LOGIN_SUCCESS);
    });
  },

  [AUTH_LOGIN_FAILED]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(LOGIN_FAILED);

      reject();
    });
  },

  [AUTH_LOGOUT]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT);

      localStorage.removeItem('user');
      localStorage.removeItem('token');

      delete axios.defaults.headers.common['Authorization'];

      resolve();
    });
  },

  [AUTH_REGISTER]: ({ commit }, credentials) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);

      axios.post('/api/register', credentials).then(response => {
        const { token, user } = response.data;

        commit(AUTH_SUCCESS, response.data);

        localStorage.setItem('user', JSON.stringify(user[0]));
        localStorage.setItem('token', token);

        axios.defaults.headers.common['Authorization'] = token;

        resolve(response);
      }).catch(err => {
        reject(err);
      });
    });
  },

  [AUTH_REGISTER_SUCCESS]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(REGISTER_SUCCESS);
    });
  },

  [AUTH_REGISTER_FAILED]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(REGISTER_FAILED);
    });
  }
};
