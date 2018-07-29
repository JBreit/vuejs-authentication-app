<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card card-default">
          <div class="card-header">
            <h2>Register</h2>
          </div>

          <div class="card-body">
            <form method="POST" action="/api/register" v-on:submit.prevent="register">
              <input type="hidden" name="_token" :value="csrf">
              <div class="form-group row" v-bind:class="{ 'has-error': error && errors.name }">
                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                <div class="col-md-6">
                  <input id="name" type="text" class="form-control" name="name" value="" v-model="name" required autofocus />
                  <span class="invalid-feedback" v-if="error && errors.name">{{ errors.name }}</span>
                </div>
              </div>

              <div class="form-group row" v-bind:class="{ 'has-error': error && errors.email }">
                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                <div class="col-md-6">
                  <input id="email" type="email" class="form-control" name="email" value="" v-model="email" required />
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

              <div class="form-group row" v-bind:class="{ 'has-error': error && errors.password }">
                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>

                <div class="col-md-6">
                  <input id="password-confirm" type="password" lass="form-control" name="password_confirmation" v-model="password" required />
                  <span class="invalid-feedback" v-if="error && errors.password">{{ errors.password }}</span>
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-6 offset-md-4">
                  <button type="submit" class="btn btn-primary">Register</button>
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

  import { AUTH_REGISTER } from '../store/action.types';

  export default {
    name: 'Register',
    data() {
      return {
        csrf: '',
        name: '',
        email: '',
        password: '',
        error: '',
        errors: {},
        success: '',
      };
    },

    methods: {
      register() {
        const { name, email, password, error = false } = this;

        this.$store.dispatch(AUTH_REGISTER, { name, email, password }).then(response => {
          this.$router.push({ name: 'dashboard' });
        });
      }
    },

    mounted() {
      this.csrf = axios.defaults.headers.common['X-CSRF-TOKEN'];
    }
  }
</script>
