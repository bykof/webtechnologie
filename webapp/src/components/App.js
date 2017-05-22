import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Route} from "react-router-dom";

import {ROOT, LOGIN, REGISTRATION} from '../routes_constants';

import HomePage from './HomePage';
import Login from "./Login";
import Registration from "./Registration";
import UserStore from "../stores/UserStore";

export default observer(
  class App extends Component {
    
    constructor() {
      super();
      this.user_store = new UserStore();
    }
    
    render_login(props) {
      return (<Login {...props} user_store={this.user_store}/>);
    }
    
    render() {
      
      return (
        <div>
          <Route exact={true} path={ROOT} component={HomePage}/>
          <Route
            path={LOGIN}
            render={this.render_login.bind(this)}
          />
          <Route path={REGISTRATION} component={Registration}/>
        </div>
      );
    }
  }
);