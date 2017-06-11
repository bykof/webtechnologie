import React from 'react';
import {observer} from 'mobx-react';


export default observer(
  class IsNotLoggedIn extends React.Component {
    render() {
      const {user_store} = this.props;
      
      if (!user_store.is_logged_in) {
        return this.props.children;
      } else {
        return null;
      }
    }
  }
);