<template>
  <section class="card-container" v-loading="dataLoading">
    <el-card shadow="always" class="sells-list-container">
      <sells-list v-if="$store.state.ordersData.length > 0"
                   v-on:loadingState="loadingState">
      </sells-list>
    </el-card>
  </section>
</template>

<script>
  import SellsList from '@/components/charts/SellsList.vue'
  import DefaultSellsView from "@/views/DefaultSellsView";

  export default {
    extends: DefaultSellsView,
    components: {
      SellsList
    }
  }
</script>

<style scoped>
  .card-container {
    margin: 1rem 4rem;
  }
</style>