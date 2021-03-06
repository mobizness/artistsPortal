import React from 'react';
import ReactDOM from 'react-dom';
import {ConnectedRouter} from "react-router-redux";
import {Provider} from "react-redux";
import store, {history} from "./store";
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <div>
        <App/>
      </div>
    </ConnectedRouter>
  </Provider>, document.getElementById('root')
);