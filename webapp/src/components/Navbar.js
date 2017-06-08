import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {observer} from 'mobx-react';

import '../styles/Navbar.css';
import {LOGIN, ABOUT} from "../routes_constants";

export default observer(
  class Navbar extends Component {
    render() {
      return (
        <div className="row" id="navbar">
          <div className="col col-6">
            <NavLink to="/">
              Splitted
            </NavLink>
          </div>
          <div className="col-6">
            <div className="row align-right text-right">
              <div className="col col-1">
                <NavLink to={LOGIN}>
                  Anmelden
                </NavLink>
              </div>
              <div className="col col-1">
                <NavLink to={ABOUT}>
                  About
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);