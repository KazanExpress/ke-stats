// import ApiClient from "./ApiClient";
import DataApiClient from "./DataApiClient";

export default class UserUtils {
  $store;

  constructor(store) {
    this.$store = store;
    // this.apiClient = new ApiClient();
  }

  async checkCredentials(username, password) {
    let token = btoa(username + ':' + password);
    this.$store.commit('loading', true);
    let dataApiClient = new DataApiClient(token);
    try {
      let res = await dataApiClient.checkToken();
      console.log(res);
      if (res.error) {
        throw new Error();
      } else {
        this.$store.commit('saveCredentials', {
          username,
          access_token: token
        });
        this.$store.commit('loading', false);
      }
    } catch (e) {
      this.$store.commit('clearCredentials');
      this.$store.commit('loading', false);
      throw new Error();
    }
  }

  async claimCredentials(username, password) {
    this.$store.commit('loading', true);
    try {
      var res = await this.apiClient.getAccessToken(username, password);
      console.log(res.status);
      console.log(res.data);
      if (res.error) {
        throw new Error();
      } else {
        this.$store.commit('saveCredentials', {
          username,
          access_token: res.data.access_token
        });
        this.$store.commit('loading', false);
        this.claimUserInfo();
      }
    } catch (e) {
      this.$store.commit('clearCredentials');
      this.$store.commit('loading', false);
      throw new Error();
    }
  }

  claimUserInfo() {
    // this.apiClient.getUserInfo().then(res => {
    //   if (res.error) {
    //     console.log(res.errorMessage)
    //   } else {
    //     this.saveUserInfo(res.data.first_name);
    //   }
    // })
  }

  saveUserInfo(firstName) {
    this.$store.commit('firstName', firstName);
  }
}