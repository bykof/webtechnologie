import React from 'react';
import {observer} from 'mobx-react';

import {Link} from 'react-router-dom';
import {REGISTRATION} from "../routes_constants";


export default observer(
  class Login extends React.Component {
    on_change_in_store(event, store) {
      store[event.target.name] = event.target.value;
    }
    
    render() {
      const user_store = this.props.user_store;
      
      return (
        <div className="form">
          <div className="row gutters">
            <div className="col col-6">
              <div className="form-item">
                <label>Email</label>
                <input
                  type="email"
                  name='email'
                  onChange={
                    (event) => {
                      this.on_change_in_store(event, user_store);
                    }
                  }
                />
              </div>
            </div>
          </div>
          <div className="row gutters">
            <div className="col col-3">
              <div className="form-item">
                <label>Passwort</label>
                <input
                  type="password"
                  name='password'
                  onChange={
                    (event) => {
                      this.on_change_in_store(event, user_store);
                    }
                  }
                />
              </div>
            </div>
            <div className="col col-3">
              <div className="form-item">
                <label>Passwort nochmal eingeben</label>
                <input
                  type="password"
                  name='password_again'
                  onChange={
                    (event) => {
                      this.on_change_in_store(event, user_store);
                    }
                  }
                />
              </div>
            </div>
          </div>
          <div className="row gutters">
            <div className="col">
              <div className="form-item">
                <button>Registrieren</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);