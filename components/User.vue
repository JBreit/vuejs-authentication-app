<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card card-default">
          <div class="card-header">
            <h2>User Component</h2>
          </div>

          <div class="card-body">
              User: {{ user }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'User',
    data() {
      return {
        user: '',
      };
    },

    mounted() {
      let options = {
        headers: {
          Authorization: `Bearer ${ localStorage.getItem('token') }`,
        }
      };

      axios.get('/api/auth/user', options).then(response => {
        this.user = response.data.user[0];
      });
    }
  }
</script>
