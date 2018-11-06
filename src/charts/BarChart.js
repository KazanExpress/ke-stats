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
    }
  },
  data() {
    console.log(this.timeUnit);
    const dataset = {
      label: 'GitHub Commits',
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
            max: 1541005665000
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
      options
    }
  },
  methods: {
    reRender() {
      let data = [];
      let time = 1540005665000;
      for (let i = 0; i < 1000; i++) {
        data.push({t: time, y: Math.sin(time / 10000000000) * 100});
        time += Math.random() * 100000000;
      }
      data = CommonUtils.groupBy(data,
        (a, b) => moment(a.t).isSame(b.t, this.timeUnit),
        (a, b) => ({t: a.t, y: a.y + b.y}));

      data.forEach(item => item.t = moment(item.t).startOf(this.timeUnit));
      this.dataset.data = data;
      this.renderChart({
        datasets: [this.dataset]
      }, this.options)
    }
  },
  mounted() {
    this.reRender();
  },
  watch: {
    timeUnit() {
      this.reRender();
    }
  }
}

