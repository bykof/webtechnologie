import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Route} from "react-router-dom";

import {ROOT, LOGIN, REGISTRATION} from '../routes_constants';

import HomePage from './HomePage';
import Login from "./Login";
import Registration from "./Registration";

export default observer(
  class App extends Component {
    
    render() {
      
      return (
        <div>
          <Route exact={true} path={ROOT} component={HomePage}/>
          <Route path={LOGIN} component={Login}/>
          <Route path={REGISTRATION} component={Registration}/>
        </div>
      );
    }
  }
);