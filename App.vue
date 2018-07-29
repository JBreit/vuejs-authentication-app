<!-- <template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template> -->

<template>
  <div id="app" class="flex-center position-ref full-height">
    <NavBar/>

    <transition>
      <router-view class="content"></router-view>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios';

  import NavBar from './components/Navbar';
  import { AUTH_LOGOUT } from './store/action.types';

  export default {
    name: 'App',
    components: { NavBar },

    created() {
      axios.interceptors.response.use(undefined, (err) => {
        return new Promise((resolve, reject) => {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch(AUTH_LOGOUT).then(() => {
              this.$router.push({ name: 'login' });
            });
          }

          throw err;
        });
      });
    },

    data() {
      return {

      };
    },
    mounted() {

    }
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
