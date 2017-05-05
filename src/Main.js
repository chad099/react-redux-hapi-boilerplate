/* eslint-disable */
import React, { Component } from 'react';

import { Provider } from 'react-redux'
import ApiClient from './helpers/ApiClient';
import createStore from './redux/create';
import createHistory from 'history/createBrowserHistory';
import  MainRoute from './routes/index';
const client = new ApiClient();
const history = createHistory();
const store = createStore(history, client, window.__INITIAL_STATE__);
class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <div style={{height:"100%"}}>
          <MainRoute history={history}/>
        </div>
      </Provider>
    );
  }
}

export default Main;
