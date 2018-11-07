import {Bar, Line} from 'vue-chartjs'
import moment from 'moment'
import {CommonUtils} from '@/utils/CommonUtils.js'

export default {
  extends: Line,
  props: {
    title: String,
    timeUnit: {
      type: String,
      default: 'month'
    },
    loading: Boolean
  },
  data() {
    const dataset = {
      label: 'Total price for orders',
      fill: false,
      borderColor: '#ff0000',
      backgroundColor: '#ffffff',
      data: []
    };
    const options = {
      scales: {
        xAxes: [{
          stacked: true,
          type: 'time',
          time: {
            unit: this.timeUnit,
            // max: 1541005665000
          },
          distribution: 'series'
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            suggestedMin: 0
          }
        }]
      },
      responsive: true,
      maintainAspectRatio: false
    };
    return {
      dataset,
      options,
      parsedData: []
    }
  },
  methods: {
    parseData(ordersData) {
      console.log('Parse data');
      ordersData.sort((b, a) => moment(b.date_created).valueOf() - moment(a.date_created).valueOf());
      return ordersData.map(order => ({
        t: moment(order.date_created).valueOf(),
        y: order.price
      }));
    },
    async reRender() {
      console.log('re-render data');
      this.$emit('loading', true);
      if (this.parsedData.length === 0) {
        this.parsedData = this.parseData(this.$store.state.ordersData);
      }
      let data = CommonUtils.groupBy(this.parsedData,
        (a, b) => moment(a.t).isSame(b.t, this.timeUnit),
        (a, b) => ({t: a.t, y: a.y + b.y}));

      data.forEach(item => item.t = moment(item.t).startOf(this.timeUnit));
      this.dataset.data = data;
      this.renderChart({
        datasets: [this.dataset]
      }, this.options);
      this.$emit('loading', false);
    }
  },
  mounted() {
    console.log('Mounted');
    this.reRender();
    console.log('After Mounted');
  },
  watch: {
    timeUnit() {
      console.log('Watch');
      this.reRender();
      console.log('After Watch');
    }
  }
}



