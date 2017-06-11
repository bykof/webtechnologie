import React from 'react';
import {observer} from 'mobx-react';

import {ROOT} from '../routes_constants';

export default observer(
  class Logout extends React.Component {
    
    componentDidMount() {
      this.props.user_store.logout();
      this.props.history.push(ROOT);
    }
    
    render() {
      return null;
    }
  }
);