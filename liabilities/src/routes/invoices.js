import express from "express";
import OCRScanner from "../scanners/ocr_scanner";
import ReceiptScanner from "../scanners/receipt_scanner";
import Invoice from "../models/invoice";
import InvoiceItem from "../models/invoice_item";
import BalanceObserver from "../balance_teller";


let router = express.Router();

router.route("/")
/*
 * Will return full receipt info. Requires:
 * invoice_id.
 */
  .get((req, res) => {
    /* Dev options */
    if (req.query.dev == "all") {
      Invoice.find({}, (err, doc) => {
        if (doc) res.json(doc);
        else {
          res.json({
            "Result": "No invoices found"
          });
        }
      });
    }
    else if (req.query.billing) {
      let balanceObserver = new BalanceObserver();
      balanceObserver.GetBalancesOfUser(
        req.query.billing
      ).then(
        (result) => {
          return res.json(result);
        }
      ).catch(
        (error) => {
          return res.json(error);
        }
      )
    }
    else if (req.query.group_id) {
      Invoice.find(
        {group_id: req.query.group_id},
        (error, invoices) => {
          if(error) return res.status(400).json({error: error});
          return res.json(invoices);
        }
      );
      
    }
    else if (!req.query.id) {
      res.json({
        "id": "Missing. Please pass with id=value."
      });
    }
    else {
      Invoice.findOne({
          _id: req.query.id
        },
        (err, doc) => {
          if (doc) res.json(doc);
        });
    }
  })
  
  /*
   * Will be called from front-end service.
   * Will create a liability based on a bill. Requires:
   * file_url: The url of the uploaded receipt.
   * user_id: The user who is creating the Invoice.
   */
  .post((req, res) => {
    function save_invoice() {
      new_invoice.save((err) => {
        if (err) {
          return res.json({
            "error": err
          });
        } else {
          return res.json(new_invoice)
        }
      });
    }
    
    if (!req.body["user_id"]) {
      return res.json({
        "user_id": "Missing"
      });
    }
    if (!req.body["group_id"]) {
      return res.json({
        "group_id": "Missing"
      });
    }
    
    var new_invoice = Invoice({
      user_id: req.body["user_id"],
      group_id: req.body["group_id"],
    });
    
    if (req.body["file_url"]) {
      let ocr_scanner = new OCRScanner();
      let receipt_scanner = new ReceiptScanner();
      
      ocr_scanner.scanRemote(req.body["file_url"])
        .then((result) => {
          receipt_scanner.extractTotalPrice(result)
            .then((result) => {
              // Attempt to save the new model.
              new_invoice.file_url = req.body["file_url"];
              new_invoice.total_price = result;
              return save_invoice();
            });
        })
        .catch((error) => {
          console.error(error);
          return res.json({error: error});
        })
    } else {
      new_invoice.total_price = req.body["total_price"];
      return save_invoice();
    }
  })
  
  .put((req, res) => {
    if (!req.body["id"]) {
      res.json({
        "id": "Missing."
      });
    }
    if (!req.body["total_price"]) {
      res.json({
        "total_price": "Missing."
      });
    }
    else {
      Invoice.findOne({_id: req.body["id"]}, (err, invoice_found) => {
        if (invoice_found) {
          if (req.body["total_price"])
            invoice_found.total_price = req.body["total_price"];
          
          invoice_found.save((err) => {
            if (err) res.json({"error": err});
            else res.json(invoice_found);
          });
        }
      })
    }
  });


router.route('/:invoice_id/invoice_items').get(
  (request, response) => {
    InvoiceItem.find(
      {invoice_id: request.params.invoice_id},
      (error, invoice_items) => {
        if (error) return response.json({error: error});
        return response.json(invoice_items)
      }
    );
  }
);
export default router;