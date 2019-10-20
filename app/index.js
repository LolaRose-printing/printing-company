import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

const store = configureStore({
  employees: new Map([
    [
      2,
      {
        id: 2,
        name: 'Herbert',
        surname: 'Frank',
        email: 'herbert.frank@gmail.com',
        phone: '111 222 33'
      }
    ]
  ]),
  counter: 10
});

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);
