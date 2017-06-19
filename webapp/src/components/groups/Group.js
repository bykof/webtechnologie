import React from 'react';
import {observer} from 'mobx-react';
import classNames from 'classnames';

import '../../styles/Group.css';


export default observer(
  class Group extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        collapsed: true,
        retrieved_users: []
      };
      this.delete = this.delete.bind(this);
      this.invite_new_user = this.invite_new_user.bind(this);
      this.retrieveUsers = this.retrieveUsers.bind(this);
      this.removeUserFromGroup = this.removeUserFromGroup.bind(this);
    }
    
    invite_new_user(event) {
      event.preventDefault();
    }
    
    componentDidMount() {
      this.retrieveUsers();
    }
    
    delete() {
      this.props.group_store.delete().then(
        () => {
          if ('onDelete' in this.props) this.props.onDelete();
        }
      );
    }
    
    retrieveUsers() {
      this.props.group_store.users.forEach(
        (user) => {
          this.props.user_store.getUser(user).then(
            (response) => {
              this.state.retrieved_users.push(response.data);
              this.setState({retrieved_users: this.state.retrieved_users});
            }
          )
        }
      )
    }
  
    removeUserFromGroup(user_id) {
      this.props.group_store.removeUser(user_id);
    }
    
    render() {
      
      const renderedUsers = (
        this.props.group_store.users.map(
          (user) => {
            let found_user = this.state.retrieved_users.find((retrieved_user) => retrieved_user._id === user);
            if (!found_user) this.retrieveUsers();
            return (
              <div key={user} className="row user-component">
                <div className="col col-6">
                  {found_user ? found_user.first_name + ' ' + found_user.last_name : 'lädt...'}
                </div>
                <div className="col col-6">
                  <a className="pull-right pointer" onClick={
                    () => this.removeUserFromGroup(user)
                  }>Entfernen</a>
                </div>
              </div>
            );
          }
        )
      );
      
      return (
        <div className="group-component">
          <div className="row">
            <div className="col col-6">
              <h4>
                {this.props.group_store.name}
              </h4>
            </div>
            <div className="col col-6">
              <span
                className={
                  classNames(
                    'caret',
                    'pull-right',
                    'pointer',
                    {
                      'down': this.state.collapsed,
                      'up': !this.state.collapsed
                    }
                  )
                }
                onClick={
                  () => {
                    this.setState({collapsed: !this.state.collapsed});
                  }
                }
              />
              <span
                className="pull-right pointer"
                onClick={
                  () => {
                    this.setState({collapsed: !this.state.collapsed});
                  }
                }
              >
                Optionen {this.state.collapsed ? 'einblenden' : 'ausblenden'}
              </span>
            </div>
          </div>
          <div className={classNames({hide: this.state.collapsed})}>
            {renderedUsers}
            <div className="row">
              <div className="col col-12">
                <form onSubmit={this.invite_new_user}>
                  <div className="form-item">
                    <label>Email</label>
                    <div className="append">
                      <input type="text"/>
                      <button className="button">Einladen</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col col-12">
                <button
                  className="button red pull-right"
                  onClick={this.delete}
                >
                  Gruppe Löschen
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);