import React from 'react';
import {observer} from 'mobx-react';
import GroupList from "./GroupList";
import NewGroup from "./NewGroup";


export default observer(
  class Groups extends React.Component {
    render() {
      const user_store = this.props.user_store;
      
      return (
        <div className="row gutters">
          <div className="col col-6">
            <div className="row">
              <div className="col col-12">
                <h2>Deine Gruppen</h2>
              </div>
            </div>
            <GroupList user_store={user_store} />
          </div>
          <div className="col col-6">
            <NewGroup user_store={user_store} />
          </div>
        </div>
      );
      
    }
  }
);