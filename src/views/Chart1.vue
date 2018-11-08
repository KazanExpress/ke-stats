<template>
  <section class="card-container" v-loading="dataLoading">
    <el-card shadow="always" class="chart-container">
      <el-radio-group fill="#e53935" v-model="activatorIndex" class="time-unit-button-group">
        <el-radio-button v-for="a in activators" :key="a.label" :label="a.index">
          {{a.label}}
        </el-radio-button>
      </el-radio-group>
      <sells-chart v-if="$store.state.ordersData.length > 0"
                   :title="title"
                   :timeUnit="timeUnit"
                   :converter="activator.converter"
                   :aggregator="activator.aggregator"
                   v-on:loadingState="loadingState">
      </sells-chart>
      <el-radio-group v-model="timeUnit" class="time-unit-button-group">
        <el-radio-button class="time-unit-button"
                         v-for="unit in timeUnits"
                         :key="unit.value"
                         :label="unit.value">
          {{unit.label}}
        </el-radio-button>
      </el-radio-group>
    </el-card>
  </section>
</template>

<script>
  import DefaultSellsView from './DefaultSellsView.js'
  import SellsChart from '@/components/charts/SellsChart.vue'
  import moment from 'moment'

  export default {
    extends: DefaultSellsView,
    components: {
      SellsChart
    },
    data() {
      return {
        title: this.$route.meta.title,
        activatorIndex: 1,
        activators: [
          {
            label: 'Total cost',
            index: 1,
          }, {
            label: 'Total orders',
            index: 2,
            converter: function (order) {
              return {
                t: moment(order.date_created).valueOf(),
                y: 1
              }
            }
          }
        ],
        timeUnit: 'quarter',
        timeUnits: [
          {
            value: 'quarter',
            label: 'Quarter'
          }, {
            value: 'month',
            label: 'Month'
          }, {
            value: 'week',
            label: 'Week'
          }, {
            value: 'day',
            label: 'Day'
          }
        ]
      }
    },
    computed: {
      activator() {
        return this.activators.find(a => a.index === this.activatorIndex);
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

  .time-unit-button-group {
    padding: 2rem 0 1rem 0;
  }

  .time-unit-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
    box-shadow: none;
  }
</style>