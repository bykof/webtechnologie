import React from 'react';
import {observer} from 'mobx-react';
import GroupStore from "../../stores/GroupStore";


export default observer(
  class NewGroup extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        name: ''
      };
      
      this.changeState = this.changeState.bind(this);
      this.createNewGroup = this.createNewGroup.bind(this);
    }
    
    createNewGroup(event) {
      event.preventDefault();
      
      GroupStore.create(
        {
          name: this.state.name
        }
      ).then(
        (group_store) => {
          group_store.addUser(this.props.user_store.id).then(
            () => {
              this.setState({name: ''});
              this.props.user_store.groups.push(group_store);
            }
          );
        }
      );
    }
    
    changeState(event) {
      this.setState({[event.target.name]: event.target.value});
    }
    
    render() {
      return (
        <div className="row">
          <div className="col col-12">
            <form onSubmit={this.createNewGroup} className="form">
              <fieldset>
                <legend>Neue Gruppe erstellen</legend>
                <div className="form-item">
                  <label>Gruppenname</label>
                  <div className="append">
                    <input type="text" name="name" onChange={this.changeState} value={this.state.name}/>
                    <button className="button" onClick={this.createNewGroup}>
                      Erstellen
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      );
    }
  }
);