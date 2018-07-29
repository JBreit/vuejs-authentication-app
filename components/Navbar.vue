<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link :to="{ name: 'home' }" class="navbar-brand">Innermind</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">

      <ul class="navbar-nav mr-auto" v-if="!isAuthenticated">
        <li class="nav-item active">
          <router-link :to="{ name: 'home' }" class="nav-link">Home <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'register' }" class="nav-link">Register</router-link>
        </li>
      </ul>

      <ul class="navbar-nav mr-auto" v-if="user && isAuthenticated">
        <li class="nav-item">
          <router-link :to="{ name: 'dashboard' }" class="nav-link">Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'user' }" class="nav-link">User</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'profile', params: { id: user.id } }" class="nav-link">Profile</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'logout' }" class="nav-link">Logout</router-link>
        </li>
      </ul>

    </div>
  </nav>
</template>

<script>
  export default {
    name: 'NavBar',
    computed: {
      user() {
        return this.$store.getters.currentUser;
      },

      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      }
    }
  }
</script>

<style>

</style>
