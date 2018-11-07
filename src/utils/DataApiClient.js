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
          // 'Authorization': 'Basic a2F6YW5leHByZXNzLWN1c3RvbWVyOmN1c3RvbWVyU2VjcmV0S2V5',
          // 'Content-type': 'application/json',
          // 'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  getData() {
    return this.get('/graph-info')
  }
}