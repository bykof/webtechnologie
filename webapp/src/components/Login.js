import React from 'react';
import {observer} from 'mobx-react';

import {Link} from 'react-router-dom';
import {REGISTRATION, ROOT} from "../routes_constants";

const error_message_mapper = {
  user_not_found: 'User wurde nicht gefunden!',
  password_not_correct: 'Das Passwort ist nicht korrekt!'
};

export default observer(
  class Login extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        error_message: null,
        is_loading: false
      };
    }
    
    on_change_in_store(event, store) {
      store[event.target.name] = event.target.value;
    }
    
    login(event) {
      event.preventDefault();
      
      this.setState({is_loading: true});
      this.props.user_store.log_in().then(
        (response) => {
          this.props.history.push(ROOT);
        }
      ).catch(
        (error) => {
          this.setState({is_loading: false});
          this.setState({error_message: error_message_mapper[error.response.data.error]});
        }
      );
    }
    
    render() {
      const user_store = this.props.user_store;
      
      return (
        <form onSubmit={this.login.bind(this)}>
          <div className="row">
            <div className="col col-12">
              <h2>Login</h2>
              <hr/>
            </div>
            <div className="col col-6">
              <div className="form">
                <div className="row">
                  <div className="col col-12">
                    <span className="error">{this.state.error_message}</span>
                  </div>
                </div>
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
                      <button onClick={this.login.bind(this)}>
                        {
                          this.state.is_loading ? <i className="fa fa-circle-o-notch fa-spin fa-fw" /> : 'Log in'
                        }
                      </button>
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
        </form>
      );
    }
  }
);