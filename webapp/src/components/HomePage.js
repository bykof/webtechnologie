import React from 'react';

import {observer} from 'mobx-react';
import InvoiceCreator from "./invoices/InvoiceCreator";
import InvoiceList from "./invoices/InvoiceList";

import '../styles/Homepage.css';


export default observer(
  class HomePage extends React.Component {
    
    render() {
      
      const renderedInvoiceCreators = this.props.user_store.groups.map(
        (group_store) => {
          return (
            <div className="col col-6 invoice-view" key={group_store.id}>
              <div className="row">
                <div className="col col-12 text-center">
                  <h4>{group_store.name}</h4>
                </div>
              </div>
              <InvoiceCreator
                {...this.props}
                group_store={group_store}
              />
              <div className="row">
                <div className="col col-12 text-center">
                  <h4>Rechnungen</h4>
                </div>
              </div>
              <InvoiceList
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