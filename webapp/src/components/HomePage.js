import React from 'react';

import {observer} from 'mobx-react';


export default observer(
  class HomePage extends React.Component {
    render() {
      
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