import React from 'react';
import {observer} from 'mobx-react';


export default observer(
  class ExampleComponent extends React.Component {
    render() {
      const example_store = this.props.example_store;
      
      return (
        <div/>
      );
    }
  }
);