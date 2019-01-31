import {Bar, Line} from 'vue-chartjs'
import moment from 'moment'

export default {
  extends: Line,
  props: {
    title: String,
    timeUnit: {
      type: String,
      default: 'month'
    },
    loading: Boolean,
    datasets: Array
  },
  data() {
    const defOptions = {
      scales: {
        xAxes: [{
          stacked: true,
          type: 'time',
          time: {
            unit: this.timeUnit,
            isoWeekday: false
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
      maintainAspectRatio: false,
      tooltips: {
        mode: 'nearest',
        intersect: false,
        callbacks: {
          title: (tooltipItems, data) => {
            let tooltipItem = tooltipItems[0];
            let timestamp = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].t;
            let formatString;
            switch (this.timeUnit) {
              case 'day':
                formatString = 'ddd D, MMM';
                break;
              case 'week':
                formatString = 'D MMM, YYYY, [Week #]W';
                break;
              case 'month':
                formatString = 'MMM YYYY';
                break;
              case 'quarter':
                formatString = '[Q]Q - YYYY';
                break;
              default:
                formatString = 'MMM D, YYYY';
            }
            return timestamp ? moment(timestamp).format(formatString) : '';
          }
        }
      }
    };
    return {
      defOptions
    }
  },
  computed: {
    options() {
      this.defOptions.scales.xAxes[0].time.unit = this.timeUnit;
      return this.defOptions;
    }
  },
  methods: {
    forceRerender() {
      setTimeout(() => {
        this.renderChart({datasets: this.datasets}, this.options);
        this.$emit('loadingState', false);
      }, 0)
    }
  },
  mounted() {
    this.forceRerender();
  },
  watch: {
    timeUnit() {
      this.forceRerender();
    }
  }
}



