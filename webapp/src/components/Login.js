import React from 'react';
import {observer} from 'mobx-react';


const Login = observer(
  class extends React.Component {
    on_change_in_store(event, store) {
      store[event.target.name] = event.target.value;
    }
    
    render() {
      const user_store = this.props.user_store;
      
      return (
        <div>
          <input
            type="text"
            name='username'
            onChange={
              (event) => {
                this.on_change_in_store(event, user_store);
              }
            }
          />
          <input
            type="text"
            name='password'
            onChange={
              (event) => {
                this.on_change_in_store(event, user_store);
              }
            }
          />
        </div>
      );
    }
  }
);

export default Login;