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
      }
    ).catch(
      (error) => {
        console.log(error, error.response);
      }
    );
  }
}