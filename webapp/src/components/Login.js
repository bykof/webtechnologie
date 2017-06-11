import React from 'react';
import {observer} from 'mobx-react';

import {Link} from 'react-router-dom';
import {REGISTRATION, ROOT} from "../routes_constants";


export default observer(
  class Login extends React.Component {
    on_change_in_store(event, store) {
      store[event.target.name] = event.target.value;
    }
    
    login(event) {
      let before_html = event.target.innerHTML;
      event.target.innerHTML = '<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>';
      if (this.props.user_store.log_in()) {
        this.props.history.push(ROOT);
      }
    }
    
    render() {
      const user_store = this.props.user_store;
      
      return (
        <div className="row">
          <div className="col col-12">
            <h2>Login</h2>
            <hr/>
          </div>
          <div className="col col-6">
            <div className="form">
              <div className="row gutters">
                <div className="col col-12">
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
              <div className="col col-12">
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
              <div className="row gutters">
                <div className="col">
                  <div className="form-item">
                    <button onClick={this.login.bind(this)}>Log in</button>
                  </div>
                </div>
                <div className="col">
                  <div className="form-item">
                    <Link to={REGISTRATION} className="button secondary">
                      Registrieren
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);