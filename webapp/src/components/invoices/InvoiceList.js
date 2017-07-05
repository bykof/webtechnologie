import React from 'react';
import {observer} from 'mobx-react';
import InvoiceStore from "../../stores/InvoiceStore";

import '../../styles/InvoiceList.css';
import {Link} from "react-router-dom";
import {INVOICE_EDITOR} from "../../routes_constants";
import moment from "moment";


export default observer(
  class InvoiceList extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        invoices: []
      }
    }
    
    componentDidMount() {
      InvoiceStore.getInvoicesOfGroup(this.props.group_store.id).then(
        (response) => {
          this.setState({invoices: response.data});
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      )
    }
    
    render() {
      
      const renderedInvoices = this.state.invoices.map(
        (invoice) => {
          return (
            <div className="col col-12 invoice-list-item" key={invoice._id}>
              <div className="row">
                <div className="col col-3">
                  Vom {moment(invoice.date).format('DD.MM.YYYY')} um {moment(invoice.date).format('HH:MM')}
                </div>
                <div className="col col-3">
                  Gesamtbetrag: {invoice.total_price} €
                </div>
                <div className="col col-6 text-right">
                  <Link to={INVOICE_EDITOR(invoice._id)}>Bearbeiten</Link>
                </div>
              </div>
            </div>
          );
        }
      );
      
      return (
        <div className="row invoice-list">
          {renderedInvoices}
        </div>
      );
    }
  }
);