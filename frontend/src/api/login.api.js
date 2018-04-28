import {fetchQuery} from "./fetch";

export default () => {
  const login = (email, password, rememberMe) => {
    return fetchQuery('/api/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        // rememberMe
      }),
    })
    .then(function (response) {
      return Promise.resolve(response.headers.get('Authorization'));
    })
    .then(function (auth) {
      const searchString = 'Bearer ';
      const jwt = auth.substr(auth.indexOf(searchString) + searchString.length);
      return Promise.resolve(jwt);
    });
  };

  return {
    login
  }
};