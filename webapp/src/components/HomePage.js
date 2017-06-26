import React from 'react';

import {observer} from 'mobx-react';
import InvoiceCreator from "./invoices/InvoiceCreator";


export default observer(
  class HomePage extends React.Component {
    
    render() {
      
      const renderedInvoiceCreators = this.props.user_store.groups.map(
        (group_store) => {
          return (
            <div className="col col-6" key={group_store.id}>
              <InvoiceCreator
                {...this.props}
                group_store={group_store}
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