import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import './initjQuery';
import 'imperavi-kube/dist/css/kube.min.css';
import 'imperavi-kube/dist/js/kube.min';

import './styles/index.css';


ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
