import React from 'react';
import {observer} from 'mobx-react';


export default observer(
  class Login extends React.Component {
    constructor(props) {
      super(props);
      this.on_change_in_user_store = this.on_change_in_user_store.bind(this);
    }
    
    on_change_in_user_store(event, store) {
      this.props.user_store[event.target.name] = event.target.value;
    }
    
    register(event) {
      let before_html = event.target.innerHTML;
      event.target.innerHTML = '<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>';
    }
    
    render() {
      const user_store = this.props.user_store;
      
      return (
        <div className="row">
          <div className="col col-12">
            <h2>Registrierung</h2>
            <hr/>
          </div>
          <div className="col col-6">
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
      );
    }
  }
);