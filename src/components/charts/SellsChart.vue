<template>
  <bar-chart class="bar-chart"
             ref="chart"
             :title="title"
             :timeUnit="timeUnit"
             v-on:loadingState='loadingState'
             v-if="dataset.data.length > 0"
             :datasets="[dataset]">
  </bar-chart>
</template>

<script>
  import BarChart from '@/charts/BarChart.js'
  import {CommonUtils} from '@/utils/CommonUtils.js'
  import moment from 'moment'

  export default {
    name: 'SellsChart',
    components: {
      BarChart
    },
    props: {
      title: {
        type: String,
        default: 'Total price for orders'
      },
      timeUnit: {
        type: String,
        default: 'month'
      },
      maxTime: Number,
      minTime: Number,
      converter: {
        type: Function,
        default: order => ({
          t: moment(order.date_created).valueOf(),
          y: order.price
        })
      },
      aggregator: {
        type: Function,
        default: (a, b) => ({t: a.t, y: a.y + b.y})
      }
    },
    data() {
      const dataset = {
        label: '',
        fill: false,
        borderColor: '#ff0000',
        backgroundColor: '#ffffff',
        data: []
      };
      return {
        dataset,
        parsedData: []
      }
    },
    methods: {
      loadingState(state) {
        this.$emit('loadingState', state);
      },
      parseData(ordersData) {
        let res = ordersData.map(this.converter);
        if (this.minTime && this.maxTime) {
          res = res.filter(o => o.t >= this.minTime && o.t <= this.maxTime);
        }
        res.sort((a, b) => a.t - b.t);
        return res;
      },
      processChartData() {
        if (this.parsedData.length === 0) {
          this.parsedData = this.parseData(this.$store.state.ordersData);
        }
        let data = CommonUtils.groupBy(this.parsedData,
          (a, b) => moment(a.t).isSame(b.t, this.timeUnit),
          this.aggregator);

        data.forEach(item => item.t = moment(item.t).startOf(this.timeUnit));
        this.dataset.label = this.title;
        this.dataset.data = data;
      },
      forceRerender() {
        this.parsedData = [];
        this.processChartData();
        this.$refs.chart.forceRerender();
      }
    },
    mounted() {
      this.loadingState(true);
      setTimeout(() => {
        this.processChartData();
        this.loadingState(false);
      }, 100);
    },
    watch: {
      timeUnit() {
        this.processChartData();
      },
      minTime() {
        this.forceRerender();
      },
      maxTime() {
        this.forceRerender();
      },
      converter() {
        this.forceRerender();
      }
    }
  }
</script>

<style scoped>
  .bar-chart {
    height: 70vh;
  }
</style>