<template>
  <div class="login">
    <h1>Here will be login page</h1>
    <LoginForm></LoginForm>
  </div>
</template>

<script>
  // @ is an alias to /src
  import LoginForm from '@/components/LoginForm.vue'

  export default {
    name: 'username',
    components: {
      LoginForm
    }
  }
</script>