import {combineReducers} from "redux";
import {routerReducer as router} from 'react-router-redux';
import auth from './reducers/auth.reducer';
import login from './components/login/form.login.reducer';
import admin from './components/admin/dashboard.reducer';
import artist from './components/artist/dashboard.reducer';
import dropbox from './components/dropbox/dropbox.reducer';

export default combineReducers({
  auth,
  login,
  admin,
  artist,
  dropbox,
  router
});