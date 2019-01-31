<template>
    <div v-loading="!details">
      <div class="error-message" v-if="details && details.error">
        <p>Error: {{ details.error }}</p>
      </div>
      <div class="order-details" v-if="details && !details.error" style="width: 100%">
        <el-table :data="details.items" size="small">
          <el-table-column
              prop="id"
              label="OrderItem Id" width="100">
          </el-table-column>
          <el-table-column
              prop="title"
              label="Item Title">
          </el-table-column>
          <el-table-column
              prop="purchase_price"
              label="Purchase price" width="110">
          </el-table-column>
          <el-table-column
              prop="full_price"
              label="Full price"
              width="80">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>
<script>
  export default {
    name: 'OrderTableDetails',
    props: {
      details: {type: Object}
    }
  }
</script>
<style scoped>
  .order-details {
    display: inline-flex;
  }
</style>