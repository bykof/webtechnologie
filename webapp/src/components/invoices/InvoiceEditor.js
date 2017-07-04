import React from 'react';

import {observer} from 'mobx-react';
import classNames from 'classnames';
import InvoiceStore from "../../stores/InvoiceStore";
import moment from 'moment';


import '../../styles/InvoiceEditor.css';
import GroupStore from "../../stores/GroupStore";
import InvoiceItem from "./InvoiceItem";


export default observer(
  class InvoiceEditor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: '',
        invoice_picture_collapsed: true
      };
      
      this.group_store = null;
      this.changeState = this.changeState.bind(this);
    }
    
    changeState(event) {
      this.setState({[event.target.name]: event.target.value});
    }
    
    componentWillMount() {
      this.invoice_store = new InvoiceStore(this.props.match.params.invoice_id);
    }
    
    toggleInvoicePictureCollapsed() {
      this.setState({invoice_picture_collapsed: !this.state.invoice_picture_collapsed});
    }
    
    render() {
      
      if (this.invoice_store.group_id && !this.group_store) {
        this.group_store = new GroupStore(this.invoice_store.group_id);
      }
      
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
      
      const renderedImage = (
        this.invoice_store.file_url ?
          (
            <div className="col col-12">
              <img
                className={
                  classNames(
                    {
                      'image-s': this.state.invoice_picture_collapsed,
                      'image-l': !this.state.invoice_picture_collapsed
                    }
                  )
                }
                onClick={this.toggleInvoicePictureCollapsed.bind(this)}
                src={this.invoice_store.file_url} alt="Your Invoice"
              />
              <br />
              <a onClick={this.toggleInvoicePictureCollapsed.bind(this)}>
                Bild {this.state.invoice_picture_collapsed ? 'vergrößern' : 'verkleinern'}
              </a>
            </div>
          ) :
          (
            <div className="col col-12">
              <p>Kein Bild hochgeladen!</p>
            </div>
          )
      );
      
      return (
        <div>
          <div className="row">
            <div className="col col-12">
              {renderedError}
            </div>
          </div>
          <div className="row">
            <div className="col col-12">
              <h3>
                Rechnung vom {moment(this.invoice_store.date).format('DD.MM.YYYY')}
                um {moment(this.invoice_store.date).format('HH:MM')} Uhr
              </h3>
            </div>
          </div>
          <div className="row">
            {renderedImage}
            <hr />
            <div className="col col-3">
              <form>
                <div className="form-item">
                  <label>Gesamtsumme</label>
                  <div className="append">
                    <input
                      type="number"
                      value={this.invoice_store.total_price}
                      onChange={(event) => {
                        this.invoice_store.total_price = event.target.value
                      }}
                    />
                    <button type="button" disabled className="button">€</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col col-12">
              <h4>Wer war dabei?</h4>
              {
                this.group_store ? (
                  this.group_store.users.map(
                    (user) => {
                      return (
                        <InvoiceItem
                          type={'debitor'}
                          key={user}
                          user_id={user}
                          invoice_store={this.invoice_store}
                        />
                      );
                    }
                  )
                ) : (
                  'lädt...'
                )
              }
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col col-12">
              <h4>Wer hat gezahlt?</h4>
              {
                this.group_store ? (
                  this.group_store.users.map(
                    (user) => {
                      return (
                        <InvoiceItem
                          type={'creditor'}
                          key={user}
                          user_id={user}
                          invoice_store={this.invoice_store}
                        />
                      );
                    }
                  )
                ) : (
                  'lädt...'
                )
              }
            </div>
          </div>
        </div>
      );
    }
  }
);