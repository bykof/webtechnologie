import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Route, BrowserRouter as Router} from "react-router-dom";

import {ROOT, LOGIN, REGISTRATION, LOGOUT, GROUPS, INVOICE_EDITOR} from '../routes_constants';

import HomePage from './HomePage';
import Login from "./Login";
import Registration from "./Registration";
import UserStore from "../stores/UserStore";
import Navbar from "./Navbar";
import Logout from "./Logout";
import Groups from "./groups/Groups";
import InvoiceEditor from "./invoices/InvoiceEditor";

export default observer(
  class App extends Component {
    
    constructor() {
      super();
      this.user_store = new UserStore();
    }
    
    render_homepage(props) {
      return (<HomePage {...props} user_store={this.user_store}/>);
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
    
    render_groups(props) {
      return (<Groups {...props} user_store={this.user_store}/>);
    }
  
    render_invoice_editor(props) {
      return (<InvoiceEditor {...props} user_store={this.user_store}/>);
    }
    
    render() {
      return (
        <Router>
          <div>
            <Navbar user_store={this.user_store}/>
            <Route
              exact={true}
              path={ROOT}
              render={this.render_homepage.bind(this)}
            />
            <div className="content">
              <Route
                path={LOGIN}
                render={this.render_login.bind(this)}
              />
              <Route
                path={REGISTRATION}
                render={this.render_registration.bind(this)}
              />
              <Route
                path={LOGOUT}
                render={this.render_logout.bind(this)}
              />
              <Route
                path={GROUPS}
                render={this.render_groups.bind(this)}
              />
              <Route
                path={INVOICE_EDITOR()}
                render={this.render_invoice_editor.bind(this)}
              />
            </div>
          </div>
        </Router>
      );
    }
  }
);