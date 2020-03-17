/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ResponsiveContainer from '../containers/ResponsiveContainer';
import reducers from '../reducers';
import '../stylesheets/main.scss';
import AppContainer from '../containers/AppContainer';

const store = createStore(reducers, applyMiddleware(
  thunk,
));

export const App = () => {
  return (
    <Provider store={store}>
      <ResponsiveContainer
        name="font-family"
      >
        <AppContainer />
      </ResponsiveContainer>
    </Provider>
  );
};
