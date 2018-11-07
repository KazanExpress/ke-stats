<template>
  <bar-chart :title="title" :timeUnit="timeUnit" class="bar-chart" v-on:loading='loadingState'></bar-chart>
</template>

<script>
  import BarChart from '@/charts/BarChart.js'

  export default {
    name: 'SellsChart',
    components: {
      BarChart
    },
    props: {
      title: String,
      timeUnit: {
        type: String,
        default: 'month'
      }
    },
    methods: {
      loadingState(state) {
        this.$emit('loading', state);
      }
    }
  }
</script>

<style scoped>
  .bar-chart {
    height: 70vh;
  }
</style>