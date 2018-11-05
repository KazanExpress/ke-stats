import {GenericAPIClient, withQuery} from 'kefetchup/dist/kefetchup.es5'

class ApiClient extends GenericAPIClient {
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
      'https://customers.dev.kznexpess.com',
      // 'http://localhost:8081/',
      {
        headers: {
          'Authorization': 'Basic a2F6YW5leHByZXNzLWN1c3RvbWVyOmN1c3RvbWVyU2VjcmV0S2V5',
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  getAccessToken(login, password) {
    return this.post(withQuery('/api/oauth/token', {
      'grant_type': 'password',
      'username': login,
      'password': password
    }))
  }

  getUserInfo() {
    // return this.get('/api/');
  }
}

export default {
  ApiClient
}