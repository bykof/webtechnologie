import React from 'react';
import {observer} from 'mobx-react';


export default observer(
  class About extends React.Component {
    render() {
      
      return (
        <div>
          <h1>About</h1>
          <h2>
            <u>Was ist das für 1 Projekt?</u>
          </h2>
          <p>
            Dieses Projekt entstand in dem Wahlfach der Hochschule Rheinmain und ermöglicht es Kosten in einer Gruppe
            aufzuteilen.
          </p>
        </div>
      );
    }
  }
);