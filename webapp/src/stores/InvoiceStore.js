import axios from 'axios';
import {liabilities_url} from "../config";

import {extendObservable} from 'mobx';


export default class InvoiceStore {
  constructor(id) {
    this.id = id;
    extendObservable(
      this,
      {
        file_url: '',
        invoice_items: [],
        total_price: 0,
        date: null,
        group_id: ''
      }
    );
    this.init();
  }
  
  init() {
    axios.get(
      liabilities_url + 'invoices/',
      {
        params: {
          id: this.id
        }
      }
    ).then(
      (response) => {
        this.file_url = response.data.file_url;
        this.total_price = response.data.total_price;
        this.date = response.data.date;
        this.group_id = response.data.group_id;
        
        axios.get(
          liabilities_url + 'invoices/' + this.id + '/invoice_items'
        ).then(
          (response) => {
            this.invoice_items = response.data;
          }
        ).catch(
          (error) => {
            console.log(error, error.response);
          }
        )
      }
    ).catch(
      (error) => {
        console.log(error, error.response);
      }
    );
  }
  
  // Creates a new invoice item
  createInvoiceItem(invoice_id, user_id, role, advanced_price=0) {
    return axios.post(
      liabilities_url + 'invoice_items/',
      {
        invoice_id: invoice_id,
        user_id: user_id,
        role: role,
        advanced_price: advanced_price,
      }
    );
  }
  
  changeInvoiceItem(invoice_item_id, role, advanced_price=0) {
    return axios.put(
      liabilities_url + 'invoice_items/',
      {
        invoice_item_id: invoice_item_id,
        role: role,
        advanced_price: advanced_price,
      }
    );
  }
  
  deleteInvoiceItem(invoice_item_id) {
    return axios.delete(
      liabilities_url + 'invoice_items/' + invoice_item_id
    )
  }
}