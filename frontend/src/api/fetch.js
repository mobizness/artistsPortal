const reactappapibase = process.env.REACT_APP_API_BASE;
const baseUrl = reactappapibase === "/" ? '' : reactappapibase;

const fetchQuery = (url, {
  authorized,
  body,
  ...otherProps
} = {}) => {
  const headers = new Headers();
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");

  if (authorized) {
    const token = localStorage.getItem("pace__jwt_token");
    if (!!token) {
      headers.set("Authorization", "Bearer " + token);
    }
    else {
      return Promise.reject('No authorization token found')
    }
  }

  return fetch(baseUrl + url, {
    headers,
    body,
    ...otherProps,
  })
    .catch(function (reason) {
      return Promise.reject(reason.message);
    })
    .then(function (response) {
      if (response.ok) {
        return Promise.resolve(response);
      }
      else if (response.status) {
        return response.json().then(function (response) {
          return Promise.reject(response);
        })
      }
      else {
        return Promise.reject("Something went wrong");
      }
    })
};

const fetchJson = (url, {
  authorized,
  body,
  ...otherProps
} = {}) => {

  return fetchQuery(url, {authorized, body, ...otherProps}).then(function (response) {
    return response.json();
  });
};

const fetchQueryAuthorized = (url, {body, ...otherProps} = {}) => {
  return fetchQuery(url, {
    body,
    authorized: true, ...otherProps
  });
};


const fetchJsonAuthorized = (url, {body, ...otherProps} = {}) => {
  return fetchJson(url, {
    body,
    authorized: true, ...otherProps
  });
};

export {
  fetchQuery,
  fetchQueryAuthorized,
  fetchJson,
  fetchJsonAuthorized,
}