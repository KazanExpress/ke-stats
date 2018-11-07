<template>
  <section class="card-container" v-loading="dataLoading">
    <el-card shadow="always" class="chart-container">
      <sells-chart v-if="$store.state.ordersData.length > 0"
                   :title="title"
                   :timeUnit="timeUnit"
                   v-on:loadingState="loadingState">
      </sells-chart>
      <el-radio-group v-model="timeUnit" class="time-unit-selector">
        <el-radio-button label="quarter"></el-radio-button>
        <el-radio-button label="month"></el-radio-button>
        <el-radio-button label="week"></el-radio-button>
        <el-radio-button label="day"></el-radio-button>
      </el-radio-group>
    </el-card>
  </section>
</template>

<script>
  import DefaultSellsView from './DefaultSellsView.js'
  import SellsChart from '@/components/charts/SellsChart.vue'

  export default {
    extends: DefaultSellsView,
    components: {
      SellsChart
    },
    data() {
      return {
        title: this.$route.meta.title,
        timeUnit: 'quarter'
      }
    }
  }
</script>

<style scoped>
  .card-container {
    margin: 1rem 4rem;
  }

  .chart-container {
    min-height: 300px;
  }

  .time-unit-selector {
    padding: 2rem 0 1rem 0;
  }
</style>