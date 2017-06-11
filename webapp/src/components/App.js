import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Route, BrowserRouter as Router} from "react-router-dom";

import {ROOT, LOGIN, REGISTRATION, ABOUT, LOGOUT} from '../routes_constants';

import HomePage from './HomePage';
import Login from "./Login";
import Registration from "./Registration";
import UserStore from "../stores/UserStore";
import Navbar from "./Navbar";
import About from "./About";
import Logout from "./Logout";

export default observer(
  class App extends Component {
    
    constructor() {
      super();
      this.user_store = new UserStore();
    }
    
    render_login(props) {
      return (<Login {...props} user_store={this.user_store}/>);
    }
  
    render_logout(props) {
      return (<Logout {...props} user_store={this.user_store}/>);
    }
    
    render_registration(props) {
      return (<Registration {...props} user_store={this.user_store}/>);
    }
    
    render() {
      return (
        <Router>
          <div>
            <Navbar user_store={this.user_store} />
            <div className="content">
              <Route
                exact={true}
                path={ROOT}
                component={HomePage}
              />
              <Route
                path={LOGIN}
                render={this.render_login.bind(this)}
              />
              <Route
                path={REGISTRATION}
                render={this.render_registration.bind(this)}
              />
              <Route
                path={ABOUT}
                component={About}
              />
              <Route
                path={LOGOUT}
                render={this.render_logout.bind(this)}
              />
            </div>
          </div>
        </Router>
      );
    }
  }
);