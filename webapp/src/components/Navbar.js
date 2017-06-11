import React, {Component} from 'react';
import classNames from 'classnames';
import {NavLink} from 'react-router-dom';
import {observer} from 'mobx-react';

import '../styles/Navbar.css';
import {LOGIN, ABOUT, LOGOUT} from "../routes_constants";
import IsLoggedIn from "./IsLoggedIn";
import IsNotLoggedIn from "./IsNotLoggedIn";

export default observer(
  class Navbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        navbar_open: false
      };
    }
    
    toggle_navbar() {
      this.setState({navbar_open: !this.state.navbar_open});
    }
    
    render() {
      return (
        <div className="navbar">
          <div className="show-sm">
            <div id="nav-toggle-box">
              <div id="nav-toggle-brand">
                <NavLink to="/">
                  Splittid
                </NavLink>
              </div>
              <a id="nav-toggle" onClick={this.toggle_navbar.bind(this)}>
                <i className="kube-menu"/>
              </a>
            </div>
          </div>
          <div id="top" className={classNames({'hide-sm': this.state.navbar_open})}>
            <div id="top-brand">
              <NavLink to="/">
                Splitted
              </NavLink>
            </div>
            <nav id="top-nav-main">
              <ul>
              </ul>
            </nav>
            <nav id="top-nav-extra">
              <ul>
                <li>
                  <IsNotLoggedIn user_store={this.props.user_store}>
                    <NavLink to={LOGIN}>
                      Anmelden
                    </NavLink>
                  </IsNotLoggedIn>
                </li>
                <li>
                  <NavLink to={ABOUT}>
                    About
                  </NavLink>
                </li>
                <IsLoggedIn user_store={this.props.user_store}>
                  <li>
                    <NavLink to={LOGOUT}>
                      Logout
                    </NavLink>
                  </li>
                </IsLoggedIn>
              </ul>
            </nav>
          </div>
        </div>
      );
    }
  }
);