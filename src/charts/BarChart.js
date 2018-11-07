import {Bar, Line} from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    title: String,
    timeUnit: {
      type: String,
      default: 'month'
    },
    loading: Boolean,
    dataset: Object
  },
  data() {
    const defOptions = {
      scales: {
        xAxes: [{
          stacked: true,
          type: 'time',
          time: {
            unit: this.timeUnit,
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
  },
  mounted() {
    this.renderChart({datasets: [this.dataset]}, this.options);
  },
  watch: {
    timeUnit() {
      this.renderChart({datasets: [this.dataset]}, this.options);
    }
  }
}



