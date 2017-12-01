import React from 'react';
import { render } from 'react-dom';

import './reset.css'

import App from './App';
import { AppContainer } from 'react-hot-loader';


render(
  <AppContainer><App /></AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./App', () => {
    render(
      <AppContainer><App /></AppContainer>,
      document.getElementById('root')
    )
  });
}
