import Invoice from "./models/invoice";
import InvoiceItem from "./models/invoice_item";
import Payment from "./models/payment";

/*
 * Offers methods to check and calculate debts between the users.
 */
class BalanceObserver {
  
  /*
   * Will check if any payments have been made between the passed users.
   */
  GetPayment(sender_id, receiver_id) {
    return new Promise((resolve, reject) => {
      Payment.find({}, (err, doc) => {
        if (doc) {
          doc.forEach((payment) => {
            if (payment.sender_user_id === sender_id
              && payment.receiver_user_id === receiver_id) {
              resolve(payment.money_amount);
            }
          })
        }
        else reject(err);
      })
    })
  }
  
  /**
   * An analysisobject will represent an invoice with its involved people
   * It will look like:
   * [
   *  { total_price: 15, users: [ [Object], [Object], [Object] ] },
   *  { total_price: 15, users: [ [Object], [Object], [Object] ] },
   *  { total_price: 10, users: [ [Object], [Object] ] }
   * ]
   *
   * @param user_id
   * @returns {Promise}
   * @constructor
   */
  GetAnalysisObjectsWithUser(user_id) {
    
    // analysis object
    let analysis_objects = [];
    
    return new Promise(
      (resolve, reject) => {
        Invoice.find(
          {},
          (error, invoices) => {
            if (error) reject(error);
            invoices.forEach(
              (invoice) => {
                this.GetAllInvoiceItemsOfInvoice(
                  invoice._id
                ).then(
                  (invoice_items) => {
                    if (invoice_items.some((invoice_item) => invoice_item.user_id === user_id)) {
                      analysis_objects.push({total_price: invoice.total_price, invoice_items: invoice_items});
                    }
                    
                    // After iterating over all invoices return the analysis objects
                    if (invoices.indexOf(invoice) === invoices.length - 1) return resolve(analysis_objects);
                  }
                ).catch(
                  (error) => {
                    return reject(error);
                  }
                )
              }
            );
          }
        );
      }
    );
  }
  
  GetAllInvoiceItemsOfInvoice(invoice_id) {
    return new Promise(
      (resolve, reject) => {
        InvoiceItem.find(
          {
            invoice_id: invoice_id
          },
          (error, items) => {
            if (error) return reject(error);
            return resolve(items);
          }
        );
      }
    )
  }
  
  
  AppendToCreditsDebts(credits_debts, user_id, value) {
    if (user_id in credits_debts) {
      credits_debts[user_id] += value;
    } else {
      credits_debts[user_id] = value;
    }
  }
  
  StraightenDebitorsCreditors(debitors, creditors, user_id, credits_debts) {
    // Straighten the whole thing up
    /*
     First order all debitors and creditors from lowest to highest and then give the creditors their money
     */
    debitors.sort((a, b) => a - b);
    creditors.sort((a, b) => a - b);
    
    // Iterate over all debitors
    for (let debitor_key in debitors) {
      
      // Look if the current debitor still has money
      while (debitors[debitor_key] !== 0) {
        
        // Iterate over all creditors
        for (let creditor_key in creditors) {
          
          // jump over if the creditor has all his money back
          if (creditors[creditor_key] === 0) return;
          
          // Give the creditors their money back
          // Check if the charge is bigger than the creditor has
          // so he can give him all his money
          // otherwise you have to subtract the creditors charge from the money a debitor has
          // and do the next round
          if (creditors[creditor_key] - debitors[debitor_key] >= 0) {
            
            // If the user_id is in debitors than he has to give money to the creditor_key
            // We only need our information so check if the creditor_key is "me"
            if (user_id in debitors && user_id === debitor_key) {
              this.AppendToCreditsDebts(credits_debts, creditor_key, -debitors[debitor_key]);
            }
            
            // If the user_id is in creditors than the debitor_key has to give the user money
            // We only need our information so check if the creditor_key is "me"
            if (user_id in creditors && user_id === creditor_key) {
              this.AppendToCreditsDebts(credits_debts, debitor_key, debitors[debitor_key]);
            }
            
            creditors[creditor_key] -= debitors[debitor_key];
            debitors[debitor_key] = 0;
          } else {
            
            // If the user_id is in debitors than he has to give money to the creditor_key
            // We only need our information so check if the creditor_key is "me"
            if (user_id in debitors  && user_id === debitor_key) {
              this.AppendToCreditsDebts(
                credits_debts,
                creditor_key,
                -(debitors[debitor_key] - creditors[creditor_key])
              );
            }
            
            // If the user_id is in creditors than the debitor_key has to give the user money
            // We only need our information so check if the creditor_key is "me"
            if (user_id in creditors && user_id === creditor_key) {
              this.AppendToCreditsDebts(
                credits_debts,
                debitor_key,
                debitors[debitor_key] - creditors[creditor_key]
              );
            }
            
            creditors[creditor_key] = 0;
            debitors[debitor_key] -= creditors[creditor_key];
          }
        }
      }
    }
  }
  
  /*
   * Will go through all invoices and return each invoice_id
   * with the open debts to the respective creditors.
   * The key of the response is the receiving user and the value the money that user is getting.
   * If the number is negative, then the passed user_id owes that much to him.
   */
  GetBalancesOfUser(user_id) {
    return new Promise(
      (resolve, reject) => {
        this.GetAnalysisObjectsWithUser(
          user_id
        ).then(
          (analysis_objects) => {
            let credits_debts = {};
            analysis_objects.forEach(
              (analysis_object) => {
                // Look if there are users otherwise it would be divide by zero
                if (analysis_object.invoice_items) {
                  
                  // break up if the user is not in the invoice_items
                  if (!analysis_object.invoice_items.find((invoice_item) => invoice_item.user_id === user_id)) return;
                  
                  let price_per_person = analysis_object.total_price / analysis_object.invoice_items.length;
                  let debitors = [];
                  let creditors = [];
                  
                  // First find all debitors in one list and debitors in another list
                  // Do a delta if a person is creditor to see if it receive or have to give money
                  analysis_object.invoice_items.forEach(
                    (invoice_item) => {
                      if (invoice_item.role === 'creditor') {
                        let delta = invoice_item.advanced_price - price_per_person;
                        if (delta !== 0) {
                          if (delta > 0) {
                            creditors[invoice_item.user_id] = delta;
                          } else {
                            debitors[invoice_item.user_id] = delta;
                          }
                        }
                      } else {
                        debitors[invoice_item.user_id] = price_per_person;
                      }
                    }
                  );
                  
                  this.StraightenDebitorsCreditors(debitors, creditors, user_id, credits_debts);
                }
              }
            );
            
            resolve(credits_debts);
          }
        ).then(
          (error) => {
            return reject(error);
          }
        );
      });
  }
  
}

export default BalanceObserver;