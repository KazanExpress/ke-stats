import DataApiClient from '@/utils/DataApiClient.js'

export default {
  name: "DefaultSellsView",
  data() {
    return {
      dataApiClient: null,
      dataLoading: false
    }
  },
  methods: {
    async loadAndSaveOrdersData() {
      this.loadingState(true);
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
      this.loadingState(false);
    },

    loadingState(state) {
      this.dataLoading = !!state;
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