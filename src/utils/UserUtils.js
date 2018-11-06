import ApiClient from "./ApiClient";

export default class UserUtils {
  $store;

  constructor(store) {
    this.$store = store;
    this.apiClient = new ApiClient();
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