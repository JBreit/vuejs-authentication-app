<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card" v-if="user">
          <div class="card-header">
            <h2 :key="user.name">{{ user.name }}'s Profile</h2>
          </div>

          <div class="card-body">
            <div class="col-md-6">
              <img class="card-avatar-img" :src="`uploads/avatars/${user.avatar}`" />

              <form enctype="multipart/form-data" v-bind:action="`/api/user/${ this.$route.params.id }`" method="POST" v-on:submit.prevent="update">

                <input type="hidden" name="_method" value="PUT">

                <input type="hidden" name="_token" :value="csrf">

                <div class="form-group row">
                  <label>Update Profile Image</label>
                  <input type="file" name="avatar" class="form-control-file" />
                </div>

                <div class="form-group row">
                  <input type="submit" class="btn btn-sm btn-primary" role="button" />
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Profile',
    data() {
      return {
        csrf: '',
        user: '',
      };
    },

    methods: {},

    mounted() {
      this.csrf = axios.defaults.headers.common['X-CSRF-TOKEN'];

      let options = {
        headers: {
          Authorization: `Bearer ${ localStorage.getItem('token') }`,
        }
      };

      axios.get(`/api/auth/user/${ this.$route.params.id }`, options).then(response => {
        this.user = response.data.user[0];
      });
    }
  }
</script>
