import React from 'react';

import {observer} from 'mobx-react';
import UserStore from "../../stores/UserStore";

import '../../styles/InvoiceItem.css';
import InvoiceStore from "../../stores/InvoiceStore";


export default observer(
  class InvoiceItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.userInInvoiceItems = this.userInInvoiceItems.bind(this);
      this.userIsCreditor = this.userIsCreditor.bind(this);
      this.onChangeDebitor = this.onChangeDebitor.bind(this);
      this.onChangeCreditor = this.onChangeCreditor.bind(this);
      this.onChangeAdvancedPriceNumber = this.onChangeAdvancedPriceNumber.bind(this);
      
      this.debounceAdvancedPrice = null;
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
      console.log('delete invoice item: ', invoice_item);
      InvoiceStore.deleteInvoiceItem(invoice_item._id).then(
        (response) => {
          this.props.invoice_store.init();
        }
      ).catch(
        (error) => {
          console.log(error, error.response);
        }
      )
    }
    
    createInvoiceItem(invoice, user_id) {
      console.log('create invoice item: ', invoice, user_id);
      InvoiceStore.createInvoiceItem(invoice, user_id, 'debtor').then(
        (response) => {
          this.props.invoice_store.init();
        }
      ).catch(
        (error) => {
          console.log(error, error.response);
        }
      )
    }
    
    changeInvoiceItem(invoice_item) {
      InvoiceStore.changeInvoiceItem(invoice_item._id, invoice_item.role, invoice_item.advanced_price).then(
        (response) => {
          this.props.invoice_store.init();
        }
      ).catch(
        (error) => {
          console.log(error, error.response);
        }
      )
    }
    
    onChangeDebitor(event) {
      /**
       * If debitor is checked create a new one otherwise delete the invoice item
       */
      if (event.target.checked) {
        this.createInvoiceItem(this.props.invoice_store.id, this.props.user_id);
      } else {
        this.deleteInvoiceItem(this.getInvoiceItemWithUser(this.props.user_id));
      }
    }
    
    onChangeCreditor(event) {
      let invoice_item = this.getInvoiceItemWithUser(this.props.user_id);
      let creditors = this.props.invoice_store.get_creditor();
      
      if (event.target.checked) {
        invoice_item.role = 'creditor';
        invoice_item.advanced_price = Math.round(
            (
              this.props.invoice_store.total_price - creditors.reduce(
                (accumulator, creditor) => {
                  return accumulator + creditor.advanced_price;
                }, 0
              )
            ) * 100
          ) / 100;
        this.changeInvoiceItem(invoice_item);
      } else {
        let invoice_item = this.getInvoiceItemWithUser(this.props.user_id);
        invoice_item.role = 'debtor';
        invoice_item.advanced_price = 0;
        this.changeInvoiceItem(invoice_item);
      }
    }
    
    onChangeAdvancedPriceNumber(event) {
      let value = event.target.value;
      console.log(value);
      if (this.debounceAdvancedPrice) {
        clearTimeout(this.debounceAdvancedPrice);
      }
      this.debounceAdvancedPrice = setTimeout(
        () => {
          console.log('save');
          let invoice_item = this.getInvoiceItemWithUser(this.props.user_id);
          invoice_item.role = 'creditor';
          invoice_item.advanced_price = value;
          this.changeInvoiceItem(invoice_item);
          this.debounceAdvancedPrice = null;
        },
        500
      );
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
                        this.getInvoiceItemWithUser(this.props.user_id).advanced_price ?
                          this.getInvoiceItemWithUser(this.props.user_id).advanced_price :
                          0
                      }
                      onChange={this.onChangeAdvancedPriceNumber}
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
              onChange={this.onChangeCreditor}
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
              onChange={this.onChangeDebitor}
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
      if (!this.getInvoiceItemWithUser(this.props.user_id) && this.props.type === 'creditor') return null;
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