<template>

</template>

<script>
  import { AUTH_LOGOUT } from '../store/action.types';

  export default {
    name: 'Logout',
    mounted() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push({ name: 'login' });
      });
    }
  }
</script>
