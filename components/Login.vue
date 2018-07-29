<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card card-default">
          <div class="card-header">
            <h2>Login</h2>
          </div>

          <div class="card-body">
            <form method="POST" action="/api/login" v-on:submit.prevent="login">
              <input type="hidden" name="_token" :value="csrf" />
              <div class="form-group row" v-bind:class="{ 'has-error': error && errors.email }">
                <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail Address</label>

                <div class="col-md-6">
                  <input id="email" type="email" class="form-control" name="email" value="" v-model="email" required autofocus />
                  <span class="invalid-feedback" v-if="error && errors.email">{{ errors.email }}</span>
                </div>
              </div>

              <div class="form-group row" v-bind:class="{ 'has-error': error && errors.password }">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                  <input id="password" type="password" class="form-control" name="password" v-model="password" required />
                  <span class="invalid-feedback" v-if="error && errors.password">{{ errors.password }}</span>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-md-6 offset-md-4">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" name="remember" />
                      Remember Me
                    </label>
                  </div>
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Login</button>

                  <a class="btn btn-link" href="/password/reset">Forgot Your Password?</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  import { AUTH_REQUEST } from '../store/action.types';

  export default {
    name: 'Login',
    data() {
      return {
        csrf: '',
        email: '',
        error: '',
        errors: '',
        password: '',
      };
    },

    methods: {
      login() {
        const { email, password, error = false } = this;

        this.$store.dispatch(AUTH_REQUEST, { email, password }).then(response => {
          this.$router.push({ name: 'dashboard' });
        });
      }
    },

    mounted() {
      this.csrf = axios.defaults.headers.common['X-CSRF-TOKEN'];
    }
  }
</script>
