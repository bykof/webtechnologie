import React from 'react';
import {observer} from 'mobx-react';
import classNames from 'classnames';
import {ROOT} from "../routes_constants";


export default observer(
  class Registration extends React.Component {
    constructor(props) {
      super(props);
      
      this.error_message_mapper = {
        user_already_exists: 'User existiert schon'
      };
      
      this.default_state = {
        is_loading: false,
        passwords_not_same: false,
        error_message: null,
        user_exists: false
      };
      
      this.state = this.default_state;
      this.reset = this.reset.bind(this);
      this.on_change_in_user_store = this.on_change_in_user_store.bind(this);
      this.check_for_passwords = this.check_for_passwords.bind(this);
    }
    
    on_change_in_user_store(event) {
      this.props.user_store[event.target.name] = event.target.value;
    }
    
    check_for_passwords() {
      return this.props.user_store.password === this.props.user_store.password_again;
    }
    
    reset() {
      this.setState(this.default_state);
    }
    
    register(event) {
      event.preventDefault();
      this.reset();
      if (this.check_for_passwords()) {
        this.props.user_store.register().then(
          (user) => {
            this.props.history.push(ROOT);
          }
        ).catch(
          (error) => {
            this.setState({user_exists: true});
            this.setState({error_message: this.error_message_mapper[error.response.data.error]});
          }
        )
      } else {
        this.setState({passwords_not_same: true});
        this.setState({error_message: 'Passwörter stimmen nicht überein!'});
      }
    }
    
    render() {
      const user_store = this.props.user_store;
      
      return (
        <form onSubmit={this.register.bind(this)}>
          <div className="row">
            <div className="col col-12">
              <h2>Registrierung</h2>
              <hr/>
            </div>
            <div className="col col-6">
              <div className="row">
                <div className="col col-12">
                  <span className="error">{this.state.error_message}</span>
                </div>
              </div>
              <div className="form">
                <div className="row gutters">
                  <div className="col col-6">
                    <div className="form-item">
                      <label>Vorname</label>
                      <input
                        type="text"
                        name='first_name'
                        onChange={this.on_change_in_user_store}
                        value={user_store.first_name}
                      />
                    </div>
                  </div>
                  <div className="col col-6">
                    <div className="form-item">
                      <label>Nachname</label>
                      <input
                        type="text"
                        name='last_name'
                        onChange={this.on_change_in_user_store}
                        value={user_store.last_name}
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col col-12">
                    <div className="form-item">
                      <label>Email</label>
                      <input
                        type="email"
                        name='email'
                        className={classNames({'error': this.state.user_exists})}
                        onChange={this.on_change_in_user_store}
                        value={user_store.email}
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col col-6">
                    <div className="form-item">
                      <label>Passwort</label>
                      <input
                        type="password"
                        name='password'
                        className={classNames({'error': this.state.passwords_not_same})}
                        onChange={this.on_change_in_user_store}
                        value={user_store.password}
                      />
                    </div>
                  </div>
                  <div className="col col-6">
                    <div className="form-item">
                      <label>Passwort nochmal eingeben</label>
                      <input
                        type="password"
                        name='password_again'
                        className={classNames({'error': this.state.passwords_not_same})}
                        onChange={this.on_change_in_user_store}
                        value={user_store.password_again}
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col">
                    <div className="form-item">
                      <button onClick={this.register.bind(this)}>Registrieren</button>
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