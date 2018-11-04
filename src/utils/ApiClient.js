import {GenericAPIClient, withQuery, ResponseException, ResponseErrors} from 'kefetchup/dist/kefetchup.es5'

class ApiClient extends GenericAPIClient  {
  responseHandler(resp) {
    // console.log(resp);
    if (resp.status >= 400) {
      throw new ResponseException(ResponseErrors[resp.status], resp.status, resp);
    }
    return resp.json();
  }

  constructor(myVeryImportantSetting) {
    super(
      'http://localhost:8081/',
      {
        headers: {
          'Authorization': 'Basic a2F6YW5leHByZXNzLWN1c3RvbWVyOmN1c3RvbWVyU2VjcmV0S2V5',
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
    // Set a custom variable to the instace
    this.myVeryImportantSetting = myVeryImportantSetting;
  }

  getImportantThingsList() {
    return this.get(withQuery('/api/main/', {}));
  }

  getAccessToken(login, password) {
    return this.post(withQuery('/api/oauth/token', {
      'grant_type': 'password',
      'username': login,
      'password': password
    }))
  }
}

export default {
  ApiClient
}