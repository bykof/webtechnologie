import React from 'react';

import {observer} from 'mobx-react';
import UserStore from "../../stores/UserStore";

import '../../styles/InvoiceItem.css';


export default observer(
  class InvoiceItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.userInInvoiceItems = this.userInInvoiceItems.bind(this);
      this.userIsCreditor = this.userIsCreditor.bind(this);
    }
    
    componentWillMount() {
      UserStore.getUser(this.props.user_id).then(
        (response) => {
          this.setState({user: response.data});
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      )
    }
    
    getInvoiceItemWithUser(user_id) {
      return this.props.invoice_store.invoice_items.find(
        (invoice_item) => {
          return invoice_item.user_id === user_id;
        }
      );
    }
    
    userIsCreditor() {
      let invoice_item = this.getInvoiceItemWithUser(this.props.user_id);
      return invoice_item && invoice_item.role === 'creditor';
    }
    
    userInInvoiceItems() {
      return this.getInvoiceItemWithUser(this.props.user_id);
    }
    
    deleteInvoiceItem(invoice_item) {
    
    }
    
    createInvoiceItem(invoice, user_id) {
      
    }
    
    changeInvoiceItem(invoice_item) {
    
    }
    
    renderCreditor() {
      if (this.props.type === 'creditor') {
        return (
          <div>
            <hr />
            <div className="row gutters">
              <div className="col col-12">
                <div className="form-item">
                  <label>Vorgelegt:</label>
                  <div className="append">
                    <input
                      type="number"
                      value={
                        this.getInvoiceItemWithUser(this.props.user_id).advanced_price
                      }
                    />
                    <button type="button" className="button" disabled={true}>€</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    
    renderCreditorCheckbox() {
      if (this.props.type === 'creditor') {
        return (
          <div className="col col-2">
            <input
              type="checkbox"
              checked={
                this.userIsCreditor()
              }
              onChange={
                () => {
                }
              }
            />
          </div>
        );
      }
    }
    
    renderDebitorCheckbox() {
      if (this.props.type === 'debitor')
      return (
        <div className="col col-2">
          <input
            type="checkbox"
            checked={
              this.userInInvoiceItems()
            }
            onChange={
              () => {
              }
            }
          />
        </div>
      );
    }
    
    renderUser() {
      return (
        <div className="invoice-item-box">
          <div className="row gutters">
            <div className="col col-10">
              {this.state.user.first_name}
            </div>
            {this.renderCreditorCheckbox.bind(this)()}
            {this.renderDebitorCheckbox.bind(this)()}
          </div>
          {this.renderCreditor.bind(this)()}
        </div>
      );
    }
    
    render() {
      if (this.state.user) {
        return this.renderUser.bind(this)();
      } else {
        return (
          <div>lädt...</div>
        );
      }
    }
  }
);