import DataApiClient from '@/utils/DataApiClient.js'
import moment from "moment";

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
        res.data.sort((b, a) => a.id - b.id);
        res.data.map(item => {
          item.date_created = moment(item.date_created).valueOf();
          return item;
        });
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
    this.dataApiClient = new DataApiClient(this.$store.getters.access_token);
  }
}