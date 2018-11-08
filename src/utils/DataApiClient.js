import {GenericAPIClient} from 'kefetchup/dist/kefetchup.es5'

export default class DataApiClient extends GenericAPIClient {
  async responseHandler(resp) {
    let wrapper = {status: resp.status};
    if (resp.status >= 400) {
      wrapper.error = true;
      wrapper.errorMessage = resp.error;
    }
    wrapper.data = await resp.json();
    return wrapper;
  }

  constructor() {
    super(
      'http://localhost:3000/',
      {
        headers: {
          'Authorization': 'Basic YWRtaW46YWRtaW4='
        }
      }
    );
  }

  getData() {
    return this.get('/graph-info')
  }
}