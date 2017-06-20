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
        invite_email: '',
        inviteError: '',
        retrieved_users: []
      };
      this.delete = this.delete.bind(this);
      this.invite_new_user = this.invite_new_user.bind(this);
      this.retrieveUsers = this.retrieveUsers.bind(this);
      this.removeUserFromGroup = this.removeUserFromGroup.bind(this);
      this.changeState = this.changeState.bind(this);
    }
    
    invite_new_user(event) {
      event.preventDefault();
      this.setState({inviteError: ''});
      this.props.group_store.invite(this.state.invite_email).then(
        (response) => {
          this.props.group_store.initGroup();
        }
      ).catch(
        (error) => {
          this.setState({inviteError: error.response.data.error});
        }
      );
    }
    
    componentDidMount() {
      this.retrieveUsers();
    }
    
    changeState(event) {
      this.setState({[event.target.name]: event.target.value})
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
        (user_id) => {
          this.props.user_store.getUser(user_id).then(
            (response) => {
              this.setState({retrieved_users: this.state.retrieved_users.concat(response.data)});
            }
          )
        }
      )
    }
    
    removeUserFromGroup(user_id) {
      this.props.group_store.removeUser(user_id).then(
        () => {
          this.props.group_store.initGroup();
        }
      );
    }
    
    render() {
      
      const renderedUsers = (
        this.props.group_store.users.map(
          (user) => {
            let found_user = this.state.retrieved_users.find((retrieved_user) => retrieved_user._id === user);
            if (!found_user) {
              this.retrieveUsers();
              return <div key={user} className="row user-component"><p>lädt...</p></div>
            }
            return (
              <div key={user} className="row user-component">
                <div className="col col-6">
                  {found_user.first_name + ' ' + found_user.last_name}
                </div>
                <div className="col col-6">
                  {
                    this.props.user_store.id !== found_user._id ?
                      (
                        <a className="pull-right pointer" onClick={
                          () => this.removeUserFromGroup(user)
                        }>
                          Entfernen
                        </a>
                      ) : null
                  }
                </div>
              </div>
            );
          }
        )
      );
      
      const renderedInviteError = (
        this.state.inviteError ?
          (
            <span className="error">({this.state.inviteError})</span>
          ) : null
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
                    <label>
                      Email
                      {renderedInviteError}
                    </label>
                    <div className="append">
                      <input
                        type="name"
                        name="invite_email"
                        onChange={this.changeState}
                        value={this.state.invite_email}
                        className={classNames({error: this.state.inviteError})}
                      />
                      <button className="button">
                        Einladen
                      </button>
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