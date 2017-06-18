import React from 'react';
import {observer} from 'mobx-react';
import classNames from 'classnames';

import '../../styles/Group.css';


export default observer(
  class Group extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        collapsed: true
      };
      this.delete = this.delete.bind(this);
    }
    
    
    delete() {
      this.props.group_store.delete().then(
        () => {
          if ('onDelete' in this.props) this.props.onDelete();
        }
      );
    }
    
    render() {
      
      return (
        <div className="group-component">
          <div className="row">
            <div className="col col-6">
              <h4>
                {this.props.group_store.name}
              </h4>
            </div>
            <div className="col col-6">
              <span
                className={
                  classNames(
                    'caret',
                    'pull-right',
                    'pointer',
                    {
                      'down': this.state.collapsed,
                      'up': !this.state.collapsed
                    }
                  )
                }
                onClick={
                  () => {
                    this.setState({collapsed: !this.state.collapsed});
                  }
                }
              />
              <span
                className="pull-right pointer"
                onClick={
                  () => {
                    this.setState({collapsed: !this.state.collapsed});
                  }
                }
              >
                Optionen {this.state.collapsed ? 'einblenden': 'ausblenden'}
              </span>
            </div>
          </div>
          <div className={classNames('row', {hide: this.state.collapsed})}>
            <div className="col col-12">
              <button
                className="button red pull-right"
                onClick={this.delete}
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
);