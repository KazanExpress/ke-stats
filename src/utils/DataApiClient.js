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

  constructor(token) {
    super(
      'http://localhost:3000/',
      {
        headers: {
          'Authorization': 'Basic ' + token
        }
      }
    );
  }

  checkToken() {
    return this.get('/graph-info');
  }

  getData() {
    return this.get('/graph-info')
  }
}