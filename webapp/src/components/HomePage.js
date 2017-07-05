import React from 'react';

import {observer} from 'mobx-react';
import InvoiceCreator from "./invoices/InvoiceCreator";
import InvoiceList from "./invoices/InvoiceList";

import '../styles/Homepage.css';
import InvoiceStore from "../stores/InvoiceStore";
import UserStore from "../stores/UserStore";


export default observer(
  class HomePage extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        credits_and_debts: []
      };
    }
    
    componentDidMount() {
      InvoiceStore.getCreditsAndDebtsOfUser(this.props.user_store.id).then(
        (response) => {
          let credits_and_debts = [];
          let index = 0;
          
          for (let key in response.data) {
            UserStore.getUser(key).then(
              (users_response) => {
                credits_and_debts.push(
                  {
                    user: users_response.data,
                    value: response.data[key]
                  }
                );
                
                index++;
                if (index === Object.keys(response.data).length) {
                  this.setState({credits_and_debts: credits_and_debts});
                }
              }
            ).catch(
              (error) => {
                console.log(error, error.response);
              }
            )
          }
        }
      ).catch(
        (error) => {
          console.log(error, error.response);
        }
      )
    }
    
    renderDebitor() {
      let rendered = [];
      this.state.credits_and_debts.forEach(
        (credit_and_debt) => {
          if (credit_and_debt.value > 0) {
            rendered.push(
              <div className="row" key={credit_and_debt.user._id}>
                <div className="col col-12">
                  <h5>
                    {credit_and_debt.user.first_name} {credit_and_debt.user.last_name}: {(Math.round(credit_and_debt.value * 100) / 100).toFixed(2)}€
                  </h5>
                </div>
              </div>
            );
          }
        }
      );
      
      if (rendered.length === 0) {
        return (
          <div className="row">
            <div className="col col-12">
              Du bekommst kein Geld :(
            </div>
          </div>
        );
      } else {
        return rendered;
      }
    }
    
    renderCreditor() {
      let rendered = [];
      this.state.credits_and_debts.forEach(
        (credit_and_debt) => {
          if (credit_and_debt.value < 0) {
            rendered.push(
              <div className="row" key={credit_and_debt.user._id}>
                <div className="col col-12">
                  <h5>
                    {credit_and_debt.user.first_name} {credit_and_debt.user.last_name}: {(Math.round(credit_and_debt.value * 100) / 100).toFixed(2)}€
                  </h5>
                </div>
              </div>
            );
          }
        }
      );
      
      if (rendered.length === 0) {
        return (
          <div className="row">
            <div className="col col-12">
              Du schuldest niemandem etwas!
            </div>
          </div>
        );
      } else {
        return rendered;
      }
    }
    
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
      
      const renderedCreditsAndDebts = (
        <div className="col col-12 creditors-debtors">
          <div className="row">
            <div className="col col-6 creditor-debtor text-center">
              <h3>Deine Gläubiger</h3>
              {this.renderDebitor()}
            </div>
            <div className="col col-6 creditor-debtor text-center">
              <h3>Deine Schulden</h3>
              {this.renderCreditor()}
            </div>
          </div>
        </div>
      );
      
      const renderedLogin = (
        <div className="content">
          <div className="row gutters">
            {renderedCreditsAndDebts}
            {renderedInvoiceCreators}
          </div>
        </div>
      );
      
      const renderedAnonymous = (
        <div>
          <div className="row background-image">
            <div className="jumbotron">
              <div className="col col-12">
                <h1 className="title">Splittid</h1>
              </div>
              <div className="col col-12">
                <h2>Splitte die Kosten gerecht in einer Gruppe auf!</h2>
              </div>
            </div>
          </div>
        </div>
      );
      
      return (
        <div>
          {this.props.user_store.is_logged_in ? renderedLogin : renderedAnonymous}
        </div>
      );
    }
  }
);