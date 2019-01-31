<template>
  <div>
    <h1>{{message}}</h1>
  </div>
</template>

<script>
  export default {
    props: {
      message: {
        type: String,
        default: 'Page not found'
      }
    }
  }
</script>
