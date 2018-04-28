import axios from 'axios';

const reactappapibase = process.env.REACT_APP_API_BASE;
const baseURL = (reactappapibase === "/" ? '' : reactappapibase) + '/api';

const instance = axios.create({
  baseURL,
  headers: {'Content-Type': 'application/json'}
});

// add authorization header
instance.interceptors.request.use(config => {
  const token = localStorage.getItem("pace__jwt_token");
  if (!!token) {
    config.headers['Authorization'] = "Bearer " + token;
  }

  return config;
});

// ensure token is removed if got forbidden
instance.interceptors.response.use(response => {
  if (response.status && response.status === 403) {
    localStorage.removeItem("pace__jwt_token");
  }

  return response;
});

export default instance;