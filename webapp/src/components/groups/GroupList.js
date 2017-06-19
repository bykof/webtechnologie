import React from 'react';
import {observer} from 'mobx-react';
import Group from "./Group";


export default observer(
  class GroupList extends React.Component {
    render() {
      const user_store = this.props.user_store;
      
      return (
        <div>
          {
            user_store.groups.map(
              (group_store) => {
                return (
                  <Group
                    key={group_store.id}
                    onDelete={user_store.updateGroups}
                    onChange={user_store.updateGroups}
                    group_store={group_store}
                    user_store={this.props.user_store}
                  />
                );
              }
            )
          }
        </div>
      );
    }
  }
);