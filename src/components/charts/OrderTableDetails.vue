<template>
    <div v-loading="!details">
      <div class="error-message" v-if="details && details.error">
        <p>Error: {{ details.error }}</p>
      </div>
      <div class="order-details" v-if="details && !details.error">
        <p>Id: {{ details.id }}</p>
        <p>Details: {{ details.details }}</p>
      </div>
    </div>
</template>
<script>
  export default {
    name: 'OrderTableDetails',
    props: {
      details: {type: Function}
    }
  }
</script>
<style scoped>
  .order-details {
    display: inline-flex;
  }
</style>