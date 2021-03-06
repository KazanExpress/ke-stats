import {GenericAPIClient, withQuery} from 'kefetchup/dist/kefetchup.es5'

export default class DataApiClient extends GenericAPIClient {
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

  async responseHandler(resp) {
    let wrapper = {status: resp.status};
    if (resp.status >= 400) {
      wrapper.error = true;
      wrapper.errorMessage = resp.error;
    } else {
      try {
        wrapper.data = await resp.json();
      } catch(e) {
        wrapper.data = null;
      }
    }
    return wrapper;
  }

  checkToken() {
    return this.get('/');
  }

  getDetails(id) {
    return this.get(withQuery('/items', {id}));
  }


  getData() {
    return this.get('/graph-info');
  }
}