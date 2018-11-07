<template>
  <section class="card-container" v-loading="dataLoading">
    <el-card shadow="always" class="chart-container">
      <sells-chart v-if="$store.state.ordersData.length > 0"
                   :title="title"
                   :timeUnit="timeUnit" v-on:loading="loadingState">
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
  import SellsChart from '@/components/charts/SellsChart.vue'
  import DataApiClient from '@/utils/DataApiClient.js'

  export default {
    components: {
      SellsChart
    },
    data() {
      return {
        title: this.$route.meta.title,
        timeUnit: 'quarter',
        dataApiClient: null,
        dataLoading: false
      }
    },
    methods: {
      async loadAndSaveOrdersData() {
        console.log('Start loading');
        this.dataLoading = true;
        try {
          let res = await this.dataApiClient.getData();
          console.log(res.status);
          console.log(res.data);
          if (res.error) {
            throw new Error();
          }
          this.$store.commit('ordersData', res.data);
        } catch (e) {
          console.log('Data can not be loaded')
        }
        this.dataLoading = false;
      },
      loadingState(state) {
        this.dataLoading = state;
      }
    },
    mounted() {
      if (this.$store.state.ordersData.length === 0) {
        this.loadAndSaveOrdersData();
      }
    },
    created() {
      this.dataApiClient = new DataApiClient();
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