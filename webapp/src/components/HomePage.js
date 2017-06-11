import React from 'react';

import {observer} from 'mobx-react';


export default observer(
  class HomePage extends React.Component {
    render() {
      console.log(this.props.user_store.groups[0]);
      return (
        <div className="row">
          <div className="col">
            <h3>Homepage</h3>
          </div>
        </div>
      );
    }
  }
);