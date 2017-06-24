import React from 'react';

import {observer} from 'mobx-react';
import InvoiceCreator from "./invoices/InvoiceCreator";


export default observer(
  class HomePage extends React.Component {
    
    render() {
      
      const renderedInvoiceCreators = this.props.user_store.groups.map(
        (group) => {
          return (
            <div className="col col-6" key={group.id}>
              <InvoiceCreator
                {...this.props}
                group={group}
              />
            </div>
          );
        }
      );
      
      return (
        <div className="row gutters">
          {renderedInvoiceCreators}
        </div>
      );
    }
  }
);