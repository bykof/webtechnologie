import React from 'react';

import {observer} from 'mobx-react';
import axios from 'axios';
import {file_storage_url, liabilities_url} from "../../config";
import {INVOICE_EDITOR} from "../../routes_constants";


const IMAGE_TYPES = ['image/png', 'image/jpeg'];


export default observer(
  class InvoiceCreator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        file: '',
        invoice_amount: '',
        error: '',
        uploaded_file_id: null,
        is_loading: false
      };
      
      this.changeState = this.changeState.bind(this);
      this.setFilePath = this.setFilePath.bind(this);
      this.uploadFile = this.uploadFile.bind(this);
      this.createInvoice = this.createInvoice.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.clear = this.clear.bind(this);
    }
    
    uploadFile() {
      let file_upload = new FormData();
      file_upload.append('image', this.state.file);
      return new Promise(
        (resolve, reject) => {
          axios.post(
            file_storage_url + 'files',
            file_upload
          ).then(
            (response) => {
              this.setState(
                {
                  uploaded_file_id: response.data._id
                },
                () => {
                  resolve();
                }
              );
            }
          ).catch(
            (error) => {
              console.log(error);
              console.log(error.response);
              reject();
            }
          );
        }
      );
    }
    
    createInvoiceItems(invoice) {
      let created_invoice_items = [];
      
      this.props.group_store.users.forEach(
        (user_id) => {
          axios.post(
            liabilities_url + 'invoice_items/',
            {
              invoice_id: invoice._id,
              user_id: user_id,
              role: 'debtor',
              advanced_price: Math.round((invoice.total_price / this.props.group_store.users) * 100) / 100,
            }
          ).then(
            (response) => {
              created_invoice_items.push(response.data);
              
              if (created_invoice_items.length === this.props.group_store.users.length) {
                this.props.history.push(INVOICE_EDITOR(invoice._id));
              }
            }
          ).catch(
            (error) => {
              console.log(error);
              console.log(error.response);
            }
          );
        }
      );
    }
    
    createInvoice() {
      let file_url = '';
      
      if (this.state.uploaded_file_id) {
        file_url = file_storage_url + 'files/' + this.state.uploaded_file_id + '/file';
      }
      
      axios.post(
        liabilities_url + 'invoices/',
        {
          group_id: this.props.group_store.id,
          file_url: file_url,
          user_id: this.props.user_store.id,
          total_price: this.state.invoice_amount,
        }
      ).then(
        (response) => {
          // GOT THE INVOICE!
          console.log(response);
          this.createInvoiceItems(response.data.invoice)
        }
      ).catch(
        (error) => {
          console.log(error);
          console.log(error.response);
        }
      );
    }
    
    onSubmit(event) {
      event.preventDefault();
      
      this.setState({is_loading: true});
      
      if (this.state.file) {
        this.uploadFile().then(
          () => {
            this.createInvoice();
          }
        ).catch(
          (error) => {
            console.log(error);
            console.log(error.response);
            // TODO: SHOW ERROR!
          }
        );
      } else {
        this.createInvoice();
      }
    }
    
    changeState(event) {
      this.setState({[event.target.name]: event.target.value});
    }
    
    setFilePath(event) {
      let file = event.target.files[0];
      if (IMAGE_TYPES.indexOf(file.type) >= 0) {
        this.setState({[event.target.name]: file});
      } else {
        this.setState({error: 'Du hast keine Bilddatei angegeben!'});
      }
    }
    
    clear() {
      this.setState({file: '', invoice_amount: ''});
    }
    
    openFile() {
      document.getElementById('file_upload').click();
    }
    
    render() {
      const renderedError = (
        this.state.error ?
          (
            <div className="row">
              <div className="col col-12">
                <div className="message error" data-component="message">
                  {this.state.error}
                  <span className="close small" onClick={() => {
                    this.setState({error: ''})
                  }}/>
                </div>
              </div>
            </div>
          ) : null
      );
      
      return (
        <div className="row">
          <div className="col col-12 text-center">
            <h4>{this.props.group_store.name}</h4>
          </div>
          <div className="col col-12">
            {renderedError}
            <div className="row">
              <div className="col col-12">
                <form onSubmit={this.onSubmit}>
                  <fieldset>
                    <legend>Neue Rechnung</legend>
                    <div className="form-item">
                      <label>Rechnungsbetrag oder Foto</label>
                      <div className="append">
                        <input
                          type="number"
                          name="invoice_amount"
                          disabled={
                            !!this.state.file
                          }
                          value={this.state.invoice_amount}
                          onChange={this.changeState}
                        />
                        <button className="button" type="button" onClick={this.openFile}>
                          <i className="fa fa-camera" aria-hidden="true"/>
                        </button>
                        {
                          this.state.file ?
                            (
                              <button className="button red" type="button" onClick={this.clear}>
                                <i className="fa fa-remove" aria-hidden="true"/>
                              </button>
                            ) : null
                        }
                      </div>
                      <input type="file" className="hide" name="file" id="file_upload" onChange={this.setFilePath}/>
                    </div>
                    <div className="form-item">
                      <button type="submit" disabled={this.state.is_loading}>
                        { this.state.is_loading ?
                          <i className="fa fa-circle-o-notch fa-spin fa-fw"/> :
                          'Senden'
                        }
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);