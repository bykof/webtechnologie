import Invoice from "./models/invoice";
import InvoiceItem from "./models/invoice_item";
import Payment from "./models/payment";

/*
 * Offers methods to check and calculate debts between the users.
 */
class BalanceObserver {

    /*
     * Will go through all invoices and return each invoice_id
     * with the open debts to the respective creditors.
     */
    GetUnpaidDebtsForUser(user_id) {
        return new Promise((resolve, reject) => {
            Invoice.find({}, (err, doc) => {
                if (err) return err;
                if (doc) {
                    // Array of total debts to each creditor.
                    let debts = [];
                    // Go through every invoice in DB.
                    doc.forEach((invoice) => {
                        invoice.invoice_items.forEach((item) => {
                            // Calculate debts to every creditor.
                            if (item.user_id != user_id && item.role == "creditor") {
                                let debt_per_user = item.advanced_price / (invoice.invoice_items.length - 1)

                                // If this user is a creditor of that invoice, the difference needs to be considered.
                                invoice.invoice_items.forEach((item_2) => {
                                    if (item_2.user_id == user_id && item_2.role == "creditor") {
                                        debt_per_user = (item_2.advanced_price - debt_per_user)
                                    }
                                });

                                // TODO: Subsctract made payments to this user.

                                // Divide remaining amount by count of debtors.
                                debts.push({
                                    // ID of receiver
                                    key: item.user_id,
                                    value: debt_per_user
                                });

                            }
                        });
                    });
                    resolve(debts);
                }
            });
        });
    }

}

export default BalanceObserver;