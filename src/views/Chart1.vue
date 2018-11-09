<template>
  <section class="card-container" v-loading="dataLoading">
    <el-card shadow="always" class="chart-container">
      <el-radio-group v-if="$store.state.ordersData.length > 0"
                      fill="#e53935"
                      v-model="activatorIndex"
                      class="chart-selector-button-group">
        <el-radio-button v-for="a in activators" :key="a.label" :label="a.index">
          {{a.label}}
        </el-radio-button>
      </el-radio-group>
      <sells-chart v-if="$store.state.ordersData.length > 0"
                   :title="title"
                   :timeUnit="timeUnit"
                   :converter="activator.converter"
                   :aggregator="activator.aggregator"
                   :maxTime="maxTime"
                   :minTime="minTime"
                   v-on:loadingState="loadingState">
      </sells-chart>
      <div class="controls-container" v-if="$store.state.ordersData.length > 0">
        <el-radio-group v-model="timeUnit" class="time-unit-button-group">
          <el-radio-button class="time-unit-button"
                           v-for="unit in timeUnits"
                           :key="unit.value"
                           :label="unit.value">
            {{unit.label}}
          </el-radio-button>
        </el-radio-group>
        <el-date-picker v-model="dateRange"
                        firstDayOfWeek="2"
                        type="daterange"
                        align="right"
                        value-format="timestamp"
                        :default-time="['00:00:00', '23:59:59']"
                        :picker-options="datePickerOptions"
                        start-placeholder="Start Date"
                        end-placeholder="End Date">
        </el-date-picker>
      </div>
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
          },
          {
            label: 'Total orders',
            index: 2,
            converter: function (order) {
              return {
                t: moment(order.date_created).valueOf(),
                y: 1
              }
            }
          },
          {
            label: 'Average price',
            index: 3,
            converter: function (order) {
              return {
                t: moment(order.date_created).valueOf(),
                y: order.price,
                count: 1
              }
            },
            aggregator: function (a, b) {
              return {
                t: a.t,
                y: Math.round(((a.y * a.count) + b.y) / (a.count + 1)),
                count: a.count + 1
              };
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
        ],
        dateRange: [],
        datePickerOptions: {
          firstDayOfWeek: 1,
          shortcuts: [{
            text: 'Last week',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Last month',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Last 3 months',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Last year',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    computed: {
      activator() {
        return this.activators.find(a => a.index === this.activatorIndex);
      },
      maxTime() {
        return this.dateRange ? this.dateRange[1] : undefined;
      },
      minTime() {
        return this.dateRange ? this.dateRange[0] : undefined;
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

  .time-unit-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
    box-shadow: none;
  }

  .controls-container {
    padding: 2rem 0 1rem 0;
  }

  .time-unit-button-group {
    margin-right: 1rem;
  }

  .chart-selector-button-group {
    margin-bottom: 1rem;
  }
</style>